const Joi = require('joi');
require('dotenv').config();

const uuidE_culturales = Joi.string();
const texto = Joi.string();
const fecha = Joi.date();
const active = Joi.boolean();

const createE_CulturalesDto = Joi.object({
    texto: texto.required(),
    fecha: fecha.required(),
    active: active.required()
});

const updateE_CulturalesDto = Joi.object({
    texto: texto,
    fecha: fecha.required(),
    active: active.required()
  });

  const getE_CulturalesDto = Joi.object({
    uuid: uuidE_culturales.required()
  });

  module.exports = {
    createE_CulturalesDto,
    updateE_CulturalesDto,
    getE_CulturalesDto,
  };