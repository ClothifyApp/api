const Tag = require('../schema/Tag');

// Get all tags
exports.list = async (query) => Tag.find(query);

// Get one tag by id
exports.getOne = async (id) => Tag.findById(id);

// Create one tag
exports.create = async (name) => {
  const tag = {
    name,
  };

  const newTag = await Tag.create(tag);
  return newTag;
};

// Update one tag by id
exports.update = async (id, name) => {
  const update = {
    name,
  };

  const updatedTag = await Tag.updateOne({ _id: id }, update);
  return updatedTag.nModified;
};

// Delete one tag by id
exports.delete = async (id) => {
  const deleteTag = await Tag.deleteOne({ _id: id });
  return deleteTag.deletedCount;
};
