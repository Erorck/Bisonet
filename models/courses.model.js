const mongoose = require('mongoose');
const {Utilities} = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE MATERIA

const courseSchema = new Schema({
  course_name: {type: String},
  career_especialty: {type: String},
  semester: {type: Number, default: 1, min: 1, max:10},
  groups: { type: Array},
  isActive: {type: Boolean, default: true}
});

const model = mongoose.model('courses', courseSchema);
module.exports = model;
