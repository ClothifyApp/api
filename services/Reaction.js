const Reaction = require('../schema/Reaction');

// Get all reactions
exports.list = async (query) => Reaction.find(query);

// Get one reaction by id
exports.getOne = async (id) => Reaction.findById(id);

// Get latest reaction type by user
exports.getLatestReaction = async (id,type) => Reaction.findOne({'userId':id,'type':type},{},{ sort: { created_at: -1 }});

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
