const Joi = require('joi');
require('dotenv').config();

const uuidSection = Joi.string();
const sectionName = Joi.string();
const order = Joi.number().min(1).max(10);
const active = Joi.boolean();

const createSectionDto = Joi.object({
    sectionName: sectionName.required(),
    order: order.required(),
    active: active.required()
});

const updateSectionDto = Joi.object({
    sectionName: sectionName,
    order: order,
    active: active.required()
  });

  const getSectionDto = Joi.object({
    sectionId: uuidSection.required()
  });

  module.exports = {
    createSectionDto,
    updateSectionDto,
    getSectionDto,
  };
