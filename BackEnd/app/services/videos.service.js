const faker = require('faker');
const boom = require('@hapi/boom');
const VideosModel = require('../models/videos_post.model');
const PostModel = require('../models/posts.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_VIDEOS_REGISTERED_MSG = 'There are no videos registered';
const VIDEOS_NOT_FOUND_MSG = 'Video not found: ';

class VideosService {
  constructor() {
    this.video = [];
    //this.generate();
  }

  //DB METHODS-----------------------------------------

  async create(data) {
    const { post } = data;

    //Validar que exista el post al que se agregará la imagen
    const videoPost = await PostModel.findOne({
      _id: post,
    });

    if (!videoPost) {
      throw boom.notFound('Post doesnt exists');
    }

    const newVideos = await VideosModel.create(data);

    const correctVideo = await VideosModel.findOne({
      _id: newVideos._id,
    });

    videoPost.Videos.push(correctVideo);
    videoPost.save();

    return newVideos;
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

    videos.isActive = isActive === undefined ? videos.isActive : isActive;
    await videos.save();

    //Obtenemos el post de la foto
    const videoPost = await PostModel.findOne({
      _id: videos.post,
    });

    //Obtenemos el comentario desactualizado del post
    let prevVideo = videoPost.Videos.find(
      (element) => element['_id'] == VideosId
    );

    console.log(prevVideo);
    videoPost.Videos.remove(prevVideo); //Removemos el comentario desactualizado del post
    videoPost.Videos.push(videos); //Añadimos el comentario actualizado al post
    await videoPost.save();

    console.log(videos);

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

    const videoPost = await PostModel.findOne({
      _id: videos.post,
    });

    videoPost.Videos.remove(videos);
    videoPost.save();

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
}

module.exports = VideosService;
