const ReactionModel = require('../models/reactions.model');
const PostModel = require('../models/posts.model');
const UserModel = require('../models/users.model');
const boom = require('@hapi/boom');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_REACTIONS_REGISTERED_MSG = 'There are no reactions registered';
const REACTION_NOT_FOUND_MSG = 'Reaction not found: ';

class CommentsService {
  constructor() {
    this.reactions = [];
    //this.generate_Faker();
  }

  //-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB REACTION
  async create(data) {
    const { user, post } = data;

    const existsReaction = await ReactionModel.findOne({
      user: user,
      post: post,
    });

    if (existsReaction) {
      throw boom.notFound(
        'There already exists a reaction for this user on this post'
      );
    }

    //Validar que si exista el post al que se busca reaccionar
    const reactionPost = await PostModel.findOne({
      _id: post,
    });

    if (!reactionPost) {
      throw boom.notFound('Post doesnt exists');
    }

    //Validar que si exista el usuario que busca reaccionar
    const reactionUser = await UserModel.findOne({
      _id: user,
    });

    if (!reactionUser) {
      throw boom.notFound('User doesnt exists');
    }

    reactionPost.Likes = reactionPost.Likes + 1;
    reactionPost.save();

    const newReaction = await ReactionModel.create(data);
    return newReaction;
  }

  //UPDATE DB REACTION
  async update(reactionId, changes) {
    let reaction = await ReactionModel.findOne({
      _id: reactionId,
    });

    if (reaction == undefined || reaction == null)
      throw new boom.notFound(REACTION_NOT_FOUND_MSG + reactionId);

    //Validar que si exista el post al que se busca reaccionar
    const reactionPost = await PostModel.findOne({
      _id: reaction.post,
    });

    if (!reactionPost) {
      throw boom.notFound('Post doesnt exists');
    }

    //Validar que si exista el usuario que busca reaccionar
    const reactionUser = await UserModel.findOne({
      _id: reaction.user,
    });

    if (!reactionUser) {
      throw boom.notFound('User doesnt exists');
    }

    let oldReaction = {
      user: reaction.user,
      post: reaction.post,
      liked: reaction.liked,
    };

    const { liked } = changes;

    let mod_date = new Date();
    reaction.modification_date = mod_date;
    console.log(mod_date.toLocaleString());

    let increment = 0;

    if (liked == undefined || liked == reaction.liked) increment = 0;
    else if (liked === true) increment = 1;
    else increment = -1;

    reaction.liked = liked === undefined ? reaction.liked : liked;
    reaction.save();

    reactionPost.Likes = reactionPost.Likes + increment;

    reactionPost.save();

    return {
      old: oldReaction,
      changed: reaction,
    };
  }

  //DELETE DB REACTION
  async delete(reactionId) {
    let reaction = await ReactionModel.findOne({
      _id: reactionId,
    });

    const { deletedCount } = await ReactionModel.deleteOne({
      _id: reactionId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(REACTION_NOT_FOUND_MSG + reactionId);

    return reaction;
  }

  //GET ALL DB REACTIONS
  async getAll(limit, filter) {
    let reactions = await ReactionModel.find(filter);

    if (!reactions) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (reactions.length <= 0)
      throw boom.notFound(NO_REACTIONS_REGISTERED_MSG);

    reactions = limit
      ? reactions.filter((item, index) => item && index < limit)
      : reactions;

    return reactions;
  }

  //GET DB REACTION BY ID
  async getById(reactionId) {
    let reaction = await ReactionModel.findOne({
      _id: reactionId,
    });

    if (reaction == undefined || reaction == null)
      throw new boom.notFound(REACTION_NOT_FOUND_MSG + reactionId);

    console.log(reaction.modification_date);
    console.log(reaction.modification_date.toLocaleString());

    return reaction;
  }
  //#endregion
}

module.exports = CommentsService;
