
const server = require('../server');

const AppError = require('../utils/AppError');
const bd = require('../bd');
const { token } = require('morgan');

//-------------------------------------------------------------------------------------------------------
exports.getAllForms = async () => {
  const { rows: form } = await bd.query('SELECT * FROM tb_formulario');
  return form;
}
    
  
//-------------------------------------------------------------------------------------------------------

  exports.addForm = async req => { 
    // Inserir produto
    const { rows:createdForm } = await bd.query(
        `INSERT INTO tb_formulario (nme_formulario , cel_formulario ,email_formulario,msg_formulario) VALUES ($1, $2, $3, $4) RETURNING id_formulario;`,

        [
        req.body.nme_formulario,
        req.body.cel_formulario, 
        req.body.email_formulario,
        req.body.msg_formulario,
      ]
    ); 
  };

//-------------------------------------------------------------------------------------------------------
  exports.deleteProduct = async req => {
    const {
      rowCount,
    } = await server.query(`DELETE FROM ta_produto WHERE id_produto = $1`, [
      req.params.id,
    ]);
  
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