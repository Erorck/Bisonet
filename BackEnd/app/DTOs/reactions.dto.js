const Joi = require('joi');
const { Utilities } = require('../services/utilities.services');
require('dotenv').config();

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const objectId = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const user = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const post = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const liked = Joi.boolean();

const createReactionDto = Joi.object({
  user: user.required(),
  post: post.required(),
});

const updateReactionDto = Joi.object({
  liked: liked.required(),
});

const getReactionDto = Joi.object({
  reactionId: objectId.required(),
});

module.exports = {
  createReactionDto,
  updateReactionDto,
  getReactionDto,
};
