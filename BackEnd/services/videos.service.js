const faker = require('faker');
const boom = require('@hapi/boom');
const VideosModel = require('../models/videos_post.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_VIDEOS_REGISTERED_MSG = 'There are no videos registered';
const VIDEOS_NOT_FOUND_MSG = 'Videos not found: ';

class VideosService {
  constructor() {
    this.video = [];
    //this.generate();
  }

  //DB METHODS-----------------------------------------

  async create(data) {
    const newVideos = new VideosModel(data);
    await newVideos.save();
    return data;
  }

  async update(VideosId, changes) {
    let videos = await VideosModel.findOne({
      _id: VideosId,
    });

    if (videos == undefined || videos == null)
      throw new boom.notFound(VIDEOS_NOT_FOUND_MSG + VideosId);

    let oldVideos = {
      post: videos.post,
      file_name: videos.file_name,
      Fecha_Publicacion: videos.Fecha_Publicacion,
      isActive: videos.isActive,
    };

    const { isActive } = changes;

    videos.isActive = isActive === undefined ? photos.isActive : isActive;
    videos.save();

    return {
      old: oldVideos,
      changed: videos,
    };
  }

  async delete(videosId) {
    let videos = await VideosModel.findOne({
      _id: videosId,
    });

    const { deletedCount } = await VideosModel.deleteOne({
      _id: videosId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(NOT_FOUND_COLL_MSG + videosId);

    return videos;
  }

  async getAll(limit, filter) {
    let videos = await VideosModel.find(filter);

    if (!videos) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (videos.length <= 0) throw boom.notFound(NO_VIDEOS_REGISTERED_MSG);

    videos = limit
      ? videos.filter((item, index) => item && index < limit)
      : videos;

    return videos;
  }

  async getById(videosId) {
    let videos = await VideosModel.findOne({
      _id: videosId,
    });

    if (videos == undefined || videos == null)
      throw new boom.notFound(VIDEOS_NOT_FOUND_MSG + videosId);

    return videos;
  }

  //FAKER METHODS--------------------------------------
  Fakegenerate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.video.push({
        idVideo: faker.datatype.uuid(),
        video: faker.image.image(),
        fecha: faker.date.past(),
        id_post: faker.datatype.uuid(),
        active: faker.datatype.boolean(),
      });
    }
  }

  Fakecreate(data) {
    const newvideo = {
      idVideo: faker.datatype.uuid(),
      ...data, //MEZCLAR EL ID CON TODO LO DE DATA
    };
    this.video.push(newvideo);
    return newvideo;
  }

  Fakeupdate(id, changes) {
    //const nId = parseInt(id);
    const index = this.video.findIndex((item) => item.idVideo === id);
    if (index === -1) throw new boom.notFound('video not found: ' + id);

    var currentvideo = this.video[index];
    this.video[index] = {
      ...currentvideo,
      ...changes,
    };
    return {
      old: currentvideo,
      changed: this.video[index],
    };
  }

  Fakedelete(id) {
    //const nId = parseInt(id);
    const index = this.video.findIndex((item) => item.idVideo === id);
    if (index === -1) throw new boom.notFound('videos not found: ' + id);

    var currentvideo = this.video[index];
    this.video.splice(index, 1);

    return currentvideo;
  }

  FakegetAll(size) {
    const video = this.video.filter((item, index) => item && index < size);
    if (!video) throw boom.notFound('Collection doesn´t exists');
    else if (video.length <= 0)
      throw boom.notFound('There are no video registered');

    return video;
  }

  FakegetById(id) {
    //const nId = parseInt(id);
    const video = this.video.find((item) => item && item.idVideo === id);
    if (!video) throw new boom.notFound('video not found: ' + id);
    return video;
  }
}

module.exports = VideosService;
