const Joi = require('joi');
require('dotenv').config();

const uuidVideo = Joi.string();
const video = Joi.string();
const upload_date = Joi.date();
const id_post = Joi.string();
const active = Joi.boolean();

const createVideoDto = Joi.object({
    video: video.required(),
    upload_date: upload_date.required(),
    id_post: id_post.required(),
    active: active.required()
});

const updateVideoDto = Joi.object({
    video: video,
    upload_date: upload_date.required(),
    active: active.required()
  });

  const getVideoDto = Joi.object({
    idVideo: uuidVideo.required()
  });

  module.exports = {
    createVideoDto,
    updateVideoDto,
    getVideoDto,
  };
