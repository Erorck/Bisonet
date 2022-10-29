const faker = require('faker');
const boom = require('@hapi/boom');
const PostModel = require('../models/posts.model');

const NOT_FOUND_COLL_MSG = 'Collection doesn\'t exists';
const NO_POST_REGISTERED_MSG = 'There are no post registered';
const POST_NOT_FOUND_MSG = 'Post not found: ';

class postService{

  constructor(){
    this.post = [];
    //this.generate();
  }

//DB METHODS-----------------------------------------

async create(data){
  const newPost = new PostModel(data);
  await newPost.save();
  return data;
}

async update(PostId, changes){
  let Post = await PostModel.findOne({
    _id: PostId
  });

  if(Post == undefined || Post == null)
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

  const {Autor, Seccion, Type, Group, Title, Content, Fecha_Publicacion, Fecha_Modificacion, Likes, isActive} = changes;
  Post.Autor = Autor || Post.Autor;
  Post.Seccion = Seccion || Post.Seccion;
  Post.Type = Type || Post.Type;
  Post.Group = Group || Post.Group;
  Post.Title = Title || Post.Title;
  Post.Content = Content || Post.Content;
  Post.Fecha_Publicacion = Fecha_Publicacion || Post.Fecha_Publicacion;
  Post.Fecha_Modificacion = Fecha_Modificacion || Post.Fecha_Modificacion;
  Post.Likes = Likes || Post.Likes;

  Post.isActive = isActive || Post.isActive;
  Post.save();

  return {
    old: oldPost,
    changed: Post
  }
}

async delete(postId){

  let Post = await PostModel.findOne({
    _id: postId
  });

  const {deletedCount} = await PostModel.deleteOne({
    _id: postId
  })

  if(deletedCount <= 0)
    throw new boom.notFound(NOT_FOUND_COLL_MSG + postId);

  return Post;

}

async getAll(limit, filter){
  let Post = await PostModel.find(filter);

  if(!Post)
    throw boom.notFound(NOT_FOUND_COLL_MSG);
  else if(Post.length <= 0)
    throw boom.notFound(NO_POST_REGISTERED_MSG);

    Post = limit ? Post.filter((item, index) => item && index < limit) : Post;

  return Post;
}

async getById(postId){
  let Post = await PostModel.findOne({
    _id: postId
  });

  if(Post == undefined || Post == null)
    throw new boom.notFound(POST_NOT_FOUND_MSG + postId);

  return Post;
}


//FAKER METHODS----------------------------------------
Fakergenerate(){
    const limit = 10;
    for (let index = 0; index <limit; index++) {
     this.post.push({
        postId : faker.datatype.uuid(),
        autor : faker.datatype.uuid(),
        section : faker.datatype.uuid(),
        post_type: faker.name.jobArea(),
        title : faker.lorem.sentence(),
        content : faker.lorem.text(),
        publication_date : faker.date.past(),
        modification_date : faker.date.past(),
        active : faker.datatype.boolean()
     });

    }
  }

  Fakercreate(data){
    const newpost = {
      postId: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.post.push(newpost);
    return newpost;
  }

  Fakerupdate(id, changes){
    //const nId = parseInt(id);
    const index = this.post.findIndex((item) => item.postId === id);
    if(index === -1)
      throw new boom.notFound('post not found: ' + id);

    var currentpost = this.post[index];
    this.post[index] = {
      ...currentpost,
      ...changes,
    };
    return {
      old: currentpost,
      changed: this.post[index]
    }
  }

  Fakerdelete(id){
    //const nId = parseInt(id);
    const index = this.post.findIndex((item) => item.postId === id);
    if(index === -1)
      throw new boom.notFound('post not found: ' + id);

    var currentpost = this.post[index];
    this.post.splice(index, 1);

    return currentpost;

  }

  FakergetAll(size){
    const post = this.post.filter((item, index) => item && index < size);
    if(!post)
      throw boom.notFound('post doesn´t exists');
    else if(post.length <= 0)
      throw boom.notFound('There are no post registered');

    return post;
  }

  FakergetById(id){
    //const nId = parseInt(id);
    const post = this.post.find((item) => item && item.postId === id);
    if(!post)
      throw new boom.notFound('post not found: ' + id);
    return post;
  }

}

module.exports = postService;
