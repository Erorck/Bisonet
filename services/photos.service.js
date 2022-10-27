const faker = require('faker');
const boom = require('@hapi/boom');
const PhotosModel = require('../models/photos_post.model');

const NOT_FOUND_COLL_MSG = 'Collection doesn\'t exists';
const NO_PHOTOS_REGISTERED_MSG = 'There are no photos registered';
const PHOTOS_NOT_FOUND_MSG = 'Photos not found: ';

class PhotosService{

  constructor(){
    this.photos = [];
    //this.generate();
  }

//BD METHODS-------------------------------------

//CREATE DB PHOTOS
async create(data){
  const newPhotos = new PhotosModel(data);
  await newPhotos.save();
  return data;
}

async update(photosId, changes){
  let photos = await PhotosModel.findOne({
    _id: photosId
  });

  if(photos == undefined || photos == null)
    throw new boom.notFound(PHOTOS_NOT_FOUND_MSG + photosId);

  let oldPhotos = {
      post: photos.post,
      content: photos.content,
      Fecha_Publicacion: photos.Fecha_Publicacion,
      isActive: photos.isActive,
  };

  const {post, content, Fecha_Publicacion, isActive} = changes;
  photos.post = post || photos.post;
  photos.content = content || photos.content;
  photos.Fecha_Publicacion = Fecha_Publicacion || photos.Fecha_Publicacion;

  photos.isActive = isActive || photos.isActive;
  photos.save();

  return {
    old: oldPhotos,
    changed: photos
  }
}

async delete(photosId){

  let photos = await PhotosModel.findOne({
    _id: photosId
  });

  const {deletedCount} = await PhotosModel.deleteOne({
    _id: photosId
  })

  if(deletedCount <= 0)
    throw new boom.notFound(NOT_FOUND_COLL_MSG + photosId);

  return photos;

}

async getAll(limit, filter){
  let photos = await PhotosModel.find(filter);

  if(!photos)
    throw boom.notFound(NOT_FOUND_COLL_MSG);
  else if(photos.length <= 0)
    throw boom.notFound(NO_PHOTOS_REGISTERED_MSG);

    photos = limit ? photos.filter((item, index) => item && index < limit) : photos;

  return photos;
}

async getById(photosId){
  let photos = await PhotosModel.findOne({
    _id: photosId
  });

  if(photos == undefined || photos == null)
    throw new boom.notFound(PHOTOS_NOT_FOUND_MSG + photosId);

  return photos;
}


//FAKER METHODS-----------------------------------  
  Fakergenerate(){
    const limit = 10;
    for (let index = 0; index <limit; index++) {
     this.photos.push({
        photoId : faker.datatype.uuid(),
        foto : faker.image.image(),
        upload_date : faker.date.past(),
        id_post : faker.datatype.uuid(),
        active : faker.datatype.boolean()
     });

    }
  }

  Fakercreate(data){
    const newphotos = {
      photoId: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.photos.push(newphotos);
    return newphotos;
  }

  Fakerupdate(id, changes){
    //const nId = parseInt(id);
    const index = this.photos.findIndex((item) => item.photoId === id);
    if(index === -1)
      throw new boom.notFound('Photos not found: ' + id);

    var currentphotos = this.photos[index];
    this.photos[index] = {
      ...currentphotos,
      ...changes,
    };
    return {
      old: currentphotos,
      changed: this.photos[index]
    }
  }

  Fakerdelete(id){
    //const nId = parseInt(id);
    const index = this.photos.findIndex((item) => item.photoId === id);
    if(index === -1)
      throw new boom.notFound('photos not found: ' + id);

    var currentphotos = this.photos[index];
    this.photos.splice(index, 1);

    return currentphotos;

  }

  FakergetAll(size){
    const photos = this.photos.filter((item, index) => item && index < size);
    if(!photos)
      throw boom.notFound('Collection doesn´t exists');
    else if(photos.length <= 0)
      throw boom.notFound('There are no photos registered');

    return photos;
  }

  FakergetById(id){
    //const nId = parseInt(id);
    const photos = this.photos.find((item) => item && item.photoId === id);
    if(!photos)
      throw new boom.notFound('photos not found: ' + id);
    return photos;
  }

}

module.exports = PhotosService;
