const Joi = require('joi');
const {Utilities} = require('../services/utilities.services');
require('dotenv').config();


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const courseId = Joi.string();
const course_name = Joi.string();
const career_especialty = Joi.string();
const semester = Joi.number().min(1).max(10);
const groups = Joi.string();
const isActive = Joi.boolean();

const createCourseDto = Joi.object({
  courseId: courseId.required(),
  course_name: course_name.required(),
  career_especialty: career_especialty.required(),
  semester: semester.required(),
  groups: groups,
  isActive: isActive.required()
});

const updateCourseDto = Joi.object({
  course_name: course_name,
  career_especialty: career_especialty,
  semester: semester,
  groups: groups,
  isActive: isActive
});

const getCourseDto = Joi.object({
  courseId: courseId.required()
});

module.exports = {
  createCourseDto,
  updateCourseDto,
  getCourseDto,
};
