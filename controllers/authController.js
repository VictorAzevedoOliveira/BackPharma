const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.signup = catchAsync(async (req, res, next) => {
    const token = await authService.signup(req, res);
  
    res.status(201).json({
      status: 'success',
      data: 'Usuário criado!',
      token,
    });
  });
  
  exports.login = catchAsync(async (req, res, next) => {
    const token = await authService.login(req, res);
  
    res.status(200).json({
      status: 'success',
      data: 'User loged in',
      token,
    });
  });
  
  exports.forgotPassword = catchAsync(async (req, res, next) => {
    await authService.forgotPassword(req);
  
    res.status(200).json({
      status: 'success',
      data: 'Token sent to email!',
    });
  });
  
  exports.resetPassword = catchAsync(async (req, res, next) => {
    const token = await authService.resetPassword(req, res);
  
    res.status(200).json({
      status: 'success',
      data: 'User changed password!',
      token,
    });
  });
  
  exports.protect = catchAsync(async (req, res, next) => {
    const user = await authService.protect(req);
  
    req.user = user;
    next();
  });
  
  