const Joi = require('joi');
require('dotenv').config();

const uuidE_deportivos = Joi.string();
const texto = Joi.string();
const fecha = Joi.date();
const active = Joi.boolean();

const createE_DeportivoDto = Joi.object({
    texto: texto.required(),
    fecha: fecha.required(),
    active: active.required()
});

const updateE_DeportivoDto = Joi.object({
    texto: texto,
    fecha: fecha.required(),
    active: active.required()
  });

  const getE_DeportivoDto = Joi.object({
    uuid: uuidE_deportivos.required()
  });

  module.exports = {
    createE_DeportivoDto,
    updateE_DeportivoDto,
    getE_DeportivoDto,
  };