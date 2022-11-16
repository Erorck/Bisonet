const mongoose = require('mongoose');
const { Utilities } = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE FOTOS DE POST

const photosSchema = new Schema({
  photos_id: { type: Number, min: 1500000, max: 2500000, unique: true },
  post: { type: String, match: Utilities.REGEX_VALD_OBJECT_ID.pattern },
  content: { type: String },
  Fecha_Publicacion: { type: Date, default: new Date() },
  isActive: { type: Boolean, default: true },
});

const model = mongoose.model('photos', photosSchema);
module.exports = model;
