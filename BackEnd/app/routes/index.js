const express = require('express');
const usersRouter = require('./users.router');
const coursesRouter = require('./courses.router');
const groupsRouter = require('./groups.router');
const postRouter = require('./post.router');
const commentsRouter = require('./comments.router');
const photosRouter = require('./photos.router');
const videosRouter = require('./videos.router');
const sectionsRouter = require('./sections.router');
const postTypesRouter = require('./Tipos_post.router');
const reactionsRouter = require('./reactions.router');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  //endpoints de la v1
  router.use('/users', usersRouter);
  router.use('/courses', coursesRouter);
  router.use('/groups', groupsRouter);
  router.use('/post', postRouter);
  router.use('/photos', photosRouter);
  router.use('/videos', videosRouter);
  router.use('/comments', commentsRouter);
  router.use('/sections', sectionsRouter);
  router.use('/tipos_post', postTypesRouter);
  router.use('/reactions', reactionsRouter);
};

module.exports = routerApi;
