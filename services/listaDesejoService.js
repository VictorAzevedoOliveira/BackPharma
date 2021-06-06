
const server = require('../server');
const AppError = require('../utils/AppError');
const bd = require('../bd');
const logado = require('../services/authService');


//-------------------------------------------------------------------------------------------------------
exports.getAllListas = async () => {
  const { rows: list } = await bd.query('SELECT * FROM tb_listadesejos');
  return list;
}
    
//-------------------------------------------------------------------------------------------------------
exports.getListaDesejo = async req => {
    const { rows: prod } = await bd.query(
      `SELECT * FROM tb_listadesejos 
      WHERE cod_usuario = $1;`,
      [req.params.cod_usuario]
    );
    if (!prod[0]) throw new AppError('Lista não existe.', 404);
    Object.entries(prod[0]).forEach(([key, value]) => {
      if (value === null) delete prod[0][key];
    });
    return prod[0];
  };


//-------------------------------------------------------------------------------------------------------
  exports.addProductLista = async req => { 
      
if (authService.login(logado == true)){
    var islogado = true;
}
console.log(islogado);
// Insere um produto na lista de desejos
    if (islogado==true){
        console.log('teste 1: '+ logado);
    const { rows: prod} = await bd.query(
        `INSERT INTO  tb_listadesejos_produtos (cod_listadesejos, cod_produto, qtd_produto) 
        VALUES ($1, $2, $3) ;`,
        [req.body.cod_listadesejos,
        req.body.cod_produto,
        req.body.qtd_produto,]
          );
        if (!prod[0]) throw new AppError('Não existe este usuário!', 404);
        console.log('teste 2: '+logado);
    }else{
        new AppError('Usuário não Logado!', 404);
    }
    console.log('teste 3: '+logado);


  };

//-------------------------------------------------------------------------------------------------------
  exports.deleteProductLista = async req => {
    const {
      rowCount,
    } = await server.query(`DELETE FROM ta_produto WHERE id_produto = $1`, [
      req.params.id,
    ]);
  
    if (!rowCount) throw new AppError('Produto não existe.', 404);
  };

//-------------------------------------------------------------------------------------------------------
exports.calcularProductLista = async req => {
    const { rows: prod } = await bd.query(
      `SELECT * FROM tb_listadesejos 
      WHERE cod_usuario = $1;`,
      [req.params.cod_usuario]
    );
    if (!prod[0]) throw new AppError('Lista não existe.', 404);
    Object.entries(prod[0]).forEach(([key, value]) => {
      if (value === null) delete prod[0][key];
    });
    return prod[0];
  };