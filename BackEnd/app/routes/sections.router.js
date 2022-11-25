const express = require('express');
const SectionService = require('../services/sections.services');
const Service = new SectionService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createSectionDto,
  updateSectionDto,
  getSectionDto,
} = require('../DTOs/sections.dto');

const checkRolHandler = require('../middlewares/checkRol.handler');
const authHandler = require('../middlewares/auth.handler');
const router = express.Router();

router.get(
  '/get/section',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  async (req, res, next) => {
    try {
      const { size } = req.query;
      const filter = req.body;
      const sections = await Service.getAll(size || 10, filter);
      res.json({
        success: true,
        message: 'Sections found successfully',
        data: sections,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/get/section/:sectionId',
  authHandler,
  checkRolHandler(['Alumno', 'Maestro', 'Administrador']),
  validatorHandler(getSectionDto, 'params'),
  async (req, res, next) => {
    try {
      const { sectionId } = req.params; //Obtener ids
      const section = await Service.getById(sectionId);
      res.json({
        success: true,
        message: 'Section found successfully',
        data: section,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create/section',
  authHandler,
  checkRolHandler(['Administrador']),
  validatorHandler(createSectionDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const section = await Service.create(body); //Para updates y creates
      res.json({
        success: true, //Validaciones FrontEnd
        message: 'Section created successfully', //Mostrar al usuario
        data: section, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/update/section/:sectionId',
  authHandler,
  checkRolHandler(['Administrador']),
  validatorHandler(getSectionDto, 'params'),
  validatorHandler(updateSectionDto, 'body'),
  async (req, res, next) => {
    try {
      const { sectionId } = req.params; //Obtener ids
      const body = req.body;
      const { old, changed } = await Service.update(sectionId, body);
      res.json({
        success: true,
        message: 'Section updated successfully',
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/delete/section/:sectionId',
  authHandler,
  checkRolHandler(['Administrador']),
  validatorHandler(getSectionDto, 'params'),
  async (req, res, next) => {
    try {
      const { sectionId } = req.params; //Obtener ids
      deletedSection = await Service.delete(sectionId);
      res.json({
        success: true,
        message: 'Section eliminated successfully',
        comment: deletedSection,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
