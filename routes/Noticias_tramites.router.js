const express = require('express');
var faker = require('faker');
const router = express.Router();
const N_tramitesService = require('../services/Noticias_tramites.service');
const service = new N_tramitesService();
const validatorHandler = require('../middlewares/validator.handler');
const {createN_TramitesDto, updateN_TramitesDto, getN_TramitesDto} = require('../DTOs/Noticias_tramites.dto');


router.get('/get/tipos_post/Avisos/Tramites', async (req, res, next) =>{
    try {
        const{size} = req.query;
        const N_tramites = service.getAll(size || 10);
        res.json({
          'success':true,
          'message':'Noticias tramites found successfully',
          'Data': N_tramites
      });
      } catch (error) {
        next(error);
      }
});

router.get('/get/tipos_post/Avisos/Tramites/:uuid', validatorHandler(getN_TramitesDto, 'params'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const N_tramites = service.getById(uuid);
        res.json({
            'success':true,
            'message':'Tramites tramites found successfully',
            'Data': N_tramites
        });
      } catch (error) {
        next(error);
      }
});

router.post('/create/tipos_post/Avisos/Tramites/', validatorHandler(createN_TramitesDto, 'body'), (req, res) =>{
    try {
        const body = req.body;
        const N_tramites = service.create(body); //Para updates y creates
        res.json({
          'success':true, //Validaciones FrontEnd
          'message':'Noticias tramites created successfully', //Mostrar al usuario
          'Data': N_tramites //Desplegar información en algún formato
      });
      } catch (error) {
        next(error);
      }
});

router.patch('/update/tipos_post/Avisos/Tramites/:uuid', validatorHandler(getN_TramitesDto, 'params'), validatorHandler(updateN_TramitesDto, 'body'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const body = req.body;
        const {old, changed} = service.update(uuid, body);
        res.json({
          'success':true,
          'message':'Noticias tramites updated successfully',
          'Original': old,
          'Updated': changed
         });
      } catch (error) {
        next(error);
      }
});

router.delete('/delete/tipos_post/Avisos/Tramites/:uuid', async (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        N_tramites = service.delete(uuid);
        res.json({
          'success':true,
          'message':'Noticias tramites eliminated successfully',
          'comment': N_tramites
      });
      } catch (error) {
        next(error);
      }
});

module.exports = router;