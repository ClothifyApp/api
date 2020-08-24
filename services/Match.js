const Match = require('../schema/Match');
const GarmentService = require('./Garment');
const ReactionService = require('./Reaction');

exports.list = async (query) => Match.find(query);

exports.getOne = async (id) => Match.findById(id);

exports.create = async (firstUser, secondUser, garments) => {
  const create = {
    firstUser,
    secondUser,
    garments,
  };

  const newMatch = await Match.create(create);
  return newMatch;
};

exports.update = async (id, firstUser, secondUser, garments) => {
  const update = {
    firstUser,
    secondUser,
    garments,
  };

  const updateMatch = await Match.update({ _id: id }, update);
  return updateMatch.nModified;
};

exports.delete = async (id) => {
  const deleteMatch = await Match.deleteOne({ _id: id });
  return deleteMatch.deletedCount;
};

exports.validateMatch = async (userReact, garmentId) => {
  // Get the owner of the garment
  const owner = await GarmentService.getGarmentUser(garmentId);

  // Search if the two users have one match
  const posibleMatch = await Match.findOne({
    $or: [{ firstUser: userReact }, { firstUser: owner.userId },
      { secondUser: userReact }, { secondUser: owner.userId }],
  });

  // If exists a match, Add to this the new garment
  if (posibleMatch) {
    // TO DO update de match
    posibleMatch.garments.push(garmentId);
    await this.update(
      posibleMatch._id, posibleMatch.firstUser, posibleMatch.secondUser, posibleMatch.garments,
    );
    return true;
  }

  // Get reactions of owner user where he reacts o garments of the userReac
  const reactionsToMatch = await ReactionService.getReactionMatch(owner.userId, userReact);

  if (reactionsToMatch.length) {
    const garments = [garmentId];

    await reactionsToMatch.forEach((reaction) => {
      garments.push(reaction.garmentId._id);
    });

    await this.create(userReact, owner.userId, garments)

    return true;
  }

  return false;
};
