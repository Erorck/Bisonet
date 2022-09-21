const faker = require('faker');

const boom = require('@hapi/boom');

class CoursesService{

  constructor(){
    this.courses = [];
    this.generate();
  }

  generate(){
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

  create(data){
    const newCourses = {
      courseId: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.courses.push(newCourses);
    return newCourses;
  }

  update(id, changes){
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

   delete(id){
    //const nId = parseInt(id);
    const index = this.courses.findIndex((item) => item.courseId === id);
    if(index === -1)
      throw new boom.notFound('Course not found: ' + id);

    var currentCourse = this.courses[index];
    this.courses.splice(index, 1);

    return currentCourse;

  }

  getAll(size){
    const courses = this.courses.filter((item, index) => item && index < size);
    if(!courses)
      throw boom.notFound('Collection doesn´t exists');
    else if(courses.length <= 0)
      throw boom.notFound('There are no courses registered');

    return courses;
  }

  getById(id){
    //const nId = parseInt(id);
    const Course = this.courses.find((item) => item && item.courseId === id);
    if(!Course)
      throw new boom.notFound('Course not found: ' + id);
    return Course;
  }

}

module.exports = CoursesService;
