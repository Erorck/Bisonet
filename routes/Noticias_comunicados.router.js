const express = require('express');
var faker = require('faker');
const router = express.Router();
const N_comunicadosService = require('../services/Noticias_comunicados.service');
const service = new N_comunicadosService();
const validatorHandler = require('../middlewares/validator.handler');
const {createN_ComunicadosDto, updateN_ComunicadosDto, getN_ComunicadosDto} = require('../DTOs/Noticias_comunicados.dto');


router.get('/get/tipos_post/Avisos/Comunicados', async (req, res, next) =>{
    try {
        const{size} = req.query;
        const N_comunicados = service.getAll(size || 10);
        res.json({
          'success':true,
          'message':'Noticias comunicados found successfully',
          'Data': N_comunicados
      });
      } catch (error) {
        next(error);
      }
});

router.get('/get/tipos_post/Avisos/Comunicados/:uuid', validatorHandler(getN_ComunicadosDto, 'params'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const N_comunicados = service.getById(uuid);
        res.json({
            'success':true,
            'message':'Noticias comunicados found successfully',
            'Data': N_comunicados
        });
      } catch (error) {
        next(error);
      }
});

router.post('/create/tipos_post/Avisos/Comunicados/', validatorHandler(createN_ComunicadosDto, 'body'), (req, res) =>{
    try {
        const body = req.body;
        const N_comunicados = service.create(body); //Para updates y creates
        res.json({
          'success':true, //Validaciones FrontEnd
          'message':'Noticias comunicados created successfully', //Mostrar al usuario
          'Data': N_comunicados //Desplegar información en algún formato
      });
      } catch (error) {
        next(error);
      }
});

router.patch('/update/tipos_post/Avisos/Comunicados/:uuid', validatorHandler(getN_ComunicadosDto, 'params'), validatorHandler(updateN_ComunicadosDto, 'body'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const body = req.body;
        const {old, changed} = service.update(uuid, body);
        res.json({
          'success':true,
          'message':'Noticias comunicados updated successfully',
          'Original': old,
          'Updated': changed
         });
      } catch (error) {
        next(error);
      }
});

router.delete('/delete/tipos_post/Avisos/Comunicados/:uuid', async (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        N_comunicados = service.delete(uuid);
        res.json({
          'success':true,
          'message':'Noticias comunicados eliminated successfully',
          'comment': N_comunicados
      });
      } catch (error) {
        next(error);
      }
});

module.exports = router;