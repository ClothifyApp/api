const tagService = require('../services/Tag');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

// Get all tags
exports.list = async (req, res) => {
  try {
    const tags = await tagService.list({})

    return okResponse(res, 200, { tags });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Get one tag by id
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const tag = await tagService.getOne(id);

    return okResponse(res, 200, { tag });
  } catch (err) {
    console.log('exports.getOne -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Create tag
exports.create = async (req, res) => {
  const { name } = req.body;

  if (!name ) {
    return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
  }

  try {
    const tag = await tagService.create(name);

    return okResponse(
      res,
      201,
      { tag },
      'Tag creado correctamente'
    );
  } catch (err) {
    console.log('exports.create -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update tag
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id, !name ) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const updatedTag = await tagService.update(id, name)

    return okResponse(res, 200, { tag: updatedTag });
  } catch (err) {
    console.log('exports.update -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Delete tag
exports.delete = async (req, res) => {
  try {

    const { id } = req.params;    

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await tagService.delete(id)

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.delete -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}
