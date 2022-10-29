const faker = require('faker');

const boom = require('@hapi/boom');

class N_convocatoriasService{

  constructor(){
    this.N_convocatoria = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let index = 0; index <limit; index++) {
     this.N_convocatoria.push({
        uuid : faker.datatype.uuid(),
        texto : faker.lorem.text(),
        fecha : faker.date.past(),
        active : faker.datatype.boolean()
     });

    }
  }

  create(data){
    const newN_convocatoria = {
      uuid: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.N_convocatoria.push(newN_convocatoria);
    return newN_convocatoria;
  }

  update(id, changes){
    //const nId = parseInt(id);
    const index = this.N_convocatoria.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Noticias convocatorias not found: ' + id);

    var currentN_convocatoria = this.N_convocatoria[index];
    this.N_convocatoria[index] = {
      ...currentN_convocatoria,
      ...changes,
    };
    return {
      old: currentN_convocatoria,
      changed: this.N_convocatoria[index]
    }
  }

   delete(id){
    //const nId = parseInt(id);
    const index = this.N_convocatoria.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Noticias convocatorias not found: ' + id);

    var currentN_convocatoria = this.N_convocatoria[index];
    this.N_convocatoria.splice(index, 1);

    return currentN_convocatoria;

  }

  getAll(size){
    const N_convocatoria = this.N_convocatoria.filter((item, index) => item && index < size);
    if(!N_convocatoria)
      throw boom.notFound('Collection doesn´t exists');
    else if(N_convocatoria.length <= 0)
      throw boom.notFound('There are no Noticias convocatorias registered');

    return N_convocatoria;
  }

  getById(id){
    //const nId = parseInt(id);
    const N_convocatoria = this.N_convocatoria.find((item) => item && item.uuid === id);
    if(!N_convocatoria)
      throw new boom.notFound('Noticias convocatorias not found: ' + id);
    return N_convocatoria;
  }

}

module.exports = N_convocatoriasService;