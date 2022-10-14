const express = require('express');
var faker = require('faker');
const router = express.Router();
const VideosService = require('../services/videos.service');
const service = new VideosService();
const validatorHandler = require('../middlewares/validator.handler');
const {createVideoDto, updateVideoDto, getVideoDto} = require('../DTOs/videos.dto');

router.get('/get/videos', async (req, res, next) =>{
    try {
        const{size} = req.query;
        const videos = service.getAll(size || 10);
        res.json({
          'success':true,
          'message':'videos found successfully',
          'Data': videos
      });
      } catch (error) {
        next(error);
      }
});

router.get('/get/videos/:idVideo', validatorHandler(getVideoDto, 'params'), (req, res, next) =>{
    try {
        const {idVideo} = req.params; //Obtener ids
        const videos = service.getById(idVideo);
        res.json({
            'success':true,
            'message':'videos found successfully',
            'Data': videos
        });
      } catch (error) {
        next(error);
      }
});

router.post('/create/videos/', validatorHandler(createVideoDto, 'body'), (req, res) =>{
    try {
        const body = req.body;
        const videos = service.create(body); //Para updates y creates
        res.json({
          'success':true, //Validaciones FrontEnd
          'message':'videos created successfully', //Mostrar al usuario
          'Data': videos //Desplegar información en algún formato
      });
      } catch (error) {
        next(error);
      }
});

router.patch('/update/videos/:idVideo', validatorHandler(getVideoDto, 'params'), validatorHandler(updateVideoDto, 'body'), (req, res, next) =>{
    try {
        const {idVideo} = req.params; //Obtener ids
        const body = req.body;
        const {old, changed} = service.update(idVideo, body);
        res.json({
          'success':true,
          'message':'videos updated successfully',
          'Original': old,
          'Updated': changed
         });
      } catch (error) {
        next(error);
      }
});

router.delete('/delete/videos/:idVideo', async (req, res, next) =>{
    try {
        const {idVideo} = req.params; //Obtener ids
        videos = service.delete(idVideo);
        res.json({
          'success':true,
          'message':'photos eliminated successfully',
          'comment': videos
      });
      } catch (error) {
        next(error);
      }
});

module.exports = router;
