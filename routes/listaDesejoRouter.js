const express = require('express');
const router = express.Router();

const listaDesejoController = require('../controllers/listaDesejoController');

router.route('/listas').get(listaDesejoController.getAllListas);

router.route('/lista/:id').get(listaDesejoController.getListaDesejo);

router.route('/addprodlista').post(listaDesejoController.addProductLista);

router.route('/removeprodlista').delete(listaDesejoController.deleteProductLista);

router.route('/calcularlista').post(listaDesejoController.calcularProductLista);



module.exports = router; 