const faker = require('faker');

const boom = require('@hapi/boom');

class N_tramitesService{

  constructor(){
    this.N_tramites = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let index = 0; index <limit; index++) {
     this.N_tramites.push({
        uuid : faker.datatype.uuid(),
        texto : faker.lorem.text(),
        fecha : faker.date.past(),
        active : faker.datatype.boolean()
     });

    }
  }

  create(data){
    const newN_tramites = {
      uuid: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.N_tramites.push(newN_tramites);
    return newN_tramites;
  }

  update(id, changes){
    //const nId = parseInt(id);
    const index = this.N_tramites.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Noticias tramites not found: ' + id);

    var currentN_tramites = this.N_tramites[index];
    this.N_tramites[index] = {
      ...currentN_tramites,
      ...changes,
    };
    return {
      old: currentN_tramites,
      changed: this.N_tramites[index]
    }
  }

   delete(id){
    //const nId = parseInt(id);
    const index = this.N_tramites.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Noticias tramites not found: ' + id);

    var currentN_tramites = this.N_tramites[index];
    this.N_tramites.splice(index, 1);

    return currentN_tramites;

  }

  getAll(size){
    const N_tramites = this.N_tramites.filter((item, index) => item && index < size);
    if(!N_tramites)
      throw boom.notFound('Collection doesn´t exists');
    else if(N_tramites.length <= 0)
      throw boom.notFound('There are no tramites comunicado registered');

    return N_tramites;
  }

  getById(id){
    //const nId = parseInt(id);
    const N_tramites = this.N_tramites.find((item) => item && item.uuid === id);
    if(!N_tramites)
      throw new boom.notFound('Noticias tramites not found: ' + id);
    return N_tramites;
  }

}

module.exports = N_tramitesService;