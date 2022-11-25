const express = require('express');
const postService = require('../services/post.service');
const service = new postService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createPostDto,
  updatePostDto,
  getPostDto,
} = require('../DTOs/post.dto');

const checkRolHandler = require('../middlewares/checkRol.handler');
const authHandler = require('../middlewares/auth.handler');
const { uploadMiddleware } = require('../utils/storage.handler');

const router = express.Router();

//GET ALL POST
router.get(
  '/get',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { size } = req.query;
      const filter = req.body;
      const post = await service.getAll(size || 10, filter);
      res.json({
        success: true,
        message: 'post found successfully',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }
);

//GET POST BY ID
router.get(
  '/get/:postId',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(getPostDto, 'params'),
  async (req, res, next) => {
    try {
      const { postId } = req.params; //Obtener ids
      const post = await service.getById(postId);
      res.json({
        success: true,
        message: 'post found successfully',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }
);

//CREATE POST
router.post(
  '/create',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(createPostDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const post = await service.create(body); //Para updates y creates
      res.json({
        success: true, //Validaciones FrontEnd
        message: 'post created successfully', //Mostrar al usuario
        data: post, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

//PARTIALLY UPDATE POST
router.patch(
  '/update/:postId',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(getPostDto, 'params'),
  validatorHandler(updatePostDto, 'body'),
  async (req, res, next) => {
    try {
      const { postId } = req.params; //Obtener ids
      const body = req.body;
      const { old, changed } = await service.update(postId, body);
      res.json({
        success: true,
        message: 'post updated successfully',
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE BANNER IMAGE
router.patch(
  '/update_banner_image/:postId',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(getPostDto, 'params'),
  uploadMiddleware.single('file'),
  async (req, res, next) => {
    try {
      const { postId } = req.params; //Obtener ids

      const { body, file } = req;

      const photoBody = {
        ...body,
        file_name: file.filename,
        path: file.path,
        original_name: file.originalname,
      };

      const { old, changed } = await service.updateBannerPic(postId, photoBody);
      res.json({
        success: true,
        message: 'banner image updated successfully',
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

//DELETE POST
router.delete(
  '/delete/:postId',
  authHandler,
  checkRolHandler(['Administrador']),
  validatorHandler(getPostDto, 'params'),
  async (req, res, next) => {
    try {
      const { postId } = req.params; //Obtener ids
      post = await service.delete(postId);
      res.json({
        success: true,
        message: 'post eliminated successfully',
        comment: post,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
