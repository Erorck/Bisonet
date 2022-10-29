const mongoose = require('mongoose');
const {Utilities} = require('../services/utilities.services');

const Schema = mongoose.Schema;

//MODELO DE TIPOS DE POST

const Tipos_Post_Schema = new Schema({
    type_post_id: {type: Number, min: 1500000, max:2500000},
    nombre: {type: String},
    color: {type: String}
});

const model = mongoose.model('type_posts', Tipos_Post_Schema);
module.exports = model;