const Joi = require('joi');
require('dotenv').config();
const { Utilities } = require('../services/utilities.services');

const uuidPost = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const autor = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const section = Joi.string().pattern(Utilities.REGEX_VALD_OBJECT_ID.pattern);
const post_type = Joi.string().pattern(Utilities.REGEX_VALD_OBJECT_ID.pattern);
const group = Joi.string().pattern(Utilities.REGEX_VALD_OBJECT_ID.pattern);
const Title = Joi.string();
const Content = Joi.string();
const Likes = Joi.number();
const active = Joi.boolean();

const createPostDto = Joi.object({
  Autor: autor.required(),
  Seccion: section,
  Type: post_type,
  Group: group,
  Title: Title.required(),
  Content: Content.required(),
});

const updatePostDto = Joi.object({
  Title: Title,
  Content: Content,
  isActive: active,
});

const getPostDto = Joi.object({
  postId: uuidPost.required(),
});

module.exports = {
  createPostDto,
  updatePostDto,
  getPostDto,
};
