const faker = require('faker');
const boom = require('@hapi/boom');
const PostModel = require('../models/posts.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_POST_REGISTERED_MSG = 'There are no post registered';
const POST_NOT_FOUND_MSG = 'Post not found: ';

class postService {
  constructor() {
    this.post = [];
    //this.generate();
  }

  //DB METHODS-----------------------------------------

  async create(data) {
    const newPost = new PostModel(data);
    await newPost.save();
    return data;
  }

  async update(PostId, changes) {
    let Post = await PostModel.findOne({
      _id: PostId,
    });

    if (Post == undefined || Post == null)
      throw new boom.notFound(POST_NOT_FOUND_MSG + PostId);

    let oldPost = {
      Autor: Post.Autor,
      Seccion: Post.Seccion,
      Type: Post.Type,
      Group: Post.Group,
      Title: Post.Title,
      Content: Post.Content,
      Fecha_Publicacion: Post.Fecha_Publicacion,
      Fecha_Modificacion: Post.Fecha_Modificacion,
      Likes: Post.Likes,
      isActive: Post.isActive,
    };

    const {
      Autor,
      Seccion,
      Type,
      Group,
      Title,
      Content,
      Fecha_Publicacion,
      Fecha_Modificacion,
      Likes,
      isActive,
    } = changes;
    Post.Autor = Autor || Post.Autor;
    Post.Seccion = Seccion || Post.Seccion;
    Post.Type = Type || Post.Type;
    Post.Group = Group || Post.Group;
    Post.Title = Title || Post.Title;
    Post.Content = Content || Post.Content;
    Post.Fecha_Publicacion = Fecha_Publicacion || Post.Fecha_Publicacion;
    Post.Fecha_Modificacion = Fecha_Modificacion || Post.Fecha_Modificacion;
    Post.Likes = isActive === undefined ? Post.Likes : Likes;

    Post.isActive = isActive === undefined ? photos.isActive : isActive;
    Post.save();

    return {
      old: oldPost,
      changed: Post,
    };
  }

  async delete(postId) {
    let Post = await PostModel.findOne({
      _id: postId,
    });

    const { deletedCount } = await PostModel.deleteOne({
      _id: postId,
    });

    if (deletedCount <= 0) throw new boom.notFound(NOT_FOUND_COLL_MSG + postId);

    return Post;
  }

  async getAll(limit, filter) {
    let Post = await PostModel.find(filter);

    if (!Post) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (Post.length <= 0) throw boom.notFound(NO_POST_REGISTERED_MSG);

    Post = limit ? Post.filter((item, index) => item && index < limit) : Post;

    return Post;
  }

  async getById(postId) {
    let Post = await PostModel.findOne({
      _id: postId,
    });

    if (Post == undefined || Post == null)
      throw new boom.notFound(POST_NOT_FOUND_MSG + postId);

    return Post;
  }
}

module.exports = postService;
