const express = require('express');
var faker = require('faker');
const router = express.Router();
const E_culturalesService = require('../services/E_culturales.service');
const service = new E_culturalesService();
const validatorHandler = require('../middlewares/validator.handler');
const {createE_CulturalesDto, updateE_CulturalesDto, getE_CulturalesDto} = require('../DTOs/Eventos_culturales.dto');


router.get('/get/tipos_post/Eventos/Culturales', async (req, res, next) =>{
    try {
        const{size} = req.query;
        const E_Culturales = service.getAll(size || 10);
        res.json({
          'success':true,
          'message':'Eventos Culturales found successfully',
          'Data': E_Culturales
      });
      } catch (error) {
        next(error);
      }
});

router.get('/get/tipos_post/Eventos/Culturales/:uuid', validatorHandler(getE_CulturalesDto, 'params'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const E_Culturales = service.getById(uuid);
        res.json({
            'success':true,
            'message':'Eventos Culturales found successfully',
            'Data': E_Culturales
        });
      } catch (error) {
        next(error);
      }
});

router.post('/create/tipos_post/Eventos/Culturales/', validatorHandler(createE_CulturalesDto, 'body'), (req, res) =>{
    try {
        const body = req.body;
        const E_Culturales = service.create(body); //Para updates y creates
        res.json({
          'success':true, //Validaciones FrontEnd
          'message':'Eventos Culturales created successfully', //Mostrar al usuario
          'Data': E_Culturales //Desplegar información en algún formato
      });
      } catch (error) {
        next(error);
      }
});

router.patch('/update/tipos_post/Eventos/Culturales/:uuid',  validatorHandler(getE_CulturalesDto, 'params'), validatorHandler(updateE_CulturalesDto, 'body'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const body = req.body;
        const {old, changed} = service.update(uuid, body);
        res.json({
          'success':true,
          'message':'Eventos Culturales updated successfully',
          'Original': old,
          'Updated': changed
         });
      } catch (error) {
        next(error);
      }
});

router.delete('/delete/tipos_post/Eventos/Culturales/:uuid', async (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        E_Culturales = service.delete(uuid);
        res.json({
          'success':true,
          'message':'Eventos Culturales eliminated successfully',
          'comment': E_Culturales
      });
      } catch (error) {
        next(error);
      }
});

module.exports = router;