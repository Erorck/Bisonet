const faker = require('faker');
const boom = require('@hapi/boom');
const TiposPostModel = require('../models/tipos_post.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_TIPOS_POST_REGISTERED_MSG = 'There are no post types registered';
const TIPOS_POST_NOT_FOUND_MSG = 'Post type not found: ';

class TiposPostService {
  constructor() {
    this.tiposPost = [];
    //this.generate();
  }

  //DB METHODS-----------------------------------------

  async create(data) {
    const existsPostType = await TiposPostModel.findOne({
      nombre: data.nombre,
    });

    if (existsPostType) {
      throw boom.unauthorized('There is already a Post Type with that name');
    }

    const newTiposPost = await TiposPostModel.create(data);
    return newTiposPost;
  }

  async update(TiposPostId, changes) {
    let TiposPost = await TiposPostModel.findOne({
      _id: TiposPostId,
    });

    if (TiposPost == undefined || TiposPost == null)
      throw new boom.notFound(TIPOS_POST_NOT_FOUND_MSG + TiposPostId);

    const { nombre } = changes;

    if (nombre != null && nombre != undefined) {
      const existsName = await TiposPostModel.findOne({
        nombre: nombre,
      });

      if (existsName && existsName._id != TiposPostId) {
        throw boom.unauthorized('There is already a Post Type with that name');
      }
    }

    let oldTiposPost = {
      nombre: TiposPost.nombre,
      color: TiposPost.color,
    };

    const { color } = changes;
    TiposPost.nombre = nombre || TiposPost.nombre;
    TiposPost.color = color || TiposPost.color;

    TiposPost.save();

    return {
      old: oldTiposPost,
      changed: TiposPost,
    };
  }

  async delete(TiposPostId) {
    let TiposPost = await TiposPostModel.findOne({
      _id: TiposPostId,
    });

    const { deletedCount } = await TiposPostModel.deleteOne({
      _id: TiposPostId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(NOT_FOUND_COLL_MSG + TiposPost);

    return TiposPost;
  }

  async getAll(limit, filter) {
    let TiposPost = await TiposPostModel.find(filter);

    if (!TiposPost) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (TiposPost.length <= 0)
      throw boom.notFound(NO_TIPOS_POST_REGISTERED_MSG);

    TiposPost = limit
      ? TiposPost.filter((item, index) => item && index < limit)
      : TiposPost;

    return TiposPost;
  }

  async getById(TiposPostId) {
    let TiposPost = await TiposPostModel.findOne({
      _id: TiposPostId,
    });

    if (TiposPost == undefined || TiposPost == null)
      throw new boom.notFound(TIPOS_POST_NOT_FOUND_MSG + TiposPostId);

    return TiposPost;
  }
}

module.exports = TiposPostService;
