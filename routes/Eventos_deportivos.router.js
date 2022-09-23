const express = require('express');
var faker = require('faker');
const router = express.Router();
const E_deportivosService = require('../services/E_deportivos.services');
const service = new E_deportivosService();
const validatorHandler = require('../middlewares/validator.handler');
const {createE_DeportivoDto, updateE_DeportivoDto, getE_DeportivoDto} = require('../DTOs/Eventos_deportivos.dto');


router.get('/get/tipos_post/Eventos/Deportivos', async (req, res, next) =>{
    try {
        const{size} = req.query;
        const E_deportivos = service.getAll(size || 10);
        res.json({
          'success':true,
          'message':'Eventos Deportivos found successfully',
          'Data': E_deportivos
      });
      } catch (error) {
        next(error);
      }
    
});

router.get('/get/tipos_post/Eventos/Deportivos/:uuid',  validatorHandler(getE_DeportivoDto, 'params'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const E_deportivos = service.getById(uuid);
        res.json({
            'success':true,
            'message':'Eventos Deportivos found successfully',
            'Data': E_deportivos
        });
      } catch (error) {
        next(error);
      }
});

router.post('/create/tipos_post/Eventos/Deportivos/', validatorHandler(createE_DeportivoDto, 'body'), (req, res) =>{
    try {
        const body = req.body;
        const E_deportivos = service.create(body); //Para updates y creates
        res.json({
          'success':true, //Validaciones FrontEnd
          'message':'Eventos Deportivos created successfully', //Mostrar al usuario
          'Data': E_deportivos //Desplegar información en algún formato
      });
      } catch (error) {
        next(error);
      }
});

router.patch('/update/tipos_post/Eventos/Deportivos/:uuid', validatorHandler(getE_DeportivoDto, 'params'), validatorHandler(updateE_DeportivoDto, 'body'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const body = req.body;
        const {old, changed} = service.update(uuid, body);
        res.json({
          'success':true,
          'message':'Eventos Deportivos updated successfully',
          'Original': old,
          'Updated': changed
         });
      } catch (error) {
        next(error);
      }
});

router.delete('/delete/tipos_post/Eventos/Deportivos/:uuid', async (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        E_deportivos = service.delete(uuid);
        res.json({
          'success':true,
          'message':'Eventos Deportivos eliminated successfully',
          'comment': E_deportivos
      });
      } catch (error) {
        next(error);
      }
    
});

module.exports = router;