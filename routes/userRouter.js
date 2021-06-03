const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.route('/usuarios').get(userController.getAllUsers);

router.route('/').get(userController.getAllUsers).post(userController.addUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/cadastro').post(authController.cadastro);

router.route('/login').post(authController.login);

router.route('/esqueceuSenha').post(authController.esqueceuSenha);

router.route('/resetSenha/:token').patch(authController.resetSenha);


module.exports = router; 