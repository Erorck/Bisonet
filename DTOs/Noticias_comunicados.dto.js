const Joi = require('joi');
require('dotenv').config();

const uuidN_Comunicados = Joi.string();
const texto = Joi.string();
const fecha = Joi.date();
const active = Joi.boolean();

const createN_ComunicadosDto = Joi.object({
    texto: texto.required(),
    fecha: fecha.required(),
    active: active.required()
});

const updateN_ComunicadosDto = Joi.object({
    texto: texto,
    fecha: fecha.required(),
    active: active.required()
  });

  const getN_ComunicadosDto = Joi.object({
    uuid: uuidN_Comunicados.required()
  });

  module.exports = {
    createN_ComunicadosDto,
    updateN_ComunicadosDto,
    getN_ComunicadosDto,
  };