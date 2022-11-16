const express = require('express');
const boom = require('@hapi/boom');
const UserService = require('../services/users.service');
const service = new UserService();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUserDto,
  updateUserDto,
  getUserDto,
  loginDto,
} = require('../DTOs/users.dto');

const router = express.Router();
const { encrypt, compare } = require('../utils/password.handler');
const { signToken } = require('../utils/jwt.handler');

//RUTAS GENERALES /

//GET ALL USERS
router.get('/', async (req, res, next) => {
  try {
    const { size } = req.query;
    const filter = req.body;
    const users = await service.getAll(size || 10, filter);
    res.json({
      success: true,
      message: 'Users found successfully',
      Data: users,
    });
  } catch (error) {
    next(error);
  }
});

//REGISTER USER
router.post(
  '/register',
  validatorHandler(createUserDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const password = await encrypt(body['password']);
      const bodyInsert = { ...body, password };
      const user = await service.create(bodyInsert); //Para updates y creates
      res.json({
        success: true, //Validaciones FrontEnd
        token: await signToken(user),
        message: 'User created successfully', //Mostrar al usuario
        Data: user, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

//LOGIN
router.post(
  '/login',
  validatorHandler(loginDto, 'body'),
  async (req, res, next) => {
    try {
      const { institutional_email, password } = req.body; //Obtener ids
      const user = await service.getByEmail(institutional_email);
      if (!user) {
        throw boom.notFound('User not found');
      }
      const hashPassword = user.get('password');
      const check = await compare(password, hashPassword);
      if (!check) {
        throw boom.unauthorized('Wrong credentials');
      }
      user.set('password', undefined, { strict: false });
      res.json({
        success: true,
        token: await signToken(user),
        message: 'User logged successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

//RUTAS ESPECIFICAS /:userId

//GET USER BY ID
router.get(
  '/:userId',
  validatorHandler(getUserDto, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params; //Obtener ids
      const user = await service.getById(userId);
      res.json({
        success: true,
        message: 'User found successfully',
        Data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

//PARTIALLY UPDATE USER
router.patch(
  '/:userId',
  validatorHandler(getUserDto, 'params'),
  validatorHandler(updateUserDto, 'body'),
  async (req, res, next) => {
    try {
      const { userId } = req.params; //Obtener ids
      const body = req.body;
      const { old, changed } = await service.update(userId, body);
      res.json({
        success: true,
        message: 'User updated successfully',
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

//DELETE USER
router.delete('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params; //Obtener ids
    deletedUser = await service.delete(userId);
    res.json({
      success: true,
      message: 'User eliminated successfully',
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
