const express = require('express');
const CoursesService = require('../services/courses.service');
const service = new CoursesService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createCourseDto,
  updateCourseDto,
  getCourseDto,
} = require('../DTOs/courses.dto');

const checkRolHandler = require('../middlewares/checkRol.handler');
const authHandler = require('../middlewares/auth.handler');
const router = express.Router();

//RUTAS GENERALES /

//GET ALL COURSES
router.get(
  '/',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { size } = req.query;
      const filter = req.body;
      const courses = await service.getAll(size || 10, filter);
      res.json({
        success: true,
        message: 'courses found successfully',
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  }
);

//CREATE COURSE
router.post(
  '/',
  authHandler,
  checkRolHandler(['Administrador']),
  validatorHandler(createCourseDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const course = await service.create(body); //Para updates y creates
      res.json({
        success: true, //Validaciones FrontEnd
        message: 'Course created successfully', //Mostrar al usuario
        data: course, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

//RUTAS ESPECIFICAS /:id

//GET COURSE BY ID
router.get(
  '/:courseId',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(getCourseDto, 'params'),
  async (req, res, next) => {
    try {
      const { courseId } = req.params; //Obtener ids
      const course = await service.getById(courseId);
      res.json({
        success: true,
        message: 'Course found successfully',
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }
);

//PARTIALLY UPDATE COURSE
router.patch(
  '/:courseId',
  authHandler,
  checkRolHandler(['Administrador']),
  validatorHandler(getCourseDto, 'params'),
  validatorHandler(updateCourseDto, 'body'),
  async (req, res, next) => {
    try {
      const { courseId } = req.params; //Obtener ids
      const body = req.body;
      const { old, changed } = await service.update(courseId, body);
      res.json({
        success: true,
        message: 'Course updated successfully',
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
  '/:courseId',
  authHandler,
  checkRolHandler(['Administrador']),
  validatorHandler(getCourseDto, 'params'),
  async (req, res, next) => {
    try {
      const { courseId } = req.params; //Obtener ids
      deletedCourse = await service.delete(courseId);
      res.json({
        success: true,
        message: 'Course eliminated successfully',
        course: deletedCourse,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
