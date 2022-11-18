const express = require('express');
var faker = require('faker');
const VideosService = require('../services/videos.service');
const service = new VideosService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createVideoDto,
  updateVideoDto,
  getVideoDto,
} = require('../DTOs/videos.dto');

const checkRolHandler = require('../middlewares/checkRol.handler');
const authHandler = require('../middlewares/auth.handler');
const router = express.Router();

router.get(
  '/get/videos',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { size } = req.query;
      const videos = await service.getAll(size || 10);
      res.json({
        success: true,
        message: 'videos found successfully',
        Data: videos,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/get/videos/:idVideo',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(getVideoDto, 'params'),
  async (req, res, next) => {
    try {
      const { idVideo } = req.params; //Obtener ids
      const videos = await service.getById(idVideo);
      res.json({
        success: true,
        message: 'videos found successfully',
        Data: videos,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create/videos/',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(createVideoDto, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const videos = await service.create(body); //Para updates y creates
      res.json({
        success: true, //Validaciones FrontEnd
        message: 'videos created successfully', //Mostrar al usuario
        Data: videos, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/update/videos/:idVideo',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(getVideoDto, 'params'),
  validatorHandler(updateVideoDto, 'body'),
  async (req, res, next) => {
    try {
      const { idVideo } = req.params; //Obtener ids
      const body = req.body;
      const { old, changed } = await service.update(idVideo, body);
      res.json({
        success: true,
        message: 'videos updated successfully',
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/delete/videos/:idVideo',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { idVideo } = req.params; //Obtener ids
      videos = await service.delete(idVideo);
      res.json({
        success: true,
        message: 'photos eliminated successfully',
        comment: videos,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
