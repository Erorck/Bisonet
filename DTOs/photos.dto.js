const Joi = require('joi');
const {Utilities} = require('../services/utilities.services');
require('dotenv').config();

const uuidPhoto = Joi.string().pattern(Utilities.REGEX_VALD_OBJECT_ID.pattern, Utilities.REGEX_VALD_OBJECT_ID.name);
const PhotoId = Joi.number().min(1500000).max(2500000);
const id_post = Joi.string().pattern(Utilities.REGEX_VALD_OBJECT_ID.pattern, Utilities.REGEX_VALD_OBJECT_ID.name);
const foto = Joi.string();
const upload_date = Joi.date();
const active = Joi.boolean();

const createPhotoDto = Joi.object({
    photos_id: PhotoId.required(),
    content: foto.required(),
    Fecha_Publicacion: upload_date.required(),
    post: id_post.required(),
    active: active.required()
});

const updatePhotoDto = Joi.object({
    content: foto,
    Fecha_Publicacion: upload_date.required(),
    active: active
  });

  const getPhotoDto = Joi.object({
    photoId: uuidPhoto.required()
  });

  module.exports = {
    createPhotoDto,
    updatePhotoDto,
    getPhotoDto,
  };
