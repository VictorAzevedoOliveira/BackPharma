const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const AppError = require('../utils/AppError');
const server = require('../server');
const sendEmail = require('../utils/email');


const signToken = userId =>
  jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (userId, res) => {
    const token = signToken(userId); 
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    return token;
  };
  const comparePassword = async (requestPass, userPass) =>
  await bcrypt.compare(requestPass, userPass);


  exports.protect = async req => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      throw new AppError(
        'Login não aceito! Por favor, entre na sua conta para ter acesso.',
        401
      );
    }
    // Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_TOKEN);
    const {
      rows: user,
    } = await server.query(`SELECT * FROM tb_pessoa WHERE id_pessoa = ?`, [
      decoded.userId,
    ]);
    if (!user[0]) {
      throw new AppError('Não existe nenhum usuário com este token.', 401);
    }
    return user[0];
  };
  

  exports.signup = async (req, res) => {

    // Verificar se senha e confirmação de senha são iguais.
    if (req.body.pwd_pessoa !== req.body.passwordConfirm)
      throw new AppError('As senhas precisam ser iguais.', 400);
  
    // Gerar hash de senha.
    const senha = await bcrypt.hash(req.body.pwd_pessoa, 12);
  
    // Inserir usuário.
    const { rows: createdUser } = await server.query(
        `INSERT INTO tb_pessoa (nme_pessoa, email_pessoa,pwd_pessoa) VALUES (?,?,?)`,
      [
        req.body.nme_pessoa,
        req.body.email_pessoa,
        senha,
      ]
    );
  
    return createSendToken(createdUser[0].id_pessoa, res);
  };
  
// LOGIN
  exports.login = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
      throw new AppError('Por favor, digite seu email e sua senha.', 400);
    } 
    const {
      rows: user,
    } = await server.query(
      `SELECT id_pessoa, email_pessoa, pwd_pessoa FROM tb_pessoa WHERE pwd_pessoa = ?`,
      [email]
    );
    if (!user[0] || !(await comparePassword(senha, user[0].pwd_pessoa)))
      throw new AppError('Email ou senha incorreta.', 401);
    return createSendToken(user[0].id_pessoa, res);
  };
  

  // ESQUECEU A SENHA
  exports.forgotPassword = async req => {
    const { email } = req.body;
  
    if (!email) throw new AppError('Por favor, digite seu email.', 400);
  
    const {
      rows: user,
    } = await server.query(
      `SELECT id_pessoa, email_pessoa, pwd_senha FROM tb_pessoa WHERE email_pessoa = ?`,
      [email]
    );
    if (!user[0]) throw new AppError('Não existe uma conta com este email!', 404);
  
    // Criando token para mandar para resetar senha.
    // esse token será enviado pro email do usuário.
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    // Encryptar o token gerado para ser guardado no banco de dados.
    const encryptResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    const passwordResetExpires = Date.now() + 15 * 60 * 1000;
  
    await server.query(
      'INSERT INTO senhatokenreset (id_token, nme_token, expira_token) VALUES (?,?,?)',
      [user[0].id_pessoa, encryptResetToken, passwordResetExpires]
    );
  
    // Mandar email.
    const resetURL = `${req.protocol}//${req.get(
      'host'
    )}/resetPassword/${resetToken}`;
  
    const message = `Perdeu sua senha? Aqui está a solução: ${resetURL}`;
  
    try {
      sendEmail({
        email: user[0].pwd_pessoa,
        subject: 'Token de recuperação de senha (válido por 15 min).',
        message: message,
      });
    } catch (err) {
      await server.query(
        'DELETE FROM senhatokenreset WHERE id_token = ?',
        user[0].id_pessoa
      );
    }
  };

// RESETAR SENHA
  exports.resetPassword = async (req, res) => {
    // VER PROBLEMA DO TRY CATCH SENDEMAIL
    const { token } = req.params;
    const { senha, passwordConfirm } = req.body;
  
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
    const {
      rows: user,
    } = await server.query(
      'SELECT id_token, expira_token FROM senhatokenreset WHERE nme_token = ?',
      [hashedToken]
    );
  
    // Indetificar se token existe e se ainda é válido.
    if (!user[0] || Date.now() > user[0].expira_token)
      throw new AppError('Token inválido ou expirado!', 400);
  
    if (!senha || !passwordConfirm)
      throw new AppError('Preencha todos os campos.', 400);
  
    if (senha !== passwordConfirm)
      throw new AppError('As senhas precisam ser iguais.', 400);
  
    // Gerar hash de senha.
    const hashedPassword = await bcrypt.hash(senha, 12);
  
    await server.query(
      'UPDATE tb_pessoa SET pwd_pessoa = ?, pwd_changed = ? WHERE id_pessoa = ?',
      [hashedPassword, Date.now(), user[0].id_token]
    );
  
    await server.query('DELETE FROM senhatokenreset WHERE id_token = ?', [
      user[0].id_token,
    ]);
  
    return createSendToken(user[0].id_token, res);
  };
  