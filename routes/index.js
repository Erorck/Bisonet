const express = require('express');
const usersRouter = require('./users.router');
const coursesRouter = require('./courses.router');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  //endpoints de la v1
  router.use('/users', usersRouter);
  router.use('/courses', coursesRouter);
}

module.exports = routerApi;
