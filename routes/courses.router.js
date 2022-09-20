const express = require('express');
const CoursesService = require('../services/courses.service');
const service = new CoursesService();
const validatorHandler = require('../middlewares/validator.handler')
const {createCourseDto, updateCourseDto, getCourseDto} = require('../DTOs/course.dto')

const router = express.Router();

//RUTAS GENERALES /

//GET ALL COURSES
router.get('/', (req, res, next) => {
  try {
    const{size} = req.query;
    const courses = service.getAll(size || 10);
    res.json({
      'success':true,
      'message':'courses found successfully',
      'Data': courses
  });
  } catch (error) {
    next(error);
  }

});


//CREATE COURSE
router.post('/', validatorHandler(createCourseDto, 'body'), (req, res) => {
  try {
    const body = req.body;
    const course = service.create(body); //Para updates y creates
    res.json({
      'success':true, //Validaciones FrontEnd
      'message':'Course created successfully', //Mostrar al usuario
      'Data': course //Desplegar información en algún formato
  });
  } catch (error) {
    next(error);
  }

});

//RUTAS ESPECIFICAS /:id

//GET COURSE BY ID
router.get('/:courseId', validatorHandler(getCourseDto, 'params'), (req, res, next) => {
  try {
    const {courseId} = req.params; //Obtener ids
    const course = service.getById(courseId);
    res.json({
        'success':true,
        'message':'Course found successfully',
        'Data': course
    });
  } catch (error) {
    next(error);
  }

});

//PARTIALLY UPDATE COURSE
router.patch('/:courseId', validatorHandler(getCourseDto, 'params'), validatorHandler(updateCourseDto, 'body'), (req, res, next) => {
  try {
    const {courseId} = req.params; //Obtener ids
    const body = req.body;
    const {old, changed} = service.update(courseId, body);
    res.json({
      'success':true,
      'message':'Course updated successfully',
      'Original': old,
      'Updated': changed
     });
  } catch (error) {
    next(error);
  }

});

//DELETE COURSE
router.delete('/:courseId', (req, res, next) => {
  try {
    const {courseId} = req.params; //Obtener ids
    deletedCourse = service.delete(courseId);
    res.json({
      'success':true,
      'message':'Course eliminated successfully',
      'course': deletedCourse
  });
  } catch (error) {
    next(error);
  }

});

module.exports = router;


