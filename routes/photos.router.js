const express = require('express');
var faker = require('faker');
const router = express.Router();
const PhotosService = require('../services/photos.service');
const service = new PhotosService();
const validatorHandler = require('../middlewares/validator.handler');
const {createPhotoDto, updatePhotoDto, getPhotoDto} = require('../DTOs/photos.dto');

router.get('/get/photos', async (req, res, next) =>{
    try {
        const{size} = req.query;
        const photos = service.getAll(size || 10);
        res.json({
          'success':true,
          'message':'photos found successfully',
          'Data': photos
      });
      } catch (error) {
        next(error);
      }
});

router.get('/get/photos/:uuid', validatorHandler(getPhotoDto, 'params'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const photos = service.getById(uuid);
        res.json({
            'success':true,
            'message':'photos found successfully',
            'Data': photos
        });
      } catch (error) {
        next(error);
      }
});

router.post('/create/photos/', validatorHandler(createPhotoDto, 'body'), (req, res) =>{
    try {
        const body = req.body;
        const photos = service.create(body); //Para updates y creates
        res.json({
          'success':true, //Validaciones FrontEnd
          'message':'photos created successfully', //Mostrar al usuario
          'Data': photos //Desplegar información en algún formato
      });
      } catch (error) {
        next(error);
      }
});

router.patch('/update/photos/:uuid',  validatorHandler(getPhotoDto, 'params'), validatorHandler(updatePhotoDto, 'body'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const body = req.body;
        const {old, changed} = service.update(uuid, body);
        res.json({
          'success':true,
          'message':'photos updated successfully',
          'Original': old,
          'Updated': changed
         });
      } catch (error) {
        next(error);
      }
});

router.delete('/delete/photos/:uuid', async (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        photos = service.delete(uuid);
        res.json({
          'success':true,
          'message':'photos eliminated successfully',
          'comment': photos
      });
      } catch (error) {
        next(error);
      }
});

module.exports = router;