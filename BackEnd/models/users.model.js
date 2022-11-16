const mongoose = require('mongoose');
const { Utilities } = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE USUARIO

const userSchema = new Schema({
  userId: { type: Number, min: 1500000, max: 2500000, unique: true },
  password: { type: String, match: Utilities.REGEX_VALD_PASSWORD.pattern },
  first_name: { type: String, match: Utilities.REGEX_VALD_NAME.pattern },
  first_last_name: { type: String, match: Utilities.REGEX_VALD_NAME.pattern },
  second_last_name: { type: String, match: Utilities.REGEX_VALD_NAME.pattern },
  institutional_email: {
    type: String,
    match: Utilities.REGEX_VALD_EMAIL.pattern,
    unique: true,
  },
  career_especialty: {
    type: ['Programación', '3D', '2D', 'Video', 'Tronco común'],
    default: 'Tronco común',
  },
  current_semester: { type: Number, default: 1, min: 1, max: 10 },
  profileImage: { type: String },
  user_type: {
    type: ['Alumno', 'Maestro', 'Administrador'],
    default: 'Alumno',
  },
  isActive: { type: Boolean, default: true },
});

const model = mongoose.model('users', userSchema);
module.exports = model;
