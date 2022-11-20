const faker = require('faker');
const boom = require('@hapi/boom');
const PostModel = require('../models/posts.model');
const SectionsModel = require('../models/sections.model');
const GroupModel = require('../models/groups.model');
const TiposPostModel = require('../models/tipos_post.model');
const UserModel = require('../models/users.model');

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
    const { Autor, Seccion, Type, Group } = data;

    if (Group == undefined && (Seccion == undefined || Type == undefined)) {
      throw boom.notFound('Must select a Group or a Section with a Post type');
    }

    //Validar que si exista el usuario que quiere crear el post
    const postAuthor = await UserModel.findOne({
      _id: Autor,
    });

    if (!postAuthor) {
      throw boom.notFound('User doesnt exists');
    }

    //Validar que exista el grupo en la que se quiere crear el post
    if (Group != undefined) {
      const groupPost = await GroupModel.findOne({
        _id: Group,
      });

      if (!groupPost) {
        throw boom.notFound('Group doesnt exists');
      }

      data.Seccion = undefined;
      data.Type = undefined;
    } else {
      //Validar que exista el tipo de post
      const typePost = await TiposPostModel.findOne({
        _id: Type,
      });

      if (!typePost) {
        throw boom.notFound('Post type doesnt exists');
      }

      //Validar que exista la sección en la que se quiere crear el post
      const sectionPost = await SectionsModel.findOne({
        _id: Seccion,
      });

      if (!sectionPost) {
        throw boom.notFound('Section doesnt exists');
      }

      data.Group = undefined;
    }

    const newPost = await PostModel.create(data);
    if (Group != undefined) {
      const groupPost = await GroupModel.findOne({
        _id: Group,
      });

      if (groupPost) {
        groupPost.posts.push(newPost._id);
        groupPost.save();
      }
    }

    return newPost;
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

    const { Title, Content, Likes, isActive } = changes;

    Post.Title = Title || Post.Title;
    Post.Content = Content || Post.Content;

    let mod_date = new Date();
    Post.Fecha_Modificacion = mod_date;
    console.log(mod_date.toLocaleString());

    Post.Likes = isActive === undefined ? Post.Likes : Likes;

    Post.isActive = isActive === undefined ? Post.isActive : isActive;
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

    if (Post.Group != undefined) {
      const postGroup = await GroupModel.findOne({
        _id: Post.Group,
      });

      postGroup.posts.remove(Post._id);
      postGroup.save();
    }

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
