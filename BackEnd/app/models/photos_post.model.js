const mongoose = require('mongoose');
const { Utilities } = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE FOTOS DE POST

const photosSchema = new Schema({
  file_name: { type: String },
  original_name: { type: String },
  post: { type: String, match: Utilities.REGEX_VALD_OBJECT_ID.pattern },
  path: { type: String },
  Fecha_Publicacion: { type: Date, default: new Date() },
  isActive: { type: Boolean, default: true },
});

const model = mongoose.model('photos', photosSchema);
module.exports = model;
