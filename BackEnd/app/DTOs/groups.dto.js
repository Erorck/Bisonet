const Joi = require('joi');
const { Utilities } = require('../services/utilities.services');
require('dotenv').config();

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const objectId = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const group_teacher = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const group_members = Joi.array();
const course = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const year = Joi.number().min(2010).max(2025);
const semester = Joi.number().min(1).max(2);
const posts = Joi.array();
const isActive = Joi.boolean();

const createGroupDto = Joi.object({
  group_teacher: group_teacher.required(),
  group_members: group_members.required(),
  course: course.required(),
  year: year.required(),
  semester: semester.required(),
});

const updateGroupDto = Joi.object({
  group_teacher: group_teacher,
  group_members: group_members,
  course: course,
  posts: posts,
  isActive: isActive,
});

const getGroupDto = Joi.object({
  groupId: objectId.required(),
});

module.exports = {
  createGroupDto,
  updateGroupDto,
  getGroupDto,
};
