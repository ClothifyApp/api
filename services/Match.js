const Match = require('../schema/Match');

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
