const express = require('express');
var faker = require('faker');
const router = express.Router();
const postService = require('../services/post.service');
const service = new postService();
const validatorHandler = require('../middlewares/validator.handler');
const {createPostDto, updatePostDto, getPostDto} = require('../DTOs/post.dto');

router.get('/get/post', async (req, res, next) =>{
    try {
        const{size} = req.query;
        const post = await service.getAll(size || 10);
        res.json({
          'success':true,
          'message':'post found successfully',
          'Data': post
      });
      } catch (error) {
        next(error);
      }
});

router.get('/get/post/:postId', validatorHandler(getPostDto, 'params'), async (req, res, next) =>{
    try {
        const {postId} = req.params; //Obtener ids
        const post = await service.getById(postId);
        res.json({
            'success':true,
            'message':'post found successfully',
            'Data': post
        });
      } catch (error) {
        next(error);
      }
});

router.post('/create/post/', validatorHandler(createPostDto, 'body'), async (req, res, next) =>{
    try {
        const body = req.body;
        const post = await service.create(body); //Para updates y creates
        res.json({
          'success':true, //Validaciones FrontEnd
          'message':'post created successfully', //Mostrar al usuario
          'Data': post //Desplegar información en algún formato
      });
      } catch (error) {
        next(error);
      }
});

router.patch('/update/post/:postId',  validatorHandler(getPostDto, 'params'), validatorHandler(updatePostDto, 'body'), async (req, res, next) =>{
    try {
        const {postId} = req.params; //Obtener ids
        const body = req.body;
        const {old, changed} = await service.update(postId, body);
        res.json({
          'success':true,
          'message':'post updated successfully',
          'Original': old,
          'Updated': changed
         });
      } catch (error) {
        next(error);
      }
});

router.delete('/delete/post/:postId', async (req, res, next) =>{
    try {
        const {postId} = req.params; //Obtener ids
        post = await service.delete(postId);
        res.json({
          'success':true,
          'message':'post eliminated successfully',
          'comment': post
      });
      } catch (error) {
        next(error);
      }
});

module.exports = router;
