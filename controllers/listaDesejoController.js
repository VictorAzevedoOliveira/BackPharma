
const listaDesejoService = require('../services/listaDesejoService');
const catchAsync = require('../utils/catchAsync');

exports.getAllListas = catchAsync(async (req, res, next) => {
    const listaprod = await listaDesejoService.getAllListas(req); 
    res.status(200).json({
      status: 'success',
      data:[listaprod]
    });
  });

  exports.getListaDesejo= catchAsync(async (req, res, next) => {
    const listaproduser = await listaDesejoService.getListaDesejo(req);
 
    res.status(200).json({
      status: 'success',
      data:[listaproduser]
    });
  });

exports.addProductLista = catchAsync(async (req, res, next) => {
    const prodadded = await listaDesejoService.addProductLista(req);  
    res.status(200).json({
      status: 'success',
      data:'Produto adicionado!'+ [prodadded],
    });
  });
 
exports.deleteProductLista = catchAsync(async (req, res, next) => {
  const produtodel = await listaDesejoService.deleteProductLista(req); 
    res.status(201).json({
      status: 'success',
      data: 'Produto deletado!'+ [produtodel] ,
    });
  });
  
  exports.calcularSoma = catchAsync(async (req, res, next) => {
    const valortotal = await listaDesejoService.calcularSoma(req); 
    res.status(201).json({
      status: 'success',
      data: 'Produto somado: ' + [valortotal] ,
    });
  });