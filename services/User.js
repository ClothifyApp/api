const User = require('../schema/User');

// Get all users
exports.list = async (query) => {
  return await User.find(query);
}

// Get one user by id
exports.getOne = async (id) => {
  return await User.findById(id);
}

// Get user by uid
exports.getByUid = async (uid) => {
  return await User.findOne({ 'uuid' : uid } );
}

// Create one User
exports.create =  async (phone, uuid) => {
  const user = {
    phone,
    uuid
  }

  const newUser = await User.create(user);
  return newUser;
}

// Update one User by id
exports.update =  async (id, fullName, photoUrl, country, preferences) => {

  const update = {
    fullName, 
    photoUrl: photoUrl ? photoUrl : '', 
    country, 
    preferences: preferences ? preferences : []
  }

  const updatedUser = await User.updateOne({ '_id': id}, update);
  return updatedUser.nModified;
}

// Delete one user by id
exports.delete =  async (id) => {
  const deletedUser = await User.deleteOne({'_id': id});
  return  deletedUser.deletedCount;
}
