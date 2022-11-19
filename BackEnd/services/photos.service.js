const faker = require('faker');
const boom = require('@hapi/boom');
const PhotosModel = require('../models/photos_post.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_PHOTOS_REGISTERED_MSG = 'There are no photos registered';
const PHOTOS_NOT_FOUND_MSG = 'Photos not found: ';

class PhotosService {
  constructor() {
    this.photos = [];
    //this.generate();
  }

  //BD METHODS-------------------------------------

  //CREATE DB PHOTOS
  async create(data) {
    const newPhotos = new PhotosModel(data);
    await newPhotos.save();
    return data;
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
    photos.save();

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
