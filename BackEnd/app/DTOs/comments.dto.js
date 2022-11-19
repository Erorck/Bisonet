const Joi = require('joi');
const { Utilities } = require('../services/utilities.services');
require('dotenv').config();

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const objectId = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const author = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const post = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const content = Joi.string();
const isActive = Joi.boolean();

const createCommentDto = Joi.object({
  author: author.required(),
  post: post.required(),
  content: content.required(),
});

const updateCommentDto = Joi.object({
  content: content,
  isActive: isActive,
});

const getCommentDto = Joi.object({
  commentId: objectId.required(),
});

module.exports = {
  createCommentDto,
  updateCommentDto,
  getCommentDto,
};
