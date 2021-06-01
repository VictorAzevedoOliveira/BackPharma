const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const UsersControlles = require('../controllers/UsersControllers');
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

router.route('/resetSenha').patch(authController.resetSenha);


module.exports = router; 