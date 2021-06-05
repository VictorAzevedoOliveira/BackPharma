const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const ofertaController = require('../controllers/ofertaController');

router.route('/produtos').get(productController.getAllProducts);

router.route('/').get(productController.getAllProducts).post(productController.addProduct);
router
  .route('/:id')
  .get(productController.getAllProducts)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

router.route('ofertas/todosProdutos').post(ofertaController.getAllProductsOferta);
router.route('ofertas/produto').post(ofertaController.getProductOferta);
router.route('ofertas/Addproduto').post(ofertaController.addProductOferta);
router.route('ofertas/delProduto').post(ofertaController.deleteProductOferta);
router.route('ofertas/updateProduto').post(ofertaController.updateProductOferta);


module.exports = router; 