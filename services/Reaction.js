const Reaction = require('../schema/Reaction');
const GarmentService = require('./Garment');
const UserService = require('./User');

// Get all reactions
exports.list = async (query, fields = {}) => Reaction.find(query, fields);

// Get reactions by user
exports.getReactionMatch = async (userId, userReact) => {
  let posible = await Reaction.find(
    {
      userId,
      type: { $ne: 'dislike' },
    },
  ).populate({
    path: 'garmentId',
    match: { userId: userReact },
    select: '_id',
  }).exec();

  posible = posible.filter((ele) => ele.garmentId);

  return posible;
};

// Get one reaction by id
exports.getOne = async (id) => Reaction.findById(id);

// Get latest reaction type by user
exports.getLatestReaction = async (id, type) => Reaction.findOne(
  // eslint-disable-next-line quote-props
  { 'userId': id, 'type': type }, {}, { sort: { created_at: -1 } },
);

// Create one reaction
exports.create = async (userId, type, garmentId) => {
  const reaction = {
    userId,
    type,
    garmentId,
  };

  const newReaction = await Reaction.create(reaction);
  return newReaction;
};

// Update one reaction by id
exports.update = async (id, userId, type, garmentId) => {
  const update = {
    userId,
    type,
    garmentId,
  };

  const updatedReaction = await Reaction.updateOne({ _id: id }, update);
  return updatedReaction.nModified;
};

// Delete one reaction by id
exports.delete = async (id) => {
  const deleteReaction = await Reaction.deleteOne({ _id: id });
  return deleteReaction.deletedCount;
};

exports.notifySuper = async (userReact, garmentId) => {
  const owner = await GarmentService.getGarmentUser(garmentId);
  const userReactO = await UserService.getOne(userReact);
  const garment = await GarmentService.getOne(garmentId);

  return {
    owner: owner.userId,
    nameUser: userReactO.fullName,
    garment,
  };
};
