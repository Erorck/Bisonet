const express = require('express');
var faker = require('faker');
const router = express.Router();
const SectionService = require('../services/sections.services');
const Service = new SectionService();
const validatorHandler = require('../middlewares/validator.handler');
const {createSectionDto, updateSectionDto, getSectionDto} = require('../DTOs/sections.dto');

router.get('/get/section', async (req, res, next) =>{
    try {
        const{size} = req.query;
        const sections = Service.getAll(size || 10);
        res.json({
          'success':true,
          'message':'Sections found successfully',
          'Data': sections
      });
      } catch (error) {
        next(error);
      }
});

router.get('/get/section/:uuid', validatorHandler(getSectionDto, 'params'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const section = Service.getById(uuid);
        res.json({
            'success':true,
            'message':'Section found successfully',
            'Data': section
        });
      } catch (error) {
        next(error);
      }
});

router.post('/create/section', validatorHandler(createSectionDto, 'body'), (req, res) =>{
    try {
        const body = req.body;
        const section = Service.create(body); //Para updates y creates
        res.json({
          'success':true, //Validaciones FrontEnd
          'message':'Section created successfully', //Mostrar al usuario
          'Data': section //Desplegar información en algún formato
      });
      } catch (error) {
        next(error);
      }
});

router.patch('/update/section/:uuid', validatorHandler(getSectionDto, 'params'), validatorHandler(updateSectionDto, 'body'), (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        const body = req.body;
        const {old, changed} = Service.update(uuid, body);
        res.json({
          'success':true,
          'message':'Section updated successfully',
          'Original': old,
          'Updated': changed
         });
      } catch (error) {
        next(error);
      }
});

router.delete('/delete/section/:uuid', async (req, res, next) =>{
    try {
        const {uuid} = req.params; //Obtener ids
        deletedSection = Service.delete(uuid);
        res.json({
          'success':true,
          'message':'Section eliminated successfully',
          'comment': deletedSection
      });
      } catch (error) {
        next(error);
      }
});

module.exports = router;

