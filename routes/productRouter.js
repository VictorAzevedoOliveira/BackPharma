const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const ofertaController = require('../controllers/ofertaController');

router.route('/produtos').get(productController.getAllProducts);

router.route('/')
.get(productController.getAllProducts)
.post(productController.addProduct)
.get(productController.getProduct);


router
  .route('/produto/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

router.route('/parceiros').get(ofertaController.getAllProducts);
router.route('/ofertas').get(ofertaController.getAllProductsOferta);
router.route('/oferta/:id').get(ofertaController.getProductOferta);
router.route('/Addoferta').post(ofertaController.addProductOferta);
router.route('/deloferta').post(ofertaController.deleteProductOferta);
router.route('/updateoferta').post(ofertaController.updateProductOferta);


module.exports = router; 