const faker = require('faker');

const boom = require('@hapi/boom');

class UserService{

  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    const limit = 15;
    for (let index = 0; index <limit; index++) {
     this.users.push({
        userId: faker.datatype.number({
          'min': 1500000,
          'max': 2500000
      }),
        password: faker.internet.password(),
        first_name: faker.name.firstName(),
        first_last_name: faker.name.lastName(),
        second_last_name: faker.name.lastName(),
        institutional_email: faker.internet.email(),
        career_especialty: faker.name.jobArea(),
        current_semester: faker.datatype.number({
          'min': 1,
          'max': 10
      }),
        profileImage: faker.image.image(),
        user_type: faker.name.jobDescriptor(),
        isActive: faker.datatype.boolean()
     });

    }
  }

  create(data){
    const newUser = {
      userId: faker.datatype.number({
        'min': 1500000,
        'max': 2500000
    }),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.users.push(newUser);
    return newUser;
  }

  update(userId, changes){
    const nId = parseInt(userId);
    const index = this.users.findIndex((item) => item.userId === nId);
    if(index === -1)
      throw new boom.notFound('User not found: ' + nId);

    var currentUser = this.users[index];
    this.users[index] = {
      ...currentUser,
      ...changes,
    };
    return {
      old: currentUser,
      changed: this.users[index]
    }
  }

   delete(userId){
    const nId = parseInt(userId);
    const index = this.users.findIndex((item) => item.userId === nId);
    if(index === -1)
      throw new boom.notFound('User not found: ' + nId);

    var currentUser = this.users[index];
    this.users.splice(index, 1);

    return currentUser;

  }

  getAll(size){
    const users = this.users.filter((item, index) => item && index < size);
    if(!users)
      throw boom.notFound('Collection doesn´t exists');
    else if(users.length <= 0)
      throw boom.notFound('There are no users registered');

    return users;
  }

  getById(userId){
    const nId = parseInt(userId);
    const user = this.users.find((item) => item && item.userId === nId);
    if(!user)
      throw new boom.notFound('User not found: ' + nId);
    return user;
  }

}

module.exports = UserService;
