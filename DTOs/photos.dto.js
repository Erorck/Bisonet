const Joi = require('joi');
require('dotenv').config();

const uuidPhoto = Joi.string();
const foto = Joi.string();
const fecha = Joi.date();
const id_post = Joi.string();
const active = Joi.boolean();

const createPhotoDto = Joi.object({
    foto: foto.required(),
    fecha: fecha.required(),
    id_post: id_post.required(),
    active: active.required()
});

const updatePhotoDto = Joi.object({
    foto: foto,
    fecha: fecha.required(),
    active: active.required()
  });

  const getPhotoDto = Joi.object({
    uuid: uuidPhoto.required()
  });

  module.exports = {
    createPhotoDto,
    updatePhotoDto,
    getPhotoDto,
  };