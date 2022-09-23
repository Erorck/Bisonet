const express = require('express');
const GroupsService = require('../services/groups.service');
const service = new GroupsService();
const validatorHandler = require('../middlewares/validator.handler')
const {createGroupDto, updateGroupDto, getGroupDto} = require('../DTOs/groups.dto')

const router = express.Router();

//RUTAS GENERALES /

//GET ALL GROUPS
router.get('/', (req, res, next) => {
  try {
    const{size} = req.query;
    const groups = service.getAll(size || 10);
    res.json({
      'success':true,
      'message':'Groups found successfully',
      'Data': groups
  });
  } catch (error) {
    next(error);
  }

});


//CREATE GROUP
router.post('/', validatorHandler(createGroupDto, 'body'), (req, res) => {
  try {
    const body = req.body;
    const group = service.create(body); //Para updates y creates
    res.json({
      'success':true, //Validaciones FrontEnd
      'message':'Group created successfully', //Mostrar al usuario
      'Data': group //Desplegar información en algún formato
  });
  } catch (error) {
    next(error);
  }

});

//RUTAS ESPECIFICAS /:id

//GET GROUP BY ID
router.get('/:groupId', validatorHandler(getGroupDto, 'params'), (req, res, next) => {
  try {
    const {groupId} = req.params; //Obtener ids
    const group = service.getById(groupId);
    res.json({
        'success':true,
        'message':'Group found successfully',
        'Data': group
    });
  } catch (error) {
    next(error);
  }

});

//PARTIALLY UPDATE GROUP
router.patch('/:groupId', validatorHandler(getGroupDto, 'params'), validatorHandler(updateGroupDto, 'body'), (req, res, next) => {
  try {
    const {groupId} = req.params; //Obtener ids
    const body = req.body;
    const {old, changed} = service.update(groupId, body);
    res.json({
      'success':true,
      'message':'Group updated successfully',
      'Original': old,
      'Updated': changed
     });
  } catch (error) {
    next(error);
  }

});

//DELETE GROUP
router.delete('/:groupId', (req, res, next) => {
  try {
    const {groupId} = req.params; //Obtener ids
    deletedGroup = service.delete(groupId);
    res.json({
      'success':true,
      'message':'Group eliminated successfully',
      'group': deletedGroup
  });
  } catch (error) {
    next(error);
  }

});

module.exports = router;


