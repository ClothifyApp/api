const User = require('../schema/User');

exports.list = async (query) => {
  return await User.find(query);
}

exports.getOne = async (id) => {
  return await User.findById(id);
}

exports.create =  async (phone, uuid) => {
  const user = {
    phone,
    uuid
  }

  const newUser = await User.create(user);
  return newUser;
}

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

exports.delete =  async (id) => {
  const deletedUser = await User.deleteOne({'_id': id});
  return deletedUser;
}
