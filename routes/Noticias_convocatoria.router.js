const express = require('express');
var faker = require('faker');
const router = express.Router();
const N_convocatoriasService = require('../services/Noticias_convocatoria.service');
const service = new N_convocatoriasService();
const validatorHandler = require('../middlewares/validator.handler');
const {createN_ConvocatoriasDto, updateN_ConvocatoriasDto, getN_ConvocatoriasDto} = require('../DTOs/Noticias_convocatorias.dto');


router.get('/get/tipos_post/Avisos/Convocatorias', async (req, res, next) =>{
    try {
        const{size} = req.query;
        const N_comunicados = service.getAll(size || 10);
        res.json({
          'success':true,
          'message':'Noticias convocatorias found successfully',
          'Data': N_comunicados
      });
      } catch (error) {
        next(error);
      }
});

router.get('/get/tipos_post/Avisos/Convocatorias/:uuid', validatorHandler(getN_ConvocatoriasDto, 'params'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const N_convocatoria = service.getById(uuid);
        res.json({
            'success':true,
            'message':'Noticias convocatorias found successfully',
            'Data': N_convocatoria
        });
      } catch (error) {
        next(error);
      }
});

router.post('/create/tipos_post/Avisos/Convocatorias/', validatorHandler(createN_ConvocatoriasDto, 'body'), (req, res) =>{
    try {
        const body = req.body;
        const N_convocatoria = service.create(body); //Para updates y creates
        res.json({
          'success':true, //Validaciones FrontEnd
          'message':'Noticias convocatorias created successfully', //Mostrar al usuario
          'Data': N_convocatoria //Desplegar información en algún formato
      });
      } catch (error) {
        next(error);
      }
});

router.patch('/update/tipos_post/Avisos/Convocatorias/:uuid', validatorHandler(getN_ConvocatoriasDto, 'params'), validatorHandler(updateN_ConvocatoriasDto, 'body'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const body = req.body;
        const {old, changed} = service.update(uuid, body);
        res.json({
          'success':true,
          'message':'Noticias convocatorias updated successfully',
          'Original': old,
          'Updated': changed
         });
      } catch (error) {
        next(error);
      }
});

router.delete('/delete/tipos_post/Avisos/Convocatorias/:uuid', async (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        N_convocatoria = service.delete(uuid);
        res.json({
          'success':true,
          'message':'Noticias convocatorias eliminated successfully',
          'comment': N_convocatoria
      });
      } catch (error) {
        next(error);
      }
});

module.exports = router;