const Match = require('../schema/Match');
const GarmentService = require('./Garment');
const ReactionService = require('./Reaction');
const UserService = require('./User');

exports.list = async (query) => Match.find(query);

exports.getOne = async (id) => Match.findById(id);

exports.getUserMatches = async (userId) => {
  const query = {
    $or: [{ firstUser: userId },
      { secondUser: userId }],
  };

  const matches = await Match.find(query)
    .populate({
      path: 'firstUser',
      select: 'fullName photoUrl country phone',
    })
    .populate({
      path: 'secondUser',
      select: 'fullName photoUrl country phone',
    })
    .populate('garments')
    .exec();

  return matches;
};

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
    $and: [
      { $or: [{ firstUser: userReact }, { firstUser: owner.userId }] },
      // eslint-disable-next-line no-dupe-keys
      { $or: [{ secondUser: userReact }, { secondUser: owner.userId }] },
    ],
  });

  // If exists a match, Add to this the new garment
  if (posibleMatch) {
    posibleMatch.garments.push(garmentId);
    await this.update(
      posibleMatch._id, posibleMatch.firstUser, posibleMatch.secondUser, posibleMatch.garments,
    );
    const firstUser = await UserService.getOne(posibleMatch.firstUser);
    const secondUser = await UserService.getOne(posibleMatch.secondUser);
    return {
      firstUser,
      secondUser,
      matchR: posibleMatch,
    };
  }

  // Get reactions of owner user where he reacts o garments of the userReac
  const reactionsToMatch = await ReactionService.getReactionMatch(owner.userId, userReact);

  if (reactionsToMatch.length) {
    const garments = [garmentId];

    await reactionsToMatch.forEach((reaction) => {
      garments.push(reaction.garmentId._id);
    });

    const match = await this.create(userReact, owner.userId, garments);

    const firstUser = await UserService.getOne(userReact);
    const secondUser = await UserService.getOne(owner.userId);
    return {
      firstUser,
      secondUser,
      matchR: match,
    };
  }

  return false;
};
