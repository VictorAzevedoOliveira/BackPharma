
const listaDesejoService = require('../services/listaDesejoService');
const catchAsync = require('../utils/catchAsync');

exports.getAllListas = catchAsync(async (req, res, next) => {
    const prods = await listaDesejoService.getAllListas(); 
    res.status(200).json({
      status: 'success',
      data:[prods]
    });
  });

  exports.getListaDesejo= catchAsync(async (req, res, next) => {
    const prods = await listaDesejoService.getListaDesejo();
 
    res.status(200).json({
      status: 'success',
      data:[prods]
    });
  });

exports.addProductLista = catchAsync(async (req, res, next) => {
    const prod = await listaDesejoService.addProductLista(req);  
    res.status(200).json({
      status: 'success',
      data: prod,
    });
  });
 
exports.deleteProductLista = catchAsync(async (req, res, next) => {
    await listaDesejoService.addProductOferta(req); 
    res.status(201).json({
      status: 'success',
      data: 'Produto deletado!',
    });
  });
  
  exports.calcularProductLista = catchAsync(async (req, res, next) => {
    await listaDesejoService.calcularProductLista(req); 
    res.status(201).json({
      status: 'success',
      data: 'Produto somado!',
    });
  });