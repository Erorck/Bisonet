const mongoose = require('mongoose');
const { Utilities } = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE REACCIÓN

const reactionSchema = new Schema({
  user: { type: String, match: Utilities.REGEX_VALD_OBJECT_ID.pattern },
  post: { type: String, match: Utilities.REGEX_VALD_OBJECT_ID.pattern },
  publication_date: { type: Date, default: new Date() },
  modification_date: { type: Date, default: new Date() },
  liked: { type: Boolean, default: true },
});

const model = mongoose.model('reactions', reactionSchema);
module.exports = model;
