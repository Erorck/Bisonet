const Joi = require('joi');
require('dotenv').config();

const uuidPhoto = Joi.string();
const foto = Joi.string();
const upload_date = Joi.date();
const id_post = Joi.string();
const active = Joi.boolean();

const createPhotoDto = Joi.object({
    foto: foto.required(),
    upload_date: upload_date.required(),
    id_post: id_post.required(),
    active: active.required()
});

const updatePhotoDto = Joi.object({
    foto: foto,
    upload_date: upload_date.required(),
    active: active.required()
  });

  const getPhotoDto = Joi.object({
    photoId: uuidPhoto.required()
  });

  module.exports = {
    createPhotoDto,
    updatePhotoDto,
    getPhotoDto,
  };
