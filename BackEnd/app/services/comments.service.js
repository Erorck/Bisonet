const PostModel = require('../models/posts.model');
const CommentModel = require('../models/comments.model');
const UserModel = require('../models/users.model');
const boom = require('@hapi/boom');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_COMMENTS_REGISTERED_MSG = 'There are no comments registered';
const COMMENT_NOT_FOUND_MSG = 'Comment not found: ';

class CommentsService {
  constructor() {
    this.comments = [];
  }

  //-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB COMMENT
  async create(data) {
    const { author, post } = data;

    //Validar que si exista el post en el que se busca comentar
    const commentPost = await PostModel.findOne({
      _id: post,
    });

    if (!commentPost) {
      throw boom.notFound('Post doesnt exists');
    }

    //Validar que si exista el usuario que busca comentar
    const commentAuthor = await UserModel.findOne({
      _id: author,
    });

    if (!commentAuthor) {
      throw boom.notFound('User doesnt exists');
    }

    const newComment = await CommentModel.create(data);

    const correctComment = await CommentModel.findOne({
      _id: newComment._id,
    });

    commentPost.Comments.push(correctComment);
    commentPost.save();

    return newComment;
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

    //Actualizamos los datos del comentario
    const { content, isActive } = changes;

    comment.content = content || comment.content;

    let mod_date = new Date();
    comment.modification_date = mod_date;
    console.log(mod_date.toLocaleString());

    comment.isActive = isActive === undefined ? comment.isActive : isActive;

    await comment.save();

    //Obtenemos el post del comentario
    const commentPost = await PostModel.findOne({
      _id: comment.post,
    });

    //Obtenemos el comentario desactualizado del post
    let prevComment = commentPost.Comments.find(
      (element) => element['_id'] == commentId
    );

    console.log(prevComment);
    commentPost.Comments.remove(prevComment); //Removemos el comentario desactualizado del post
    commentPost.Comments.push(comment); //Añadimos el comentario actualizado al post
    await commentPost.save();

    console.log(comment);

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

    //Validar que si exista el post en el que se busca comentar
    const commentPost = await PostModel.findOne({
      _id: comment.post,
    });

    console.log(commentPost.Comments);
    console.log(comment);
    commentPost.Comments.remove(comment);
    commentPost.save();

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
}

module.exports = CommentsService;
