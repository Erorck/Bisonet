const Joi = require('joi');
const {Utilities} = require('../services/utilities.services');
require('dotenv').config();


//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const commentId = Joi.string();
const author = Joi.string();
const post = Joi.string();
const content = Joi.string();
const publication_date = Joi.date();
const modification_date = Joi.date();
const isActive = Joi.boolean();

const createCommentDto = Joi.object({
  author: author.required(),
  post: post.required(),
  content: content.required(),
  publication_date: publication_date.required(),
  modification_date: modification_date,
  isActive: isActive.required()
});

const updateCommentDto = Joi.object({
  content: content,
  modification_date: modification_date.required(),
  isActive: isActive
});

const getCommentDto = Joi.object({
  commentId: commentId.required()
});

module.exports = {
  createCommentDto,
  updateCommentDto,
  getCommentDto,
};
