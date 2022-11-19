const express = require('express');
var faker = require('faker');
const PhotosService = require('../services/photos.service');
const service = new PhotosService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  createPhotoDto,
  updatePhotoDto,
  getPhotoDto,
} = require('../DTOs/photos.dto');

const checkRolHandler = require('../middlewares/checkRol.handler');
const authHandler = require('../middlewares/auth.handler');
const { uploadMiddleware } = require('../utils/storage.handler');

const router = express.Router();

const { PUBLIC_URL } = require('../../const.json');

router.get(
  '/get/photos',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { size } = req.query;
      const filter = req.body;
      const photos = await service.getAll(size || 10, filter);
      res.json({
        success: true,
        message: 'photos found successfully',
        Data: photos,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/get/photos/:photoId',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(getPhotoDto, 'params'),
  async (req, res, next) => {
    try {
      const { photoId } = req.params; //Obtener ids
      const photos = await service.getById(photoId);
      res.json({
        success: true,
        message: 'photo found successfully',
        url: `${PUBLIC_URL}/${photos.file_name}`,
        Data: photos,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create/photos/:postId',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  //validatorHandler(createPhotoDto, 'body'),
  uploadMiddleware.single('file'),
  async (req, res, next) => {
    try {
      const { body, file } = req;
      const { postId } = req.params;

      const photoBody = {
        ...body,
        post: postId,
        file_name: file.filename,
        path: file.path,
        original_name: file.original_name,
      };

      const photos = await service.create(photoBody); //Para updates y creates
      const fileData = {
        file_name: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
        data: photos,
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
  '/update/photos/:photoId',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(getPhotoDto, 'params'),
  validatorHandler(updatePhotoDto, 'body'),
  async (req, res, next) => {
    try {
      const { photoId } = req.params; //Obtener ids
      const body = req.body;
      const { old, changed } = await service.update(photoId, body);
      res.json({
        success: true,
        message: 'photo updated successfully',
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
  '/delete/photos/:photoId',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { photoId } = req.params; //Obtener ids
      photos = await service.delete(photoId);
      res.json({
        success: true,
        message: 'photos eliminated successfully',
        comment: photos,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
