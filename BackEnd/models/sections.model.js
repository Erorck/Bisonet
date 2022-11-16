const mongoose = require('mongoose');
const { Utilities } = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE SECCIONES

const sectionSchema = new Schema({
  section_id: { type: Number, min: 1500000, max: 2500000, unique: true },
  nombre: { type: String, unique: true },
  isActive: { type: Boolean },
});

const model = mongoose.model('sections', sectionSchema);
module.exports = model;
