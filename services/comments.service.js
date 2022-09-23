const faker = require('faker');

const boom = require('@hapi/boom');

class CommentsService{

  constructor(){
    this.comments = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let index = 0; index <limit; index++) {
     this.comments.push({
        commentId: faker.datatype.uuid(),
        author: faker.internet.url(),
        post: faker.internet.url(),
        content: faker.lorem.paragraph(3),
        publication_date: faker.date.between("2010-01-01T00:00:00.000Z", "2025-01-01T00:00:00.000Z"),
        modification_date: faker.date.between("2010-01-01T00:00:00.000Z", "2025-01-01T00:00:00.000Z"),
        isActive: faker.datatype.boolean()
     });

    }
  }

  create(data){
    const newComments = {
      commentId: faker.datatype.uuid(),
      ...data //MEZCLAR EL ID CON TODO LO DE DATA
    }
    this.comments.push(newComments);
    return newComments;
  }

  update(id, changes){
    //const nId = parseInt(id);
    const index = this.comments.findIndex((item) => item.commentId === id);
    if(index === -1)
      throw new boom.notFound('Comment not found: ' + id);

    var currentComments = this.comments[index];
    this.comments[index] = {
      ...currentComments,
      ...changes,
    };
    return {
      old: currentComments,
      changed: this.comments[index]
    }
  }

   delete(id){
    //const nId = parseInt(id);
    const index = this.comments.findIndex((item) => item.commentId === id);
    if(index === -1)
      throw new boom.notFound('Comment not found: ' + id);

    var currentComments = this.comments[index];
    this.comments.splice(index, 1);

    return currentComments;

  }

  getAll(size){
    const comments = this.comments.filter((item, index) => item && index < size);
    if(!comments)
      throw boom.notFound('Collection doesn´t exists');
    else if(comments.length <= 0)
      throw boom.notFound('There are no comments registered');

    return comments;
  }

  getById(id){
    //const nId = parseInt(id);
    const Comments = this.comments.find((item) => item && item.commentId === id);
    if(!Comments)
      throw new boom.notFound('Comment not found: ' + id);
    return Comments;
  }

}

module.exports = CommentsService;
