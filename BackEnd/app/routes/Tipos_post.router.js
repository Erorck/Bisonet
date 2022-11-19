const express = require('express');
var faker = require('faker');
const TiposPostService = require('../services/types_post.service');
const service = new TiposPostService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createTypePostDto,
  updateTypePostDto,
  getTypePostDto,
} = require('../DTOs/Post_Type.dto');

const checkRolHandler = require('../middlewares/checkRol.handler');
const authHandler = require('../middlewares/auth.handler');
const router = express.Router();

//get all
router.get(
  '/',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { size } = req.query;
      const tiposPost = await service.getAll(size || 10);
      res.json({
        success: true,
        message: 'tipos post found successfully',
        Data: tiposPost,
      });
    } catch (error) {
      next(error);
    }
  }
);

//create
router.post(
  '/',
  authHandler,
  checkRolHandler(['Administrador']),
  validatorHandler(createTypePostDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const tiposPost = await service.create(body); //Para updates y creates
      res.json({
        success: true, //Validaciones FrontEnd
        message: 'tipos post created successfully', //Mostrar al usuario
        Data: tiposPost, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

//GET Tipos Post BY ID
router.get(
  '/:TiposPostId',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(getTypePostDto, 'params'),
  async (req, res, next) => {
    try {
      const { TiposPostId } = req.params; //Obtener ids
      const tiposPost = await service.getById(TiposPostId);
      res.json({
        success: true,
        message: 'tipos post found successfully',
        Data: tiposPost,
      });
    } catch (error) {
      next(error);
    }
  }
);

//PARTIALLY UPDATE Tipos Post
router.patch(
  '/:TiposPostId',
  authHandler,
  checkRolHandler(['Administrador']),
  validatorHandler(getTypePostDto, 'params'),
  validatorHandler(updateTypePostDto, 'body'),
  async (req, res, next) => {
    try {
      const { TiposPostId } = req.params; //Obtener ids
      const body = req.body;
      const { old, changed } = await service.update(TiposPostId, body);
      res.json({
        success: true,
        message: 'tipos post updated successfully',
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

//DELETE COURSE
router.delete(
  '/:TiposPostId',
  authHandler,
  checkRolHandler(['Administrador']),
  async (req, res, next) => {
    try {
      const { TiposPostId } = req.params; //Obtener ids
      deletedTipoPost = await service.delete(TiposPostId);
      res.json({
        success: true,
        message: 'tipos post eliminated successfully',
        course: deletedTipoPost,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
