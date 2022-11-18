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

const router = express.Router();

router.get(
  '/get/photos',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { size } = req.query;
      const photos = await service.getAll(size || 10);
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
  validatorHandler(getPhotoDto, 'params'),
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { photoId } = req.params; //Obtener ids
      const photos = await service.getById(photoId);
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

router.post(
  '/create/photos/',
  validatorHandler(createPhotoDto, 'body'),
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res) => {
    try {
      const body = req.body;
      const photos = await service.create(body); //Para updates y creates
      res.json({
        success: true, //Validaciones FrontEnd
        message: 'photos created successfully', //Mostrar al usuario
        Data: photos, //Desplegar información en algún formato
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
        message: 'photos updated successfully',
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
