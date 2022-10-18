const faker = require('faker');
const boom = require('@hapi/boom');
const CourseModel = require('../models/courses.model');


const NOT_FOUND_COLL_MSG = 'Collection doesn\'t exists';
const NO_COURSES_REGISTERED_MSG = 'There are no courses registered';
const COURSE_NOT_FOUND_MSG = 'Course not found: ';


class CoursesService{

  constructor(){
    this.courses = [];
    //this.generate();
  }



//-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB COURSE
  async create(data){
    const newCourse = new CourseModel(data);
    await newCourse.save();
    return data;
  }

  //UPDATE DB COURSE
  async update(courseId, changes){
    let course = await CourseModel.findOne({
      _id: courseId
    });

    if(course == undefined || course == null)
      throw new boom.notFound(COURSE_NOT_FOUND_MSG + courseId);

    let oldCourse = {
				course_name: course.course_name,
        career_especialty: course.career_especialty,
        semester: course.semester,
        groups: course.groups,
				isActive: course.isActive
    };

    const {course_name, career_especialty, semester, groups, isActive} = changes;
    course.course_name = course_name || course.course_name;
    course.career_especialty = career_especialty || course.career_especialty;
    course.semester = semester || course.semester;

    if(groups != undefined)
      course.groups = [...groups];

    course.isActive = isActive || course.isActive;
    course.save();

    return {
      old: oldCourse,
      changed: course
    }
  }

   //DELETE DB COURSE
  async delete(courseId){

    let course = await CourseModel.findOne({
      _id: courseId
    });

    const {deletedCount} = await CourseModel.deleteOne({
      _id: courseId
    })

    if(deletedCount <= 0)
      throw new boom.notFound(COURSE_NOT_FOUND_MSG + courseId);

    return course;

  }

  //GET ALL DB COURSES
  async getAll(limit, filter){
    let courses = await CourseModel.find(filter);

    if(!courses)
      throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if(courses.length <= 0)
      throw boom.notFound(NO_COURSES_REGISTERED_MSG);

    courses = limit ? courses.filter((item, index) => item && index < limit) : courses;

    return courses;
  }

  //GET COURSE DB BY ID
  async getById(courseId){
    let course = await CourseModel.findOne({
      _id: courseId
    });

    if(course == undefined || course == null)
      throw new boom.notFound(COURSE_NOT_FOUND_MSG + courseId);

    return course;
  }
 //#endregion


//-------------FAKER METHODS----------------//
  //#region FAKER METHODS
  generate_Faker(){
    const limit = 10;
    for (let index = 0; index <limit; index++) {
     this.courses.push({
      //   courseId: faker.datatype.number({
      //     'min': 1,
      //     'max': 2500
      // }),
        courseId: faker.datatype.uuid(),
        course_name: faker.name.jobArea(),
        career_especialty: faker.name.jobArea(),
        semester: faker.datatype.number({
          'min': 1,
          'max': 10
      }),
        groups: faker.datatype.json(),
        isActive: faker.datatype.boolean()
     });

    }
  }

  //CREATE FAKE COURSE
  create_Faker(data){
    const newCourses = {
      courseId: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.courses.push(newCourses);
    return newCourses;
  }

  //UPDATE FAKE COURSE
  update_Faker(id, changes){
    //const nId = parseInt(id);
    const index = this.courses.findIndex((item) => item.courseId === id);
    if(index === -1)
      throw new boom.notFound('Course not found: ' + id);

    var currentCourse = this.courses[index];
    this.courses[index] = {
      ...currentCourse,
      ...changes,
    };
    return {
      old: currentCourse,
      changed: this.courses[index]
    }
  }

   //DELETE FAKE COURSE
   delete_Faker(id){
    //const nId = parseInt(id);
    const index = this.courses.findIndex((item) => item.courseId === id);
    if(index === -1)
      throw new boom.notFound('Course not found: ' + id);

    var currentCourse = this.courses[index];
    this.courses.splice(index, 1);

    return currentCourse;

  }

  //GET ALL FAKE COURSES
  getAll_Faker(size){
    const courses = this.courses.filter((item, index) => item && index < size);
    if(!courses)
      throw boom.notFound('Collection doesn´t exists');
    else if(courses.length <= 0)
      throw boom.notFound('There are no courses registered');

    return courses;
  }

  //GET FAKE COURSE BY ID
  getById_Faker(id){
    //const nId = parseInt(id);
    const Course = this.courses.find((item) => item && item.courseId === id);
    if(!Course)
      throw new boom.notFound('Course not found: ' + id);
    return Course;
  }
 //#endregion

}

module.exports = CoursesService;
