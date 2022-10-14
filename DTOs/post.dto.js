const Joi = require('joi');
require('dotenv').config();
const {Utilities} = require('../services/utilities.services');


const uuidPost = Joi.string();
const autor = Joi.string();
const section = Joi.string();
const post_type = Joi.string().pattern(Utilities.REGEX_VALD_NAME.pattern, Utilities.REGEX_VALD_NAME.name);
const group = Joi.string();
const texto = Joi.string();
const fecha = Joi.date();
const active = Joi.boolean();

const createPostDto = Joi.object({
    autor: autor.required(),
    section: section.required(),
    post_type: post_type.required(),
    group: group,
    title: texto.required(),
    content: texto.required(),
    publication_date : fecha.required(),
    modification_date : fecha.required(),
    active: active.required()
});

const updatePostDto = Joi.object({
    section:section,
    title: texto,
    content: texto,
    publication_date : fecha,
    modification_date : fecha.required(),
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
