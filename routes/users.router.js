const express = require('express');
const UserService = require('../services/users.service');
const service = new UserService();
const router = express.Router();

//RUTAS GENERALES /

//GET ALL USERS
router.get('/', (req, res, next) => {
  try {
    const{size} = req.query;
    const users = service.getAll(size || 10);
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
router.post('/', (req, res) => {
  const body = req.body;
  const user = service.create(body); //Para updates y creates
  res.json({
      'success':true, //Validaciones FrontEnd
      'message':'User created successfully', //Mostrar al usuario
      'Data': user //Desplegar información en algún formato
  });
});

//RUTAS ESPECIFICAS /:id

//GET USER BY ID
router.get('/:id', (req, res, next) => {
  try {
    const {id} = req.params; //Obtener ids
    const user = service.getById(id);
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
router.patch('/:id', (req, res) => {
  const body = req.body;
  const {id} = req.params; //Obtener ids
  const user = service.update(id, body);
  res.json({
      'success':true,
      'message':'User updated successfully',
      'Data': user
  });
});

//DELETE USER
router.delete('/:id', (req, res, next) => {
  try {
    const {id} = req.params; //Obtener ids
    service.delete(id);
    res.json({
      'success':true,
      'message':'User ' + id +' eliminated successfully'
  });
  } catch (error) {
    next(error);
  }

});

module.exports = router;


