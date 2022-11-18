const Joi = require('joi');
const {Utilities} = require('../services/utilities.services');
require('dotenv').config();

const uuidVideo = Joi.string().pattern(Utilities.REGEX_VALD_OBJECT_ID.pattern, Utilities.REGEX_VALD_OBJECT_ID.name);
const VideoId = Joi.number().min(1500000).max(2500000);
const video = Joi.string();
const upload_date = Joi.date();
const id_post = Joi.string();
const active = Joi.boolean();

const createVideoDto = Joi.object({
    videos_id: VideoId.required(),
    content: video.required(),
    Fecha_Publicacion: upload_date.required(),
    post: id_post.required(),
    isActive: active.required()
});

const updateVideoDto = Joi.object({
    content: video,
    Fecha_Publicacion: upload_date.required(),
    isActive: active
  });

  const getVideoDto = Joi.object({
    idVideo: uuidVideo.required()
  });

  module.exports = {
    createVideoDto,
    updateVideoDto,
    getVideoDto,
  };