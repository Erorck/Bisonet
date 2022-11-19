const faker = require('faker');
const boom = require('@hapi/boom');
const SectionsModel = require('../models/sections.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_SECTION_REGISTERED_MSG = 'There are no sections registered';
const SECTION_NOT_FOUND_MSG = 'Section not found: ';

class sectionService {
  constructor() {
    this.sections = [];
    //this.generate();
  }

  //DB METHODS

  //CREATE DB SECTION
  async create(data) {
    const existsSection = await SectionsModel.findOne({
      nombre: data.nombre,
    });

    if (existsSection) {
      throw boom.unauthorized('There is already a section with that name');
    }

    const newSection = new SectionsModel(data);
    await newSection.save();
    return data;
  }

  async update(sectionId, changes) {
    let section = await SectionsModel.findOne({
      _id: sectionId,
    });

    if (section == undefined || section == null)
      throw new boom.notFound(SECTION_NOT_FOUND_MSG + sectionId);

    const { nombre } = changes;

    if (nombre != null && nombre != undefined) {
      const existsName = await SectionsModel.findOne({
        institutional_email: nombre,
      });

      if (existsName && existsName._id != sectionId) {
        throw boom.unauthorized('There is already a section with that name');
      }
    }

    let oldSection = {
      nombre: section.nombre,
      isActive: section.isActive,
    };

    const { isActive } = changes;
    section.nombre = nombre || section.nombre;

    section.isActive = isActive === undefined ? photos.isActive : isActive;
    section.save();

    return {
      old: oldSection,
      changed: section,
    };
  }

  //DELETE DB SECTION
  async delete(sectionId) {
    let section = await SectionsModel.findOne({
      _id: sectionId,
    });

    const { deletedCount } = await SectionsModel.deleteOne({
      _id: sectionId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(NOT_FOUND_COLL_MSG + sectionId);

    return section;
  }

  //GET ALL DB SECTIONS
  async getAll(limit, filter) {
    let section = await SectionsModel.find(filter);

    if (!section) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (section.length <= 0)
      throw boom.notFound(NO_SECTION_REGISTERED_MSG);

    section = limit
      ? section.filter((item, index) => item && index < limit)
      : section;

    return section;
  }

  //GET COURSE DB BY ID
  async getById(sectionId) {
    let section = await SectionsModel.findOne({
      _id: sectionId,
    });

    if (section == undefined || section == null)
      throw new boom.notFound(SECTION_NOT_FOUND_MSG + sectionId);

    return section;
  }
}

module.exports = sectionService;
