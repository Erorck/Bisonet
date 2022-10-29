const faker = require('faker');

const boom = require('@hapi/boom');

class N_comunicadosService{

  constructor(){
    this.N_comunicados = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let index = 0; index <limit; index++) {
     this.N_comunicados.push({
        uuid : faker.datatype.uuid(),
        texto : faker.lorem.text(),
        fecha : faker.date.past(),
        active : faker.datatype.boolean()
     });

    }
  }

  create(data){
    const newN_comunicados = {
      uuid: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.N_comunicados.push(newN_comunicados);
    return newN_comunicados;
  }

  update(id, changes){
    //const nId = parseInt(id);
    const index = this.N_comunicados.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Noticias comunicado not found: ' + id);

    var currentN_comunicados = this.N_comunicados[index];
    this.N_comunicados[index] = {
      ...currentN_comunicados,
      ...changes,
    };
    return {
      old: currentN_comunicados,
      changed: this.N_comunicados[index]
    }
  }

   delete(id){
    //const nId = parseInt(id);
    const index = this.N_comunicados.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Noticias comunicado not found: ' + id);

    var currentN_comunicados = this.N_comunicados[index];
    this.N_comunicados.splice(index, 1);

    return currentN_comunicados;

  }

  getAll(size){
    const N_comunicados = this.N_comunicados.filter((item, index) => item && index < size);
    if(!N_comunicados)
      throw boom.notFound('Collection doesn´t exists');
    else if(N_comunicados.length <= 0)
      throw boom.notFound('There are no Noticias comunicado registered');

    return N_comunicados;
  }

  getById(id){
    //const nId = parseInt(id);
    const N_comunicados = this.N_comunicados.find((item) => item && item.uuid === id);
    if(!N_comunicados)
      throw new boom.notFound('Noticias comunicado not found: ' + id);
    return N_comunicados;
  }

}

module.exports = N_comunicadosService;