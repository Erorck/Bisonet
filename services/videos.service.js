const faker = require('faker');

const boom = require('@hapi/boom');

class VideosService{

  constructor(){
    this.video = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let index = 0; index <limit; index++) {
     this.video.push({
        idVideo : faker.datatype.uuid(),
        video : faker.image.image(),
        fecha : faker.date.past(),
        id_post : faker.datatype.uuid(),
        active : faker.datatype.boolean()
     });

    }
  }

  create(data){
    const newvideo = {
      idVideo: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.video.push(newvideo);
    return newvideo;
  }

  update(id, changes){
    //const nId = parseInt(id);
    const index = this.video.findIndex((item) => item.idVideo === id);
    if(index === -1)
      throw new boom.notFound('video not found: ' + id);

    var currentvideo = this.video[index];
    this.video[index] = {
      ...currentvideo,
      ...changes,
    };
    return {
      old: currentvideo,
      changed: this.video[index]
    }
  }

   delete(id){
    //const nId = parseInt(id);
    const index = this.video.findIndex((item) => item.idVideo === id);
    if(index === -1)
      throw new boom.notFound('videos not found: ' + id);

    var currentvideo = this.video[index];
    this.video.splice(index, 1);

    return currentvideo;

  }

  getAll(size){
    const video = this.video.filter((item, index) => item && index < size);
    if(!video)
      throw boom.notFound('Collection doesn´t exists');
    else if(video.length <= 0)
      throw boom.notFound('There are no video registered');

    return video;
  }

  getById(id){
    //const nId = parseInt(id);
    const video = this.video.find((item) => item && item.idVideo === id);
    if(!video)
      throw new boom.notFound('video not found: ' + id);
    return video;
  }

}

module.exports = VideosService;
