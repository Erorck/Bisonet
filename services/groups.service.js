const faker = require('faker');
const GroupModel = require('../models/groups.model');
const boom = require('@hapi/boom');


const NOT_FOUND_COLL_MSG = 'Collection doesn\'t exists';
const NO_GROUPS_REGISTERED_MSG = 'There are no groups registered';
const GROUP_NOT_FOUND_MSG = 'Group not found: ';


class GroupsService{

  constructor(){
    this.groups = [];
    this.generate_Faker();
  }

//-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB GROUP
 async create(data){
    const newGroup = new GroupModel(data);
    await newGroup.save();
    return data;
  }

   //UPDATE DB GROUP
  async update(groupId, changes){
    let group = await GroupModel.findOne({
      _id: groupId
    });

    if(group == undefined || group == null)
      throw new boom.notFound(GROUP_NOT_FOUND_MSG + groupId);

    let oldGroup = {
        group_teacher: group.group_teacher,
        group_members: group.group_members,
        course: group.course,
        year: group.year,
        semester: group.semester,
        posts: group.posts,
				isActive: group.isActive
    };

    const {group_teacher, group_members, course, year, semester, posts, isActive} = changes;
    group.group_teacher = group_teacher || group.group_teacher;

    if(group_members != undefined)
    group.group_members = [...group_members];

    group.course = course || group.course;
    group.year = year || group.year;
    group.semester = semester || group.semester;

    if(posts != undefined)
    group.posts = [...posts];

    group.isActive = isActive || group.isActive;
    group.save();

    return {
      old: oldGroup,
      changed: group
    }
  }

   //DELETE DB GROUP
  async delete(groupId){
    let group = await GroupModel.findOne({
      _id: groupId
    });

    const {deletedCount} = await GroupModel.deleteOne({
      _id: groupId
    })

    if(deletedCount <= 0)
      throw new boom.notFound(GROUP_NOT_FOUND_MSG + groupId);

    return group;

  }

  //GET ALL DB GROUPS
  async getAll(limit, filter){
    let groups = await GroupModel.find(filter);

    if(!groups)
      throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if(groups.length <= 0)
      throw boom.notFound(NO_GROUPS_REGISTERED_MSG);

    groups = limit ? groups.filter((item, index) => item && index < limit) : groups;

    return groups;
  }

  //GET DB GROUP BY ID
  async getById(groupId){
    let group = await GroupModel.findOne({
      _id: groupId
    });

    if(group == undefined || group == null)
      throw new boom.notFound(GROUP_NOT_FOUND_MSG + groupId);

    return group;
  }
 //#endregion

  //-------------FAKER METHODS----------------//
  //#region FAKER METHODS
  generate_Faker(){
    const limit = 10;
    for (let index = 0; index <limit; index++) {
     this.groups.push({
        groupId: faker.datatype.uuid(),
        group_teacher: faker.internet.url(),
        group_members: faker.datatype.json(),
        group: faker.internet.url(),
        year: faker.datatype.number({
          'min': 2010,
          'max': 2025
      }),
        semester: faker.datatype.number({
          'min': 1,
          'max': 2
      }),
        posts: faker.internet.url(),
        isActive: faker.datatype.boolean()
     });

    }
  }

  //CREATE FAKE GROUP
  create_Faker(data){
    const newGroups = {
      groupId: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.groups.push(newGroups);
    return newGroups;
  }

   //UPDATE FAKE GROUP
  update_Faker(id, changes){
    //const nId = parseInt(id);
    const index = this.groups.findIndex((item) => item.groupId === id);
    if(index === -1)
      throw new boom.notFound('Group not found: ' + id);

    var currentGroup = this.groups[index];
    this.groups[index] = {
      ...currentGroup,
      ...changes,
    };
    return {
      old: currentGroup,
      changed: this.groups[index]
    }
  }

   //DELETE FAKE GROUP
  delete_Faker(id){
    //const nId = parseInt(id);
    const index = this.groups.findIndex((item) => item.groupId === id);
    if(index === -1)
      throw new boom.notFound('Group not found: ' + id);

    var currentGroup = this.groups[index];
    this.groups.splice(index, 1);

    return currentGroup;

  }

  //GET ALL FAKE GROUPS
  getAll_Faker(size){
    const groups = this.groups.filter((item, index) => item && index < size);
    if(!groups)
      throw boom.notFound('Collection doesn´t exists');
    else if(groups.length <= 0)
      throw boom.notFound('There are no groups registered');

    return groups;
  }

  //GET FAKE GROUP BY ID
  getById_Faker(id){
    //const nId = parseInt(id);
    const Group = this.groups.find((item) => item && item.groupId === id);
    if(!Group)
      throw new boom.notFound('Group not found: ' + id);
    return Group;
  }
 //#endregion

}

module.exports = GroupsService;
