const Joi = require('joi');
require('dotenv').config();

const uuidSection = Joi.string();
const seccion = Joi.string();
const orden = Joi.number().min(1).max(10);
const active = Joi.boolean();

const createSectionDto = Joi.object({
    seccion: seccion.required(),
    orden: orden.required(),
    active: active.required()
});

const updateSectionDto = Joi.object({
    seccion: seccion,
    orden: orden,
    active: active.required()
  });

  const getSectionDto = Joi.object({
    uuid: uuidSection.required()
  });

  module.exports = {
    createSectionDto,
    updateSectionDto,
    getSectionDto,
  };