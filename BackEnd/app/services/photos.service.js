const boom = require('@hapi/boom');
const PhotosModel = require('../models/photos_post.model');
const PostModel = require('../models/posts.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_PHOTOS_REGISTERED_MSG = 'There are no photos registered';
const PHOTOS_NOT_FOUND_MSG = 'Photo not found: ';

class PhotosService {
  constructor() {
    this.photos = [];
  }

  //BD METHODS-------------------------------------

  //CREATE DB PHOTOS
  async create(data) {
    const { post } = data;

    //Validar que exista el post al que se agregará la imagen
    const photoPost = await PostModel.findOne({
      _id: post,
    });

    if (!photoPost) {
      throw boom.notFound('Post doesnt exists');
    }

    const newPhoto = await PhotosModel.create(data);

    const correctPhoto = await PhotosModel.findOne({
      _id: newPhoto._id,
    });

    photoPost.Photos.push(correctPhoto);
    photoPost.save();

    return newPhoto;
  }

  async update(photosId, changes) {
    let photos = await PhotosModel.findOne({
      _id: photosId,
    });

    if (photos == undefined || photos == null)
      throw new boom.notFound(PHOTOS_NOT_FOUND_MSG + photosId);

    let oldPhotos = {
      post: photos.post,
      file_name: photos.file_name,
      Fecha_Publicacion: photos.Fecha_Publicacion,
      isActive: photos.isActive,
    };

    const { isActive } = changes;

    photos.isActive = isActive === undefined ? photos.isActive : isActive;
    await photos.save();

    //Obtenemos el post de la foto
    const photosPost = await PostModel.findOne({
      _id: photos.post,
    });

    //Obtenemos el comentario desactualizado del post
    let prevPhoto = photosPost.Photos.find(
      (element) => element['_id'] == photosId
    );

    console.log(prevPhoto);
    photosPost.Photos.remove(prevPhoto); //Removemos el comentario desactualizado del post
    photosPost.Photos.push(photos); //Añadimos el comentario actualizado al post
    await photosPost.save();

    console.log(photos);

    return {
      old: oldPhotos,
      changed: photos,
    };
  }

  async delete(photosId) {
    let photos = await PhotosModel.findOne({
      _id: photosId,
    });

    const { deletedCount } = await PhotosModel.deleteOne({
      _id: photosId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(NOT_FOUND_COLL_MSG + photosId);

    const photoPost = await PostModel.findOne({
      _id: photos.post,
    });

    photoPost.Photos.remove(photos);
    photoPost.save();

    return photos;
  }

  async getAll(limit, filter) {
    let photos = await PhotosModel.find(filter);

    if (!photos) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (photos.length <= 0) throw boom.notFound(NO_PHOTOS_REGISTERED_MSG);

    photos = limit
      ? photos.filter((item, index) => item && index < limit)
      : photos;

    return photos;
  }

  async getById(photosId) {
    let photos = await PhotosModel.findOne({
      _id: photosId,
    });

    if (photos == undefined || photos == null)
      throw new boom.notFound(PHOTOS_NOT_FOUND_MSG + photosId);

    return photos;
  }
}

module.exports = PhotosService;
