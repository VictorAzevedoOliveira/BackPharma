
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
