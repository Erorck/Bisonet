const Joi = require('joi');
require('dotenv').config();

const uuidN_Convocatorias = Joi.string();
const texto = Joi.string();
const fecha = Joi.date();
const active = Joi.boolean();

const createN_ConvocatoriasDto = Joi.object({
    texto: texto.required(),
    fecha: fecha.required(),
    active: active.required()
});

const updateN_ConvocatoriasDto = Joi.object({
    texto: texto,
    fecha: fecha.required(),
    active: active.required()
  });

  const getN_ConvocatoriasDto = Joi.object({
    uuid: uuidN_Convocatorias.required()
  });

  module.exports = {
    createN_ConvocatoriasDto,
    updateN_ConvocatoriasDto,
    getN_ConvocatoriasDto,
  };