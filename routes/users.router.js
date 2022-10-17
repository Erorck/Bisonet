const express = require('express');
const UserService = require('../services/users.service');
const service = new UserService();
const validatorHandler = require('../middlewares/validator.handler')
const {createUserDto, updateUserDto, getUserDto} = require('../DTOs/users.dto')

const router = express.Router();

//RUTAS GENERALES /

//GET ALL USERS
router.get('/', async (req, res, next) => {
  try {
    const{size} = req.query;
    const filter = req.body;
    const users = await service.getAll(size || 10, filter);
    res.json({
      'success':true,
      'message':'Users found successfully',
      'Data': users
  });
  } catch (error) {
    next(error);
  }

});


//CREATE USER
router.post('/', validatorHandler(createUserDto, 'body'), async (req, res) => {
  const body = req.body;
  const user = await service.create(body); //Para updates y creates
  res.json({
      'success':true, //Validaciones FrontEnd
      'message':'User created successfully', //Mostrar al usuario
      'Data': user //Desplegar información en algún formato
  });
});

//RUTAS ESPECIFICAS /:userId

//GET USER BY ID
router.get('/:userId', validatorHandler(getUserDto, 'params'), async (req, res, next) => {
  try {
    const {userId} = req.params; //Obtener ids
    const user = await service.getById(userId);
    res.json({
        'success':true,
        'message':'User found successfully',
        'Data': user
    });
  } catch (error) {
    next(error);
  }

});

//PARTIALLY UPDATE USER
router.patch('/:userId', validatorHandler(getUserDto, 'params'), validatorHandler(updateUserDto, 'body'), async (req, res, next) => {
  try {
    const {userId} = req.params; //Obtener ids
    const body = req.body;
    const {old, changed} = await service.update(userId, body);
    res.json({
      'success':true,
      'message':'User updated successfully',
      'Original': old,
      'Updated': changed
     });
  } catch (error) {
    next(error);
  }

});

//DELETE USER
router.delete('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params; //Obtener ids
    deletedUser = await service.delete(userId);
    res.json({
      'success':true,
      'message':'User eliminated successfully',
      'user': deletedUser
  });
  } catch (error) {
    next(error);
  }

});

module.exports = router;


