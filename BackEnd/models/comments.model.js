const mongoose = require('mongoose');
const { Utilities } = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE COMENTARIO

const commentSchema = new Schema({
  author: { type: String, match: Utilities.REGEX_VALD_OBJECT_ID.pattern },
  post: { type: String, match: Utilities.REGEX_VALD_OBJECT_ID.pattern },
  content: { type: String },
  publication_date: { type: Date, default: new Date() },
  modification_date: { type: Date, default: new Date() },
  isActive: { type: Boolean, default: true },
});

const model = mongoose.model('comments', commentSchema);
module.exports = model;
