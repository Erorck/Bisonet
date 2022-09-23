const faker = require('faker');

const boom = require('@hapi/boom');

class sectionService{

  constructor(){
    this.sections = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let index = 0; index < limit; index++) {
        this.sections.push({
            uuid : faker.datatype.uuid(),
            seccion : faker.lorem.text(),
            orden : faker.datatype.number({'min' : 0, 'max' : 10}),
            active : faker.datatype.boolean()
        });
    }
  }

  create(data){
    const newSections = {
        uuid: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.sections.push(newSections);
    return newSections;
  }

  update(id, changes){
    //const nId = parseInt(id);
    const index = this.sections.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Section not found: ' + id);

    var currentSections = this.sections[index];
    this.sections[index] = {
      ...currentSections,
      ...changes,
    };
    return {
      old: currentSections,
      changed: this.sections[index]
    }
  }

   delete(id){
    //const nId = sections(id);
    const index = this.sections.findIndex((item) => item.uuid === id);
    if(index === -1)
      throw new boom.notFound('Section not found: ' + id);

    var currentSections = this.sections[index];
    this.sections.splice(index, 1);

    return currentSections;

  }

  getAll(size){
    const sections = this.sections.filter((item, index) => item && index < size);
    if(!sections)
      throw boom.notFound('Collection doesn´t exists');
    else if(sections.length <= 0)
      throw boom.notFound('There are no Section registered');

    return sections;
  }

  getById(id){
    //const nId = parseInt(id);
    const sections = this.sections.find((item) => item && item.uuid === id);
    if(!sections)
      throw new boom.notFound('Section not found: ' + id);
    return sections;
  }

}

module.exports = sectionService;