const express = require('express');
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
const { uploadMiddleware } = require('../utils/storage.handler');

const router = express.Router();

const { PUBLIC_URL } = require('../../const.json');

router.get(
  '/get/videos',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { size } = req.query;
      const filter = req.body;
      const videos = await service.getAll(size || 10, filter);
      res.json({
        success: true,
        message: 'videos found successfully',
        data: videos,
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
        message: 'video found successfully',
        url: `${PUBLIC_URL}/${videos.file_name}`,
        data: videos,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create/videos/:postId',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  //validatorHandler(createVideoDto, 'body'),
  uploadMiddleware.single('file'),
  async (req, res, next) => {
    try {
      const { body, file } = req;
      const { postId } = req.params;

      const videoBody = {
        ...body,
        post: postId,
        file_name: file.filename,
        path: file.path,
        original_name: file.originalname,
      };

      const videos = await service.create(videoBody); //Para updates y creates
      const fileData = {
        file_name: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
        data: videos,
      };

      res.json({
        success: true, //Validaciones FrontEnd
        message: `Image created successfully - ${file['filename']}`, //Mostrar al usuario
        data: fileData, //Desplegar información en algún formato
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
        message: 'video updated successfully',
        url: `${PUBLIC_URL}/${changed.file_name}`,
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
  validatorHandler(getVideoDto, 'params'),
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
