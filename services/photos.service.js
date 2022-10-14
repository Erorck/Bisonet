const faker = require('faker');

const boom = require('@hapi/boom');

class PhotosService{

  constructor(){
    this.photos = [];
    this.generate();
  }

  generate(){
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

  create(data){
    const newphotos = {
      photoId: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.photos.push(newphotos);
    return newphotos;
  }

  update(id, changes){
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

   delete(id){
    //const nId = parseInt(id);
    const index = this.photos.findIndex((item) => item.photoId === id);
    if(index === -1)
      throw new boom.notFound('photos not found: ' + id);

    var currentphotos = this.photos[index];
    this.photos.splice(index, 1);

    return currentphotos;

  }

  getAll(size){
    const photos = this.photos.filter((item, index) => item && index < size);
    if(!photos)
      throw boom.notFound('Collection doesn´t exists');
    else if(photos.length <= 0)
      throw boom.notFound('There are no photos registered');

    return photos;
  }

  getById(id){
    //const nId = parseInt(id);
    const photos = this.photos.find((item) => item && item.photoId === id);
    if(!photos)
      throw new boom.notFound('photos not found: ' + id);
    return photos;
  }

}

module.exports = PhotosService;
