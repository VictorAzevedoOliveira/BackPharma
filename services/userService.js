const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const server = require('../server');
const mysql = require('../mysql').pool;
const AppError = require('../utils/AppError');
const bd = require('../bd');


exports.getAllUsers = async () => {
  mysql.getConnection(async(error,conn) => {
    await conn.query('SELECT * FROM tb_pessoa', function(err,res,fields) {
      const {rows:users} = res;
      // console.log(err+" "+res[0].value+" "+fields);
      console.log(res)
      conn.release();
      return users;
    });
    },  
    
    )}   

  exports.getUser = async req => {
    const { rows: user } = await mysql.query(
      `SELECT * FROM tb_pessoa 
       WHERE id_pessoa = ?;`,
      [req.params.id]
    );
    if (!user[0]) throw new AppError('Usuário não existe.', 404);
    Object.entries(user[0]).forEach(([key, value]) => {
      if (value === null) delete user[0][key];
    });
    return user[0];
  };



  exports.addUser = async req => {
    // Verificar se senha e confirmação de senha são iguais.
    if (req.body.pwd_pessoa !== req.body.confirmSenha)
      throw new AppError('As senhas precisam ser iguais.', 400);
  
    // Gerar hash de senha.
    const senha = await bcrypt.hash(req.body.pwd_pessoa, 12);
  
    // Inserir usuário.
    const { rows: createdUser } = await mysql.query(
        `INSERT INTO tb_pessoa (nme_pessoa, email_pessoa,pwd_pessoa) VALUES (?,?,?)`,
      [
        req.body.nme_pessoa,
        req.body.email_pessoa,
        senha
      ]
    );
  };


  exports.deleteUser = async req => {
    const {
      rowCount,
    } = await server.query(`DELETE FROM tb_pessoa WHERE id_pessoa = ?`, [
      req.params.id,
    ]);
  
    if (!rowCount) throw new AppError('Usuário não existe.', 404);
  };


  exports.updateUser = async req => {
    const fields = [req.params.id];
    const str = [];
  
    const filteredUser = filterObj(
      req.body,
      'nme_pessoa',
    );
};