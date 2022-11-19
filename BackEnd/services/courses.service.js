const faker = require('faker');
const boom = require('@hapi/boom');
const CourseModel = require('../models/courses.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_COURSES_REGISTERED_MSG = 'There are no courses registered';
const COURSE_NOT_FOUND_MSG = 'Course not found: ';

class CoursesService {
  constructor() {
    this.courses = [];
    //this.generate();
  }

  //-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB COURSE
  async create(data) {
    const existsName = await CourseModel.findOne({
      course_name: data.course_name,
    });

    if (existsName) {
      throw boom.unauthorized('There is already a course with that name');
    }

    const newCourse = new CourseModel(data);
    await newCourse.save();
    return data;
  }

  //UPDATE DB COURSE
  async update(courseId, changes) {
    let course = await CourseModel.findOne({
      _id: courseId,
    });

    if (course == undefined || course == null)
      throw new boom.notFound(COURSE_NOT_FOUND_MSG + courseId);

    const { course_name } = changes;

    if (course_name != null && course_name != undefined) {
      const existsName = await CourseModel.findOne({
        course_name: course_name,
      });

      if (existsName && existsName._id != courseId) {
        throw boom.unauthorized('There is already a course with that name');
      }
    }

    let oldCourse = {
      course_name: course.course_name,
      career_especialty: course.career_especialty,
      semester: course.semester,
      groups: course.groups,
      isActive: course.isActive,
    };

    const { career_especialty, semester, groups, isActive } = changes;
    course.course_name = course_name || course.course_name;
    course.career_especialty = career_especialty || course.career_especialty;
    course.semester = semester || course.semester;

    if (groups != undefined) course.groups = [...groups];

    course.isActive = isActive === undefined ? photos.isActive : isActive;
    course.save();

    return {
      old: oldCourse,
      changed: course,
    };
  }

  //DELETE DB COURSE
  async delete(courseId) {
    let course = await CourseModel.findOne({
      _id: courseId,
    });

    const { deletedCount } = await CourseModel.deleteOne({
      _id: courseId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(COURSE_NOT_FOUND_MSG + courseId);

    return course;
  }

  //GET ALL DB COURSES
  async getAll(limit, filter) {
    let courses = await CourseModel.find(filter);

    if (!courses) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (courses.length <= 0)
      throw boom.notFound(NO_COURSES_REGISTERED_MSG);

    courses = limit
      ? courses.filter((item, index) => item && index < limit)
      : courses;

    return courses;
  }

  //GET COURSE DB BY ID
  async getById(courseId) {
    let course = await CourseModel.findOne({
      _id: courseId,
    });

    if (course == undefined || course == null)
      throw new boom.notFound(COURSE_NOT_FOUND_MSG + courseId);

    return course;
  }
  //#endregion
}

module.exports = CoursesService;
