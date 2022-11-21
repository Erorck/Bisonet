const faker = require('faker');
const boom = require('@hapi/boom');
const UserModel = require('../models/users.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_USERS_REGISTERED_MSG = 'There are no users registered';
const USER_NOT_FOUND_MSG = 'User not found: ';

class UserService {
  constructor() {
    this.users = [];
    //this.generate_Faker();
  }

  //-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB USER
  async create(data) {
    const existsEmail = await UserModel.findOne({
      institutional_email: data.institutional_email,
    });

    if (existsEmail) {
      throw boom.unauthorized('There is already a user with that email');
    }

    const existsId = await UserModel.findOne({
      userId: data.userId,
    });

    if (existsId) {
      throw boom.unauthorized('There is already a user with that id');
    }

    const newUser = await UserModel.create(data);
    newUser.set('password', undefined, { strict: false });
    return newUser;
  }

  //UPDATE DB USER
  async update(userId, changes) {
    let user = await UserModel.findOne({
      _id: userId,
    });

    if (user == undefined || user == null)
      throw new boom.notFound(USER_NOT_FOUND_MSG + userId);

    const { institutional_email } = changes;

    if (institutional_email != null && institutional_email != undefined) {
      const existsEmail = await UserModel.findOne({
        institutional_email: institutional_email,
      });

      if (existsEmail && existsEmail._id != userId) {
        throw boom.unauthorized('There is already a user with that email');
      }
    }

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
      isActive: user.isActive,
    };

    const {
      password,
      first_name,
      first_last_name,
      second_last_name,
      career_especialty,
      current_semester,
      profileImage,
      user_type,
      isActive,
    } = changes;

    user.password = password || user.password;
    user.first_name = first_name || user.first_name;
    user.first_last_name = first_last_name || user.first_last_name;
    user.second_last_name = second_last_name || user.second_last_name;
    user.institutional_email = institutional_email || user.institutional_email;
    user.career_especialty = career_especialty || user.career_especialty;
    user.current_semester = current_semester || user.current_semester;
    user.profileImage = profileImage || user.profileImage;
    user.user_type = user_type || user.user_type;
    user.isActive = isActive === undefined ? user.isActive : isActive;
    user.save();

    return {
      old: oldUser,
      changed: user,
    };
  }

  //UPDATE PROFILE IMAGE
  async updateProfilePic(userId, changes) {
    let user = await UserModel.findOne({
      _id: userId,
    });

    if (user == undefined || user == null)
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
      isActive: user.isActive,
    };

    user.profileImage = { ...changes };
    user.save();

    return {
      old: oldUser,
      changed: user,
    };
  }

  //DELETE DB USER
  async delete(userId) {
    let user = await UserModel.findOne({
      _id: userId,
    });

    const { deletedCount } = await UserModel.deleteOne({
      _id: userId,
    });

    if (deletedCount <= 0) throw new boom.notFound(USER_NOT_FOUND_MSG + userId);

    user.set('password', undefined, { strict: true });
    return user;
  }

  //GET ALL USERS DB
  async getAll(limit, filter) {
    let users = await UserModel.find(filter);

    if (!users) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (users.length <= 0) throw boom.notFound(NO_USERS_REGISTERED_MSG);

    users = limit
      ? users.filter((item, index) => item && index < limit)
      : users;

    return users;
  }

  //GET DB USER BY ID
  async getById(userId) {
    let user = await UserModel.findOne({
      _id: userId,
    });

    if (user == undefined || user == null)
      throw new boom.notFound(USER_NOT_FOUND_MSG + userId);

    return user;
  }

  //GET DB USER BY EMAIL
  async getByEmail(userEmail) {
    let user = await UserModel.findOne({
      institutional_email: userEmail,
    });

    if (user == undefined || user == null)
      throw new boom.notFound(USER_NOT_FOUND_MSG + userEmail);

    return user;
  }
  //#endregion
}

module.exports = UserService;
