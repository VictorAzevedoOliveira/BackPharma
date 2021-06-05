
const server = require('../server');

const AppError = require('../utils/AppError');
const bd = require('../bd');
const { token } = require('morgan');


exports.getAllProductsOferta = async () => {
  const { rows: prod } = await bd.query('SELECT * FROM ta_produto');
  return prod;
}
    

  exports.getProductOferta = async req => {
    const { rows: prod } = await bd.query(
      `SELECT * FROM ta_produto
       WHERE id_produto = $1;`,
      [req.params.id]
    );
    if (!prod[0]) throw new AppError('Produto não existe.', 404);
    Object.entries(prod[0]).forEach(([key, value]) => {
      if (value === null) delete prod[0][key];
    });
    return prod[0];
  };



  exports.addProductOferta = async req => { 
    // Inserir produto
    const { rows:createdUser } = await bd.query(
        `INSERT INTO ta_produto (id_produto,nme_produto , preco_produto ,desc_produto) VALUES ($1, $2, $3, $4) RETURNING id_produto;`,

        [
        req.body.id_produto,
        req.body.nme_produto, 
        req.body.preco_produto,
        req.body.desc_produto,
      ]
    ); 
  };


  exports.deleteProductOferta = async req => {
    const {
      rowCount,
    } = await server.query(`DELETE FROM ta_produto WHERE id_produto = $1`, [
      req.params.id,
    ]);
  
    if (!rowCount) throw new AppError('Produto não existe.', 404);
  };


  exports.updateProductOferta = async req => {
    const fields = [req.params.id];
    const str = [];
  
    const filteredUser = filterObj(
      req.body,
      'nme_produto ',
    );
};