const Joi = require('joi');
const {Utilities} = require('../services/utilities.services');
require('dotenv').config();


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const objectId = Joi.string();
const userId = Joi.number().min(1500000).max(2500000);
const passwordPattern = Joi.string().pattern(Utilities.REGEX_VALD_PASSWORD.pattern, Utilities.REGEX_VALD_PASSWORD.name);
const first_name = Joi.string().pattern(Utilities.REGEX_VALD_NAME.pattern, Utilities.REGEX_VALD_NAME.name);
const first_last_name = Joi.string().pattern(Utilities.REGEX_VALD_NAME.pattern, Utilities.REGEX_VALD_NAME.name);
const second_last_name = Joi.string().pattern(Utilities.REGEX_VALD_NAME.pattern, Utilities.REGEX_VALD_NAME.name);
const institutional_email = Joi.string().pattern(Utilities.REGEX_VALD_EMAIL.pattern, Utilities.REGEX_VALD_EMAIL.name);
const career_especialty = Joi.string();
const current_semester = Joi.number().min(1).max(10);
const profileImage = Joi.string();
const user_type = Joi.string().pattern(Utilities.REGEX_VALD_NAME.pattern, Utilities.REGEX_VALD_NAME.name);
const isActive = Joi.boolean();

const createUserDto = Joi.object({
  userId: userId.required(),
  password: passwordPattern.required(),
  first_name: first_name.required(),
  first_last_name: first_last_name.required(),
  second_last_name: second_last_name.required(),
  institutional_email: institutional_email.required(),
  career_especialty: career_especialty.required(),
  current_semester: current_semester.required(),
  profileImage: profileImage,
  user_type: user_type.required(),
  isActive: isActive.required()
});

const updateUserDto = Joi.object({
  password: passwordPattern,
  first_name: first_name,
  first_last_name: first_last_name,
  second_last_name: second_last_name,
  institutional_email: institutional_email,
  career_especialty: career_especialty,
  current_semester: current_semester,
  profileImage: profileImage,
  user_type:user_type,
  isActive: isActive
});

const getUserDto = Joi.object({
  userId: objectId.required()
});

module.exports = {
  createUserDto,
  updateUserDto,
  getUserDto,
};
