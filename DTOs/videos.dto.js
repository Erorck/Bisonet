const Joi = require('joi');
require('dotenv').config();

const uuidVideo = Joi.string();
const video = Joi.string();
const fecha = Joi.date();
const id_post = Joi.string();
const active = Joi.boolean();

const createVideoDto = Joi.object({
    video: video.required(),
    fecha: fecha.required(),
    id_post: id_post.required(),
    active: active.required()
});

const updateVideoDto = Joi.object({
    video: video,
    fecha: fecha.required(),
    active: active.required()
  });

  const getVideoDto = Joi.object({
    uuid: uuidVideo.required()
  });

  module.exports = {
    createVideoDto,
    updateVideoDto,
    getVideoDto,
  };