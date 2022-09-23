const faker = require('faker');

const boom = require('@hapi/boom');

class E_deportivosService{

  constructor(){
    this.E_deportivos = [];
    this.generate();
  }

  generate(){
    const size = 10;
    for (let index = 0; index < size; index++) {
      this.E_deportivos.push({
        uuid : faker.datatype.uuid(),
        texto : faker.lorem.text(),
        fecha : faker.date.past(),
        active : faker.datatype.boolean()
        });
    }
  }

  create(data){
    const newE_deportivos = {
      uuid: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.E_deportivos.push(newE_deportivos);
    return newE_deportivos;
  }

  update(id, changes){
    //const nId = parseInt(id);
    const index = this.E_deportivos.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Eventos Deportivos not found: ' + id);

    var currentE_deportivos = this.E_deportivos[index];
    this.E_deportivos[index] = {
      ...currentE_deportivos,
      ...changes,
    };
    return {
      old: currentE_deportivos,
      changed: this.E_deportivos[index]
    }
  }

   delete(id){
    //const nId = parseInt(id);
    const index = this.E_deportivos.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Eventos Deportivos not found: ' + id);

    var currentE_deportivos = this.E_deportivos[index];
    this.E_deportivos.splice(index, 1);

    return currentE_deportivos;

  }

  getAll(size){
    const E_deportivos = this.E_deportivos.filter((item, index) => item && index < size);
    if(!E_deportivos)
      throw boom.notFound('Collection doesn´t exists');
    else if(E_deportivos.length <= 0)
      throw boom.notFound('There are no comments registered');

    return E_deportivos;
  }

  getById(id){
    //const nId = parseInt(id);
    const E_deportivos = this.E_deportivos.find((item) => item && item.uuid === id);
    if(!E_deportivos)
      throw new boom.notFound('Eventos Deportivos not found: ' + id);
    return E_deportivos;
  }

}

module.exports = E_deportivosService;