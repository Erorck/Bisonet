const faker = require('faker');

const boom = require('@hapi/boom');

class GroupsService{

  constructor(){
    this.groups = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let index = 0; index <limit; index++) {
     this.groups.push({
        groupId: faker.datatype.uuid(),
        group_teacher: faker.internet.url(),
        group_members: faker.datatype.json(),
        course: faker.internet.url(),
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

  create(data){
    const newGroups = {
      groupId: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.groups.push(newGroups);
    return newGroups;
  }

  update(id, changes){
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

   delete(id){
    //const nId = parseInt(id);
    const index = this.groups.findIndex((item) => item.groupId === id);
    if(index === -1)
      throw new boom.notFound('Group not found: ' + id);

    var currentGroup = this.groups[index];
    this.groups.splice(index, 1);

    return currentGroup;

  }

  getAll(size){
    const groups = this.groups.filter((item, index) => item && index < size);
    if(!groups)
      throw boom.notFound('Collection doesn´t exists');
    else if(groups.length <= 0)
      throw boom.notFound('There are no groups registered');

    return groups;
  }

  getById(id){
    //const nId = parseInt(id);
    const Group = this.groups.find((item) => item && item.groupId === id);
    if(!Group)
      throw new boom.notFound('Group not found: ' + id);
    return Group;
  }

}

module.exports = GroupsService;
