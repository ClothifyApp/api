const User = require('../schema/User');
const Match = require('../schema/Match');
const Garment = require('../schema/Garment');
const Reaction = require('../schema/Reaction');

// Get all users
exports.list = async (query) => User.find(query);

// Get one user by id
exports.getOne = async (id) => User.findById(id);

// Get user by uid
exports.getByUid = async (uid) => User.findOne({ uuid: uid });

// Create one User
exports.create = async (phone, uuid) => {
  const user = {
    phone,
    uuid,
  };

  const newUser = await User.create(user);
  return newUser;
};

// Update one User by id
exports.update = async (id, fullName, photoUrl, country, preferences, gender) => {
  const update = {
    fullName,
    photoUrl: photoUrl || '',
    country,
    preferences: preferences || [],
    gender,
  };

  const updatedUser = await User.updateOne({ _id: id }, update);
  return updatedUser.nModified;
};

// Delete one user by id
exports.delete = async (id) => {
  const deletedUser = await User.deleteOne({ _id: id });
  await Garment.deleteMany({ userId: id });
  await Match.deleteMany({
    $or: [{ firstUser: id }, { secondUser: id }],
  });
  await Reaction.deleteMany({ userId: id });

  return deletedUser.deletedCount;
};
