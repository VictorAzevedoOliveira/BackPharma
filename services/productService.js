
const server = require('../server');

const AppError = require('../utils/AppError');
const bd = require('../bd');
const { token } = require('morgan');

//-------------------------------------------------------------------------------------------------------
exports.getAllProducts = async () => {
  const { rows: prod } = await bd.query('SELECT * FROM ta_produto');
  return prod;
}
    
  
//-------------------------------------------------------------------------------------------------------
  exports.getProduct = async req => {
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

//-------------------------------------------------------------------------------------------------------

  exports.addProduct = async req => { 
    // Inserir produto
    const { rows:createdUser } = await bd.query(
        `INSERT INTO ta_produto (nme_produto , preco_produto ,preco_novoproduto,desc_produto,img_produto,isfavourite,ispopular,onsale,cod_categoria,cod_estabelecimento) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 , $10);`,

        [
        req.body.nme_produto, 
        req.body.preco_produto,
        req.body.preco_novoproduto,
        req.body.desc_produto,
        req.body.img_produto,
        req.body.isfavourite,
        req.body.ispopular,
        req.body.onsale,
        req.body.cod_categoria,
        req.body.cod_estabelecimento
      ]
    ); 
  };

//-------------------------------------------------------------------------------------------------------
  exports.deleteProduct = async req => {
    const {rowCount} = await bd.query(
      `DELETE FROM ta_produto WHERE id_produto = $1`, [
      req.params.id,
    ]);
  console.log("oi")
    if (!rowCount) throw new AppError('Produto não existe.', 404);
  };

//-------------------------------------------------------------------------------------------------------
  exports.updateProduct = async req => {
    const fields = [req.params.id];
    const str = [];
  
    const filteredUser = filterObj(
      req.body,
      'nme_produto ',
    );
};
//-------------------------------------------------------------------------------------------------------
// Busca de produtos na categoria de remedios
exports.getProductCategoria = async req => {
  const { rows: prod } = await bd.query(
    `select * from ta_produto WHERE cod_categoria = $1;`,
  [req.params.cod_categoria]
  );
  console.log(prod);
  return prod;
};

//-------------------------------------------------------------------------------------------------------
// Busca de produtos na categoria de remedios
exports.getAllProductRemedios = async req => {
  const { rows: prod } = await bd.query(
    `select * from ta_produto WHERE cod_categoria = 1;`,
  );
  console.log(prod);
  return prod;
};

//-------------------------------------------------------------------------------------------------------
// Busca de produtos na categoria de Higiene
exports.getAllProductHigiene = async req => {
  const { rows: prod } = await bd.query(
    `select * from ta_produto WHERE cod_categoria = 2;`,
  );
  console.log(prod);
  return prod;
};

//-------------------------------------------------------------------------------------------------------
// Busca de produtos na categoria de Cuidado e Peles
exports.getAllProductCuidado = async req => {
  const { rows: prod } = await bd.query(
    `select * from ta_produto WHERE cod_categoria = 3;`,
  );
  console.log(prod);
  return prod;
};
//-------------------------------------------------------------------------------------------------------
// Busca de produtos que estão populares
exports.getAllProductsPopular = async () => {
  const { rows: prod } = await bd.query('SELECT * FROM ta_produto WHERE ispopular = true');
  return prod;
}