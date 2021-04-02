const express = require('express');

/*Import rotas de controle da api-------------------------------------------------*/
const SessionController = require('./controllers/SessionController');
const AdminController = require('./controllers/AdminController');
const SampleController = require('./controllers/SampleController');
const ProcessController = require ('./controllers/ProcessController');
const ValidateCodeController = require('./controllers/ValidateCodeController');
/*---------------------------------------------------------------------------------*/

/*Import metodos de controle do celebrate------------------------------------------*/
const celebrateMethodsSession = require('./celebrate/celebrateMethodsSession');
const celebrateMethodsAdmin = require('./celebrate/celebrateMethodsAdmin');
const celebrateMethodsSample = require('./celebrate/celebrateMethodsSample');
const celebrateMethodsProcess = require('./celebrate/celebrateMethodsProcess');
const celebrateMethodsValidateCode = require('./celebrate/celebrateMethodsValidateCode');
/*---------------------------------------------------------------------------------*/

const { celebrate } = require('celebrate');

const routes = express.Router();

//F4
routes.post('/session',celebrate(celebrateMethodsSession.createSession) ,SessionController.create);

//F2 e F3
routes.get('/admin', celebrate(celebrateMethodsAdmin.indexAdmin) ,AdminController.index);
routes.post('/admin', celebrate(celebrateMethodsAdmin.createAdmin) ,AdminController.create);
routes.put('/admin', celebrate(celebrateMethodsAdmin.changeAdmin), AdminController.change);

//F5 e F6
routes.get('/sample/:code', celebrate(celebrateMethodsSample.IndexSample), SampleController.index)
routes.post('/sample', celebrate(celebrateMethodsSample.createSample),SampleController.create);
routes.put('/sample', celebrate(celebrateMethodsSample.changeSampleId),SampleController.change);

//F7
routes.get('/sample/process/:id_sample', celebrate(celebrateMethodsProcess.IndexProcess),ProcessController.index);
routes.post('/sample/process', celebrate(celebrateMethodsProcess.createProcess),ProcessController.create);
routes.put('/sample/process', celebrate(celebrateMethodsProcess.changeChange),ProcessController.change);

//F8
routes.get('/validate/:code', celebrate(celebrateMethodsValidateCode.indexValidateCode) ,ValidateCodeController.index);

module.exports = routes;