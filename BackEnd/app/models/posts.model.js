const mongoose = require('mongoose');
const { Utilities } = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE POSTS

const postsSchema = new Schema({
  Autor: { type: String, match: Utilities.REGEX_VALD_OBJECT_ID.pattern },
  Seccion: { type: String, match: Utilities.REGEX_VALD_OBJECT_ID.pattern },
  Type: { type: String, match: Utilities.REGEX_VALD_OBJECT_ID.pattern },
  Group: { type: String, match: Utilities.REGEX_VALD_OBJECT_ID.pattern },
  Title: { type: String },
  Content: { type: String },
  Fecha_Publicacion: { type: Date, default: new Date() },
  Fecha_Modificacion: { type: Date, default: new Date() },
  Comments: { type: Array },
  Likes: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
});

const model = mongoose.model('posts', postsSchema);
module.exports = model;
