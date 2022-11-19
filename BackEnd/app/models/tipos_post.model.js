const mongoose = require('mongoose');
const { Utilities } = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE TIPOS DE POST

const Tipos_Post_Schema = new Schema({
  nombre: { type: String, unique: true },
  color: { type: String, match: Utilities.REGEX_VALD_HEX_COLOR.pattern },
});

const model = mongoose.model('type_posts', Tipos_Post_Schema);
module.exports = model;
