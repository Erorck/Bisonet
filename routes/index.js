const express = require('express');
const usersRouter = require('./users.router');
const coursesRouter = require('./courses.router');
const groupsRouter = require('./groups.router');
const postRouter = require('./post.router');
const evCulturalRouter = require('./Eventos_culturales.router');
const evDeportivoRouter = require('./Eventos_deportivos.router');
const notComunicadosRouter = require('./Noticias_comunicados.router');
const notConvocatoriaRouter = require('./Noticias_convocatoria.router');
const notTramitesRouter = require('./Noticias_tramites.router');
const commentsRouter = require('./comments.router');
const photosRouter = require('./photos.router');
const videosRouter = require('./videos.router');
const sectionsRouter = require('./sections.router');
const postTypesRouter = require('./Tipos_post.router');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  //endpoints de la v1
  router.use('/users', usersRouter);
  router.use('/courses', coursesRouter);
  router.use('/groups', groupsRouter);
  router.use('/post', postRouter);
  /*router.use('/post', evCulturalRouter);
  router.use('/post', evDeportivoRouter);
  router.use('/post', notComunicadosRouter);
  router.use('/post', notConvocatoriaRouter);
  router.use('/post', notTramitesRouter);
  router.use('/post', notTramitesRouter);
  router.use('/post', notTramitesRouter);*/
  router.use('/photos', photosRouter);
  router.use('/videos', videosRouter);
  router.use('/comments', commentsRouter);
  router.use('/sections', sectionsRouter);
  router.use('/tipos_post', postTypesRouter);
}

module.exports = routerApi;
