const boom = require('@hapi/boom');
const GroupModel = require('../models/groups.model');
const CourseModel = require('../models/courses.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_COURSES_REGISTERED_MSG = 'There are no courses registered';
const NO_GROUPS_REGISTERED_MSG = 'There are no groups registered';

class reporterService
{
    constructor()
    {

    }

    async getCoursesWithMoreGroups() {
      let courses = await CourseModel.find();

      if (!courses) throw boom.notFound(NOT_FOUND_COLL_MSG);
      else if (courses.length <= 0)
        throw boom.notFound(NO_COURSES_REGISTERED_MSG);

      courses.sort(function(a,b){return b.groups.length - a.groups.length});
      return courses[0];
    }

    async getSemesterWithMoreCourses()
    {
      let courses = await CourseModel.find();

      if (!courses) throw boom.notFound(NOT_FOUND_COLL_MSG);
      else if (courses.length <= 0)
        throw boom.notFound(NO_COURSES_REGISTERED_MSG);

      var semesters = [[1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0], [10,0], [11,0]];
      for (let i = 0; i < courses.length; i++) {
        for (let j = 0; j < semesters.length; j++) {
          if(semesters[j][0] == courses[i].semester)
          {
            semesters[j][1]++;
          }
        }
      }
      var MaxValue = 0;
      var SemesterMax = 0;
      for (let i = 0; i < semesters.length; i++) {
        if(semesters[i][1] > MaxValue)
        {
          MaxValue = semesters[i][1];
          SemesterMax = semesters[i][0];
        }
      }
     
      return SemesterMax;
    }

    async getGroupWithMoreStundents() {
      let Groups = await GroupModel.find();

      if (!Groups) throw boom.notFound(NOT_FOUND_COLL_MSG);
      else if (Groups.length <= 0) throw boom.notFound(NO_GROUPS_REGISTERED_MSG);

      Groups.sort(function(a,b){return b.group_members.length - a.group_members.length});
      return Groups[0];
    }

    async getTeachersWithMoreCourses() {
      let courses = await CourseModel.find();

      if (!courses) throw boom.notFound(NOT_FOUND_COLL_MSG);
      else if (courses.length <= 0)
        throw boom.notFound(NO_COURSES_REGISTERED_MSG);

      var Teachers = [];
      for (let i = 0; i < courses.length; i++) {
        for (let j = 0; j < courses[i].groups.length; j++) {
          Teachers.push(courses[i].groups[j].group_teacher);
        }
      }

      var TeachersCount = [];
      for (let i = 0; i < Teachers.length; i++) {
        var Repetido = false;
        for (let j = 0; j < TeachersCount.length; j++) {
          if(TeachersCount[j] == Teachers[i])
          {
            Repetido = true;
          }
        }
        if(!Repetido)
        {
          TeachersCount.push(Teachers[i]);
        }
      }

      var TeachersNum = [];
      for (let i = 0; i < TeachersCount.length; i++) {
        var Num = 0;
        for (let j = 0; j < Teachers.length; j++) {
          if(TeachersCount[i] == Teachers[j])
          {
            Num++;
          }
        }
        TeachersNum.push([TeachersCount[i], Num])
      }

      var MaxValue = 0
      var TeacherMax = 0;
      for (let i = 0; i < TeachersNum.length; i++) {
        if(TeachersNum[i][1] > MaxValue)
        {
          MaxValue = TeachersNum[i][1];
          TeacherMax = TeachersNum[i][0];
        }
      }

      return TeacherMax;
    }

}

module.exports = reporterService;