const Joi = require('joi');
const { Utilities } = require('../services/utilities.services');
require('dotenv').config();

const ObjecIdtPostType = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const idPostType = Joi.number().min(1500000).max(2500000);
const Nombre = Joi.string();
const Color = Joi.string().pattern(
  Utilities.REGEX_VALD_HEX_COLOR.pattern,
  Utilities.REGEX_VALD_HEX_COLOR.name
);

const createTypePostDto = Joi.object({
  type_post_id: idPostType.required(),
  nombre: Nombre.required(),
  color: Color.required(),
});

const updateTypePostDto = Joi.object({
  nombre: Nombre,
  color: Color,
});

const getTypePostDto = Joi.object({
  TiposPostId: ObjecIdtPostType.required(),
});

module.exports = {
  createTypePostDto,
  updateTypePostDto,
  getTypePostDto,
};
