const express = require('express');
const CommentsService = require('../services/comments.service');
const service = new CommentsService();
const validatorHandler = require('../middlewares/validator.handler');
const {createCommentDto, updateCommentDto, getCommentDto} = require('../DTOs/comments.dto');

const router = express.Router();

//RUTAS GENERALES /

//GET ALL COMMENT
router.get('/', (req, res, next) => {
  try {
    const{size} = req.query;
    const comments = service.getAll(size || 10);
    res.json({
      'success':true,
      'message':'Comments found successfully',
      'Data': comments
  });
  } catch (error) {
    next(error);
  }

});


//CREATE COMMENT
router.post('/', validatorHandler(createCommentDto, 'body'), (req, res) => {
  try {
    const body = req.body;
    const comment = service.create(body); //Para updates y creates
    res.json({
      'success':true, //Validaciones FrontEnd
      'message':'Comment created successfully', //Mostrar al usuario
      'Data': comment //Desplegar información en algún formato
  });
  } catch (error) {
    next(error);
  }

});

//RUTAS ESPECIFICAS /:id

//GET COMMENT BY ID
router.get('/:commentId', validatorHandler(getCommentDto, 'params'), (req, res, next) => {
  try {
    const {commentId} = req.params; //Obtener ids
    const comment = service.getById(commentId);
    res.json({
        'success':true,
        'message':'Comment found successfully',
        'Data': comment
    });
  } catch (error) {
    next(error);
  }

});

//PARTIALLY UPDATE COMMENT
router.patch('/:commentId', validatorHandler(getCommentDto, 'params'), validatorHandler(updateCommentDto, 'body'), (req, res, next) => {
  try {
    const {commentId} = req.params; //Obtener ids
    const body = req.body;
    const {old, changed} = service.update(commentId, body);
    res.json({
      'success':true,
      'message':'Comment updated successfully',
      'Original': old,
      'Updated': changed
     });
  } catch (error) {
    next(error);
  }

});

//DELETE COMMENT
router.delete('/:commentId', (req, res, next) => {
  try {
    const {commentId} = req.params; //Obtener ids
    deletedComment = service.delete(commentId);
    res.json({
      'success':true,
      'message':'Comment eliminated successfully',
      'comment': deletedComment
  });
  } catch (error) {
    next(error);
  }

});

module.exports = router;


