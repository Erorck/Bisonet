const faker = require('faker');
const CommentModel = require('../models/comments.model');
const boom = require('@hapi/boom');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_COMMENTS_REGISTERED_MSG = 'There are no comments registered';
const COMMENT_NOT_FOUND_MSG = 'Group not found: ';

class CommentsService {
  constructor() {
    this.comments = [];
    //this.generate_Faker();
  }

  //-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB COMMENT
  async create(data) {
    const newComment = new CommentModel(data);
    await newComment.save();
    return data;
  }

  //UPDATE DB COMMENT
  async update(commentId, changes) {
    let comment = await CommentModel.findOne({
      _id: commentId,
    });

    if (comment == undefined || comment == null)
      throw new boom.notFound(COMMENT_NOT_FOUND_MSG + commentId);

    let oldComment = {
      author: comment.author,
      post: comment.post,
      content: comment.content,
      publication_date: comment.publication_date,
      modification_date: comment.modification_date,
      isActive: comment.isActive,
    };

    const { content, isActive } = changes;

    comment.content = content || comment.content;

    let mod_date = new Date();
    comment.modification_date = mod_date;
    console.log(mod_date.toLocaleString());

    comment.isActive = isActive || comment.isActive;
    comment.save();

    return {
      old: oldComment,
      changed: comment,
    };
  }

  //DELETE DB COMMENT
  async delete(commentId) {
    let comment = await CommentModel.findOne({
      _id: commentId,
    });

    const { deletedCount } = await CommentModel.deleteOne({
      _id: commentId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(COMMENT_NOT_FOUND_MSG + commentId);

    return comment;
  }

  //GET ALL DB COMMENTS
  async getAll(limit, filter) {
    let comments = await CommentModel.find(filter);

    if (!comments) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (comments.length <= 0)
      throw boom.notFound(NO_COMMENTS_REGISTERED_MSG);

    comments = limit
      ? comments.filter((item, index) => item && index < limit)
      : comments;

    return comments;
  }

  //GET DB COMMENT BY ID
  async getById(commentId) {
    let comment = await CommentModel.findOne({
      _id: commentId,
    });

    if (comment == undefined || comment == null)
      throw new boom.notFound(COMMENT_NOT_FOUND_MSG + commentId);

    console.log(comment.modification_date);
    console.log(comment.modification_date.toLocaleString());

    return comment;
  }
  //#endregion

  //-------------FAKER METHODS----------------//
  //#region FAKER METHODS
  generate_Faker() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.comments.push({
        commentId: faker.datatype.uuid(),
        author: faker.internet.url(),
        post: faker.internet.url(),
        content: faker.lorem.paragraph(3),
        publication_date: faker.date.between(
          '2010-01-01T00:00:00.000Z',
          '2025-01-01T00:00:00.000Z'
        ),
        modification_date: faker.date.between(
          '2010-01-01T00:00:00.000Z',
          '2025-01-01T00:00:00.000Z'
        ),
        isActive: faker.datatype.boolean(),
      });
    }
  }

  //CREATE FAKE COMMENT
  create_Faker(data) {
    const newComments = {
      commentId: faker.datatype.uuid(),
      ...data, //MEZCLAR EL ID CON TODO LO DE DATA
    };
    this.comments.push(newComments);
    return newComments;
  }

  //UPDATE FAKE COMMENT
  update_Faker(id, changes) {
    //const nId = parseInt(id);
    const index = this.comments.findIndex((item) => item.commentId === id);
    if (index === -1) throw new boom.notFound('Comment not found: ' + id);

    var currentComments = this.comments[index];
    this.comments[index] = {
      ...currentComments,
      ...changes,
    };
    return {
      old: currentComments,
      changed: this.comments[index],
    };
  }

  //DELETE FAKE COMMENT
  delete_Faker_Faker(id) {
    //const nId = parseInt(id);
    const index = this.comments.findIndex((item) => item.commentId === id);
    if (index === -1) throw new boom.notFound('Comment not found: ' + id);

    var currentComments = this.comments[index];
    this.comments.splice(index, 1);

    return currentComments;
  }

  //GET ALL FAKE COMMENTS
  getAll_Faker(size) {
    const comments = this.comments.filter(
      (item, index) => item && index < size
    );
    if (!comments) throw boom.notFound('Collection doesn´t exists');
    else if (comments.length <= 0)
      throw boom.notFound('There are no comments registered');

    return comments;
  }

  //GET FAKE COMMENT BY ID
  getById_Faker(id) {
    //const nId = parseInt(id);
    const Comments = this.comments.find(
      (item) => item && item.commentId === id
    );
    if (!Comments) throw new boom.notFound('Comment not found: ' + id);
    return Comments;
  }
  //#endregion
}

module.exports = CommentsService;
