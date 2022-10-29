const Joi = require('joi');
const {Utilities} = require('../services/utilities.services');
require('dotenv').config();

const uuidSection = Joi.string().pattern(Utilities.REGEX_VALD_OBJECT_ID.pattern, Utilities.REGEX_VALD_OBJECT_ID.name);
const SectionId = Joi.number().min(1500000).max(2500000);
const sectionName = Joi.string();
const active = Joi.boolean();

const createSectionDto = Joi.object({
    section_id: SectionId.required(),
    nombre: sectionName.required(),
    isActive: active.required()
});

const updateSectionDto = Joi.object({
    nombre: sectionName,
    isActive: active
  });

  const getSectionDto = Joi.object({
    sectionId: uuidSection.required()
  });

  module.exports = {
    createSectionDto,
    updateSectionDto,
    getSectionDto,
  };
