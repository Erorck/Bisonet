const express = require('express');
const GroupsService = require('../services/groups.service');
const service = new GroupsService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createGroupDto,
  updateGroupDto,
  getGroupDto,
} = require('../DTOs/groups.dto');

const checkRolHandler = require('../middlewares/checkRol.handler');
const authHandler = require('../middlewares/auth.handler');
const router = express.Router();

//RUTAS GENERALES /

//GET ALL GROUPS
router.get(
  '/',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { size } = req.query;
      const filter = req.body;
      const groups = await service.getAll(size || 10, filter);
      res.json({
        success: true,
        message: 'Groups found successfully',
        Data: groups,
      });
    } catch (error) {
      next(error);
    }
  }
);

//CREATE GROUP
router.post(
  '/',
  validatorHandler(createGroupDto, 'body'),
  authHandler,
  checkRolHandler(['Administrador']),
  async (req, res, next) => {
    try {
      const body = req.body;
      const group = await service.create(body); //Para updates y creates
      res.json({
        success: true, //Validaciones FrontEnd
        message: 'Group created successfully', //Mostrar al usuario
        Data: group, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

//RUTAS ESPECIFICAS /:id

//GET GROUP BY ID
router.get(
  '/:groupId',
  validatorHandler(getGroupDto, 'params'),
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { groupId } = req.params; //Obtener ids
      const group = await service.getById(groupId);
      res.json({
        success: true,
        message: 'Group found successfully',
        Data: group,
      });
    } catch (error) {
      next(error);
    }
  }
);

//PARTIALLY UPDATE GROUP
router.patch(
  '/:groupId',
  authHandler,
  checkRolHandler(['Administrador']),
  validatorHandler(getGroupDto, 'params'),
  validatorHandler(updateGroupDto, 'body'),
  async (req, res, next) => {
    try {
      const { groupId } = req.params; //Obtener ids
      const body = req.body;
      const { old, changed } = await service.update(groupId, body);
      res.json({
        success: true,
        message: 'Group updated successfully',
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

//DELETE GROUP
router.delete(
  '/:groupId',
  authHandler,
  checkRolHandler(['Administrador']),
  async (req, res, next) => {
    try {
      const { groupId } = req.params; //Obtener ids
      deletedGroup = await service.delete(groupId);
      res.json({
        success: true,
        message: 'Group eliminated successfully',
        group: deletedGroup,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
