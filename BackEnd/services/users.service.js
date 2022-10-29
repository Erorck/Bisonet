const faker = require('faker');
const boom = require('@hapi/boom');
const UserModel = require('../models/users.model');


const NOT_FOUND_COLL_MSG = 'Collection doesn\'t exists';
const NO_USERS_REGISTERED_MSG = 'There are no users registered';
const USER_NOT_FOUND_MSG = 'User not found: ';

class UserService{

  constructor(){
    this.users = [];
    //this.generate_Faker();
  }

  //-------------DB METHODS----------------//
  //#region DB METHODS

   //CREATE DB USER
   async create(data){
    const newUser = new UserModel(data);
    await newUser.save();
    return data;
  }

  //UPDATE DB USER
  async update(userId, changes){

    // var objectIdRegex = new RegExp(Utilities.REGEX_VALD_OBJECT_ID.pattern);

    // if(!objectIdRegex.test())
    //   throw new boom.badRequest('Id con formato incorrecto');

    let user = await UserModel.findOne({
      _id: userId
    });

    if(user == undefined || user == null)
      throw new boom.notFound(USER_NOT_FOUND_MSG + userId);

    let oldUser = {
        userId: user.userId,
				password: user.password,
        first_name: user.first_name,
        first_last_name: user.first_last_name,
        second_last_name: user.second_last_name,
        institutional_email: user.institutional_email,
				career_especialty: user.career_especialty,
				current_semester: user.current_semester,
        profileImage: user.profileImage,
				user_type: user.user_type,
				isActive: user.isActive
    };

    const {password, first_name, first_last_name, second_last_name, institutional_email, career_especialty, current_semester, profileImage, user_type, isActive} = changes;
    user.password = password || user.password;
    user.first_name = first_name || user.first_name;
    user.first_last_name = first_last_name || user.first_last_name;
    user.second_last_name = second_last_name || user.second_last_name;
    user.institutional_email = institutional_email || user.institutional_email;
    user.career_especialty = career_especialty || user.career_especialty;
    user.current_semester = current_semester || user.current_semester;
    user.profileImage = profileImage || user.profileImage;
    user.user_type = user_type || user.user_type;
    user.isActive = isActive || user.isActive;
    user.save();

    return {
      old: oldUser,
      changed: user
    }
  }

  //DELETE DB USER
  async delete(userId){

    let user = await UserModel.findOne({
      _id: userId
    });

    const {deletedCount} = await UserModel.deleteOne({
      _id: userId
    })

    if(deletedCount <= 0)
      throw new boom.notFound(USER_NOT_FOUND_MSG + userId);

    return user;
  }

  //GET ALL USERS DB
  async getAll(limit, filter){
    let users = await UserModel.find(filter);

    if(!users)
      throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if(users.length <= 0)
      throw boom.notFound(NO_USERS_REGISTERED_MSG);

    users = limit ? users.filter((item, index) => item && index < limit) : users;

    return users;
  }

  //GET DB USER BY ID
  async getById(userId){
    let user = await UserModel.findOne({
      _id: userId
    });

    if(user == undefined || user == null)
      throw new boom.notFound(USER_NOT_FOUND_MSG + userId);

    return user;
  }
  //#endregion



  //-------------FAKER METHODS----------------//
  //#region FAKER METHODS
  generate_Faker(){
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

  //CREATE FAKE USER
  create_Faker(data){
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

  //UPDATE FAKE USER
  update_Faker(userId, changes){
    const nId = parseInt(userId);
    const index = this.users.findIndex((item) => item.userId === nId);
    if(index === -1)
      throw new boom.notFound(USER_NOT_FOUND_MSG + nId);

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

   //DELETE FAKE USER
   delete_Faker(userId){
    const nId = parseInt(userId);
    const index = this.users.findIndex((item) => item.userId === nId);
    if(index === -1)
      throw new boom.notFound(USER_NOT_FOUND_MSG + nId);

    var currentUser = this.users[index];
    this.users.splice(index, 1);

    return currentUser;

  }

  //GET ALL FAKE USERS
  getAll_Faker(size){
    const users = this.users.filter((item, index) => item && index < size);

    if(!users)
      throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if(users.length <= 0)
      throw boom.notFound(NO_USERS_REGISTERED_MSG);


    return users;
  }

  //GET FAKE USER BY ID
  getById_Faker(userId){
    const nId = parseInt(userId);
    const user = this.users.find((item) => item && item.userId === nId);
    if(!user)
      throw new boom.notFound(USER_NOT_FOUND_MSG + nId);
    return user;
  }
 //#endregion
}

module.exports = UserService;
