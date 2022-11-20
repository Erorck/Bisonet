const mongoose = require('mongoose');
const { Utilities } = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE SECCIONES

const sectionSchema = new Schema({
  nombre: { type: String, unique: true },
  isActive: { type: Boolean },
});

const model = mongoose.model('sections', sectionSchema);
module.exports = model;
