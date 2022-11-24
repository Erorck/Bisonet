const express = require('express');
const reporterService = require('../services/reporter.service');
const service = new reporterService();
const router = express.Router();

//Get get Courses With More Groups
router.get(
    '/Course-More-Groups',
    async (req, res, next) => {
      try {
        //const { size } = req.query;
        //const filter = req.body;
        const report = await service.getCoursesWithMoreGroups(10);
        res.json({
          success: true,
          message: 'Reports found successfully',
          Data: report,
        });
      } catch (error) {
        next(error);
      }
    }
  );

//Get Semester With More Courses
router.get(
    '/Semester-More-Courses',
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

//Get Group With More Stundents
router.get(
    '/Group-More-Stundents',
    async (req, res, next) => {
      try {
        //const { size } = req.query;
        //const filter = req.body;
        const report = await service.getGroupWithMoreStundents(10);
        res.json({
          success: true,
          message: 'Reports found successfully',
          Data: report,
          NumberOfStundets: report.group_members.length
        });
      } catch (error) {
        next(error);
      }
    }
  );

//Get Teachers With More Courses
router.get(
  '/Teachers-More-Courses',
  async (req, res, next) => {
    try {
      //const { size } = req.query;
      //const filter = req.body;
      const report = await service.getTeachersWithMoreCourses(10);
      res.json({
        success: true,
        message: 'Reports found successfully',
        Data: report,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;