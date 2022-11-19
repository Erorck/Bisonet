const mongoose = require('mongoose');
const { Utilities } = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE GRUPO

const groupSchema = new Schema({
  group_teacher: {
    type: String,
    match: Utilities.REGEX_VALD_OBJECT_ID.pattern,
  },
  group_members: { type: Array },
  course: { type: String, match: Utilities.REGEX_VALD_OBJECT_ID.pattern },
  year: {
    type: Number,
    default: new Date().getFullYear(),
    min: 1988,
    max: 2999,
  },
  semester: { type: Number, default: 1, min: 1, max: 2 },
  posts: { type: Array },
  isActive: { type: Boolean, default: true },
});

const model = mongoose.model('groups', groupSchema);
module.exports = model;
