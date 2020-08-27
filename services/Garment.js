const Garment = require('../schema/Garment');

// Get all garment
exports.list = async (query) => {
  const garments = await Garment.find(query)
    .populate({
      path: 'userId',
      select: 'fullName photoUrl country phone',
    }).exec();

  return garments;
};

// Get one garment
exports.getOne = async (id) => Garment.findById(id);

exports.getGarmentUser = async (id) => Garment.findOne({ _id: id }, { _id: 0, userId: 1 });

// Create one garment
exports.create = async (name, description, photos, tags, userId) => {
  const garment = {
    name,
    description,
    photos,
    tags,
    userId,
  };

  const newGarment = await Garment.create(garment);
  return newGarment;
};

// Update one garment
exports.update = async (id, name, description, photos, tags) => {
  const update = {
    name,
    description,
    photos,
    tags,
  };

  const updateGarment = await Garment.updateOne({ _id: id }, update);
  return updateGarment.nModified;
};

// Delete one garment by id
exports.delete = async (id) => {
  const deleteGarment = await Garment.deleteOne({ _id: id });
  return deleteGarment.deletedCount;
};
