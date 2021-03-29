const express = require('express');

const testCelebrate = require('./utils/celebrateMethods');

/*Import rotas de controle da api-------------------------------------------------*/
const SessionController = require('./controllers/SessionController');
const AdminController = require('./controllers/AdminController');
const SampleController = require('./controllers/SampleController');
const TrackingController = require('./controllers/TrackingController');
const ProcessController = require ('./controllers/ProcessController');
const ValidateCodeController = require('./controllers/ValidateCodeController');
/*---------------------------------------------------------------------------------*/
const { celebrate } = require('celebrate');

const routes = express.Router();

//F4
routes.post('/session', SessionController.create);

//F2 e F3
routes.post('/admin',celebrate(testCelebrate.createAdmin) ,AdminController.create);
routes.put('/admin',celebrate(testCelebrate.createAdmin), AdminController.change);

//F5
routes.post('/sample', SampleController.create);

//F9 e F6
routes.get('/sample/tracking', TrackingController.index);
routes.put('/sample/tracking', TrackingController.change);

//F7 e F10
routes.get('/sample/process',ProcessController.index);
routes.post('/sample/process',ProcessController.create);
routes.put('/sample/process',ProcessController.change);

//F8
routes.get('./validate', ValidateCodeController.index);

module.exports = routes;