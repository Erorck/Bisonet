const Joi = require('joi');
const { Utilities } = require('../services/utilities.services');
require('dotenv').config();

const uuidSection = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const sectionName = Joi.string();
const active = Joi.boolean();

const createSectionDto = Joi.object({
  nombre: sectionName.required(),
});

const updateSectionDto = Joi.object({
  nombre: sectionName,
  isActive: active,
});

const getSectionDto = Joi.object({
  sectionId: uuidSection.required(),
});

module.exports = {
  createSectionDto,
  updateSectionDto,
  getSectionDto,
};
