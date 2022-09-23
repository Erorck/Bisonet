const Joi = require('joi');
require('dotenv').config();

const uuidPost = Joi.string();
const texto = Joi.string();
const fecha = Joi.date();
const autor = Joi.string();
const active = Joi.boolean();

const createPostDto = Joi.object({
    texto: texto.required(),
    fecha: fecha.required(),
    autor: autor.required(),
    active: active.required()
});

const updatePostDto = Joi.object({
    texto: texto,
    fecha: fecha.required(),
    active: active.required()
  });

  const getPostDto = Joi.object({
    uuid: uuidPost.required()
  });

  module.exports = {
    createPostDto,
    updatePostDto,
    getPostDto,
  };