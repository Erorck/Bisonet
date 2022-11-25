const GroupModel = require('../models/groups.model');
const CourseModel = require('../models/courses.model');
const UserModel = require('../models/users.model');
const boom = require('@hapi/boom');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_GROUPS_REGISTERED_MSG = 'There are no groups registered';
const GROUP_NOT_FOUND_MSG = 'Group not found: ';

class GroupsService {
  constructor() {
    this.groups = [];
  }

  //-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB GROUP
  async create(data) {
    const existsGroup = await GroupModel.findOne({
      course: data.course,
      year: data.year,
      semester: data.semester,
      group_teacher: data.group_teacher,
    });

    const groupCourse = await CourseModel.findOne({
      _id: data.course,
    });

    if (!groupCourse) {
      throw boom.notFound('Course doesnt exists');
    }

    const groupTeacher = await UserModel.findOne({
      _id: data.group_teacher,
    });

    if (!groupTeacher) {
      throw boom.notFound('Teacher doesnt exists');
    }

    if (existsGroup) {
      const monthPeriod =
        existsGroup.semester == 1 ? 'Enero-Junio' : 'Agosto-Diciembre';

      throw boom.unauthorized(
        'There is already a group of the ' +
          groupCourse.course_name +
          ' course in the ' +
          monthPeriod +
          ' ' +
          existsGroup.year +
          ' period managed by the teacher ' +
          groupTeacher.first_name +
          ' ' +
          groupTeacher.first_last_name +
          ' ' +
          groupTeacher.second_last_name
      );
    }

    const newGroup = await GroupModel.create(data);

    groupCourse.groups.push(newGroup._id);
    groupCourse.save();

    return newGroup;
  }

  //UPDATE DB GROUP
  async update(groupId, changes) {
    //Validamos que exista el grupo a editar
    let group = await GroupModel.findOne({
      _id: groupId,
    });

    if (group == undefined || group == null)
      throw new boom.notFound(GROUP_NOT_FOUND_MSG + groupId);

    //Validamos si existe el maestro y el grupo que se quieren asignar
    const { course, group_teacher } = changes;

    //Validar maestro nuevo
    if (group_teacher != undefined) {
      const groupTeacher = await UserModel.findOne({
        _id: group_teacher === undefined ? group.group_teacher : group_teacher,
      });

      if (!groupTeacher) {
        throw boom.notFound('Teacher doesnt exists');
      }
    }

    if (course != undefined) {
      //Validar materia nueva
      const groupCourse = await CourseModel.findOne({
        _id: course === undefined ? group.course : course,
      });

      if (!groupCourse) {
        throw boom.notFound('Course doesnt exists');
      }
    }

    //Validar si no existe un grupo con el mismo maestro, con la mimsa materia y en el mismo periodo.
    const existsGroup = await GroupModel.findOne({
      course: course === undefined ? group.course : course,
      year: group.year,
      semester: group.semester,
      group_teacher:
        group_teacher === undefined ? group.group_teacher : group_teacher,
    });

    //Si existe y su id no es igual al que estamos modificando, mostramos un error
    if (existsGroup && existsGroup._id != groupId) {
      const groupCourse = await CourseModel.findOne({
        _id: course,
      });

      const monthPeriod =
        existsGroup.semester == 1 ? 'Enero-Junio' : 'Agosto-Diciembre';

      throw boom.unauthorized(
        'There is already a group of the ' +
          groupCourse.course_name +
          ' course in the ' +
          monthPeriod +
          ' ' +
          existsGroup.year +
          ' period managed by the teacher ' +
          groupTeacher.first_name +
          ' ' +
          groupTeacher.first_last_name +
          ' ' +
          groupTeacher.second_last_name
      );
    }

    let oldGroup = {
      group_teacher: group.group_teacher,
      group_members: group.group_members,
      course: group.course,
      year: group.year,
      semester: group.semester,
      posts: group.posts,
      isActive: group.isActive,
    };

    const { group_members, posts, isActive } = changes;
    group.group_teacher = group_teacher || group.group_teacher;

    if (group_members != undefined) group.group_members = [...group_members];

    //Eliminamos el grupo del arreglo de grupos de su materia y lo agregamos a la nueva
    if (groupCourse._id != group.course) {
      const currentCourse = await CourseModel.findOne({
        _id: group.course,
      });

      currentCourse.groups.remove(group._id);
      groupCourse.groups.push(group._id);
      groupCourse.save();
      currentCourse.save();
    }

    group.course = course || group.course;

    if (posts != undefined) group.posts = [...posts];

    group.isActive = isActive === undefined ? group.isActive : isActive;
    group.save();

    return {
      old: oldGroup,
      changed: group,
    };
  }

  //DELETE DB GROUP
  async delete(groupId) {
    let group = await GroupModel.findOne({
      _id: groupId,
    });

    const { deletedCount } = await GroupModel.deleteOne({
      _id: groupId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(GROUP_NOT_FOUND_MSG + groupId);

    const currentCourse = await CourseModel.findOne({
      _id: group.course,
    });

    currentCourse.groups.remove(group._id);
    currentCourse.save();

    return group;
  }

  //GET ALL DB GROUPS
  async getAll(limit, filter) {
    let groups = await GroupModel.find(filter);

    if (!groups) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (groups.length <= 0) throw boom.notFound(NO_GROUPS_REGISTERED_MSG);

    groups = limit
      ? groups.filter((item, index) => item && index < limit)
      : groups;

    return groups;
  }

  //GET DB GROUP BY ID
  async getById(groupId) {
    let group = await GroupModel.findOne({
      _id: groupId,
    });

    if (group == undefined || group == null)
      throw new boom.notFound(GROUP_NOT_FOUND_MSG + groupId);

    return group;
  }
  //#endregion
}

module.exports = GroupsService;
