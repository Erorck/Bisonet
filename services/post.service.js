const faker = require('faker');

const boom = require('@hapi/boom');

class postService{

  constructor(){
    this.post = [];
    this.generate();
  }

  generate(){
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

  create(data){
    const newpost = {
      postId: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.post.push(newpost);
    return newpost;
  }

  update(id, changes){
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

   delete(id){
    //const nId = parseInt(id);
    const index = this.post.findIndex((item) => item.postId === id);
    if(index === -1)
      throw new boom.notFound('post not found: ' + id);

    var currentpost = this.post[index];
    this.post.splice(index, 1);

    return currentpost;

  }

  getAll(size){
    const post = this.post.filter((item, index) => item && index < size);
    if(!post)
      throw boom.notFound('post doesn´t exists');
    else if(post.length <= 0)
      throw boom.notFound('There are no post registered');

    return post;
  }

  getById(id){
    //const nId = parseInt(id);
    const post = this.post.find((item) => item && item.postId === id);
    if(!post)
      throw new boom.notFound('post not found: ' + id);
    return post;
  }

}

module.exports = postService;
