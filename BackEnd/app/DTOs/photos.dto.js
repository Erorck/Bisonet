const Joi = require('joi');
const { Utilities } = require('../services/utilities.services');
require('dotenv').config();

const uuidPhoto = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const id_post = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const file_name = Joi.string();
const path = Joi.string();
const upload_date = Joi.date();
const active = Joi.boolean();

const createPhotoDto = Joi.object({
  //file_name: file_name.required(),
  //original_name: file_name.required(),
  //path: path.required(),
  //Fecha_Publicacion: upload_date.required(),
  post: id_post.required(),
});

const updatePhotoDto = Joi.object({
  isActive: active,
});

const getPhotoDto = Joi.object({
  photoId: uuidPhoto.required(),
});

module.exports = {
  createPhotoDto,
  updatePhotoDto,
  getPhotoDto,
};
