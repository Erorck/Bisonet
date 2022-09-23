const Joi = require('joi');
require('dotenv').config();

const uuidN_Tramites = Joi.string();
const texto = Joi.string();
const fecha = Joi.date();
const active = Joi.boolean();

const createN_TramitesDto = Joi.object({
    texto: texto.required(),
    fecha: fecha.required(),
    active: active.required()
});

const updateN_TramitesDto = Joi.object({
    texto: texto,
    fecha: fecha.required(),
    active: active.required()
  });

  const getN_TramitesDto = Joi.object({
    uuid: uuidN_Tramites.required()
  });

  module.exports = {
    createN_TramitesDto,
    updateN_TramitesDto,
    getN_TramitesDto,
  };