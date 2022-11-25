const express = require('express');
const reporterService = require('../services/reporter.service');
const service = new reporterService();
const router = express.Router();

const checkRolHandler = require('../middlewares/checkRol.handler');
const authHandler = require('../middlewares/auth.handler');

//Get get Courses With More Groups
router.get(
  '/Course-More-Groups',
  authHandler,
  checkRolHandler(['Administrador']),
  async (req, res, next) => {
    try {
      //const { size } = req.query;
      //const filter = req.body;
      const report = await service.getCoursesWithMoreGroups(10);
      res.json({
        success: true,
        message: 'Reports found successfully',
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Get Semester With More Courses
router.get(
  '/Semester-More-Courses',
  authHandler,
  checkRolHandler(['Administrador']),
  async (req, res, next) => {
    try {
      //const { size } = req.query;
      //const filter = req.body;
      const report = await service.getSemesterWithMoreCourses(10);
      res.json({
        success: true,
        message: 'Reports found successfully',
        Semester: report,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Get Group With More Students
router.get(
  '/Group-More-Students',
  authHandler,
  checkRolHandler(['Administrador']),
  async (req, res, next) => {
    try {
      //const { size } = req.query;
      //const filter = req.body;
      const report = await service.getGroupWithMoreStudents(10);
      res.json({
        success: true,
        message: 'Reports found successfully',
        data: report,
        NumberOfStundets: report.group_members.length,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Get Teachers With More Courses
router.get(
  '/Teachers-More-Courses',
  authHandler,
  checkRolHandler(['Administrador']),
  async (req, res, next) => {
    try {
      //const { size } = req.query;
      //const filter = req.body;
      const report = await service.getTeachersWithMoreCourses(10);
      res.json({
        success: true,
        message: 'Reports found successfully',
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
