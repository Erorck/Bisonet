const faker = require('faker');
const boom = require('@hapi/boom');
const SectionsModel = require('../models/sections.model');

const NOT_FOUND_COLL_MSG = 'Collection doesn\'t exists';
const NO_SECTION_REGISTERED_MSG = 'There are no sections registered';
const SECTION_NOT_FOUND_MSG = 'Section not found: ';

class sectionService{

  constructor(){
    this.sections = [];
    //this.generate();
  }

//DB METHODS

//CREATE DB SECTION
async create(data){
  const newSection = new SectionsModel(data);
  await newSection.save();
  return data;
}

async update(sectionId, changes){
  let section = await SectionsModel.findOne({
    _id: sectionId
  });

  if(section == undefined || section == null)
    throw new boom.notFound(SECTION_NOT_FOUND_MSG + sectionId);

  let oldSection = {
      nombre: section.nombre,
      isActive: section.isActive,
  };

  const {nombre, isActive} = changes;
  section.nombre = nombre || section.nombre;

  section.isActive = isActive || section.isActive;
  section.save();

  return {
    old: oldSection,
    changed: section
  }
}

  //DELETE DB SECTION
async delete(sectionId){

    let section = await SectionsModel.findOne({
      _id: sectionId
    });

    const {deletedCount} = await SectionsModel.deleteOne({
      _id: sectionId
    })

    if(deletedCount <= 0)
      throw new boom.notFound(NOT_FOUND_COLL_MSG + sectionId);

    return section;

  }

   //GET ALL DB SECTIONS
   async getAll(limit, filter){
    let section = await SectionsModel.find(filter);

    if(!section)
      throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if(section.length <= 0)
      throw boom.notFound(NO_SECTION_REGISTERED_MSG);

      section = limit ? section.filter((item, index) => item && index < limit) : section;

    return section;
  }

//GET COURSE DB BY ID
async getById(sectionId){
  let section = await SectionsModel.findOne({
    _id: sectionId
  });

  if(section == undefined || section == null)
    throw new boom.notFound(SECTION_NOT_FOUND_MSG + sectionId);

  return section;
}


//FAKER METHODS--------------------
Fakergenerate(){
    const limit = 10;
    for (let index = 0; index < limit; index++) {
        this.sections.push({
            sectionId : faker.datatype.uuid(),
            sectionName : faker.name.jobArea(),
            order : faker.datatype.number({'min' : 0, 'max' : 10}),
            active : faker.datatype.boolean()
        });
    }
  }

  Fakercreate(data){
    const newSections = {
      sectionId: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.sections.push(newSections);
    return newSections;
  }

  Fakerupdate(id, changes){
    //const nId = parseInt(id);
    const index = this.sections.findIndex((item) => item.sectionId === id);
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

  Fakerdelete(id){
    //const nId = sections(id);
    const index = this.sections.findIndex((item) => item.sectionId === id);
    if(index === -1)
      throw new boom.notFound('Section not found: ' + id);

    var currentSections = this.sections[index];
    this.sections.splice(index, 1);

    return currentSections;

  }

  FakergetAll(size){
    const sections = this.sections.filter((item, index) => item && index < size);
    if(!sections)
      throw boom.notFound('Collection doesn´t exists');
    else if(sections.length <= 0)
      throw boom.notFound('There are no Section registered');

    return sections;
  }

  FakergetById(id){
    //const nId = parseInt(id);
    const sections = this.sections.find((item) => item && item.sectionId === id);
    if(!sections)
      throw new boom.notFound('Section not found: ' + id);
    return sections;
  }

}

module.exports = sectionService;
