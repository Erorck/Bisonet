const Joi = require('joi');
const {Utilities} = require('../services/utilities.services');
require('dotenv').config();


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const groupId = Joi.string();
const group_teacher = Joi.string();
const group_members = Joi.string();
const course = Joi.string();
const year = Joi.number().min(2010).max(2025);
const semester = Joi.number().min(1).max(2);
const posts = Joi.string();
const isActive = Joi.boolean();

const createGroupDto = Joi.object({
  group_teacher: group_teacher.required(),
  group_members: group_members.required(),
  course: course.required(),
  year: year.required(),
  semester: semester.required(),
  isActive: isActive.required()
});

const updateGroupDto = Joi.object({
  group_teacher: group_teacher,
  group_members: group_members,
  course: course,
  year: year,
  semester: semester,
  posts: posts,
  isActive: isActive
});

const getGroupDto = Joi.object({
  groupId: groupId.required()
});

module.exports = {
  createGroupDto,
  updateGroupDto,
  getGroupDto,
};
