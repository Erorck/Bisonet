const faker = require('faker');

const boom = require('@hapi/boom');

class E_culturalesService{

  constructor(){
    this.E_culturales = [];
    this.generate();
  }

  generate(){
    const size = 10;
    for (let index = 0; index < size; index++) {
      this.E_culturales.push({
        uuid : faker.datatype.uuid(),
        texto : faker.lorem.text(),
        fecha : faker.date.past(),
        active : faker.datatype.boolean()
        });
    }
  }

  create(data){
    const newE_culturales = {
        uuid: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.E_culturales.push(newE_culturales);
    return newE_culturales;
  }

  update(id, changes){
    //const nId = parseInt(id);
    const index = this.E_culturales.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Eventos Culturales not found: ' + id);

    var currentE_culturales = this.E_culturales[index];
    this.E_culturales[index] = {
      ...currentE_culturales,
      ...changes,
    };
    return {
      old: currentE_culturales,
      changed: this.E_culturales[index]
    }
  }

   delete(id){
    //const nId = parseInt(id);
    const index = this.E_culturales.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Eventos Culturales not found: ' + id);

    var currentE_culturales = this.E_culturales[index];
    this.E_culturales.splice(index, 1);

    return currentE_culturales;

  }

  getAll(size){
    const E_culturales = this.E_culturales.filter((item, index) => item && index < size);
    if(!E_culturales)
      throw boom.notFound('Collection doesn´t exists');
    else if(E_culturales.length <= 0)
      throw boom.notFound('There are no comments registered');

    return E_culturales;
  }

  getById(id){
    //const nId = parseInt(id);
    const E_culturales = this.E_culturales.find((item) => item && item.uuid === id);
    if(!E_culturales)
      throw new boom.notFound('Eventos Culturales not found: ' + id);
    return E_culturales;
  }

}

module.exports = E_culturalesService;