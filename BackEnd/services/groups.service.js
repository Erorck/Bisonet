const faker = require('faker');
const GroupModel = require('../models/groups.model');
const CourseModel = require('../models/courses.model');
const boom = require('@hapi/boom');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_GROUPS_REGISTERED_MSG = 'There are no groups registered';
const GROUP_NOT_FOUND_MSG = 'Group not found: ';

class GroupsService {
  constructor() {
    this.groups = [];
    //this.generate_Faker();
  }

  //-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB GROUP
  async create(data) {
    const existsGroup = await GroupModel.findOne({
      course: data.course,
      year: data.year,
      semester: data.semester,
    });

    if (existsGroup) {
      const groupCourse = await CourseModel.findOne({
        _id: data.course,
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
          ' period'
      );
    }

    const newGroup = new GroupModel(data);
    await newGroup.save();
    return data;
  }

  //UPDATE DB GROUP
  async update(groupId, changes) {
    let group = await GroupModel.findOne({
      _id: groupId,
    });

    if (group == undefined || group == null)
      throw new boom.notFound(GROUP_NOT_FOUND_MSG + groupId);

    const { course, year, semester } = changes;

    const existsGroup = await GroupModel.findOne({
      course: course,
      year: year,
      semester: semester,
    });

    if (existsGroup && existsGroup._id != groupId) {
      const groupCourse = await CourseModel.findOne({
        _id: changes.course,
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
          ' period'
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

    const { group_teacher, group_members, posts, isActive } = changes;
    group.group_teacher = group_teacher || group.group_teacher;

    if (group_members != undefined) group.group_members = [...group_members];

    group.course = course || group.course;
    group.year = year || group.year;
    group.semester = semester || group.semester;

    if (posts != undefined) group.posts = [...posts];

    group.isActive = isActive || group.isActive;
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
