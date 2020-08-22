const garmentService = require('../services/Garment');
const reactionService = require('../services/Reaction');
const { okResponse, errorResponse, shuffleArray } = require('../utils/utils');
const { errors } = require('../utils/constants');

/*
Bring the clothes for the feed
Only bring the ones that still do not react
If the user has registered preferences, filter the query according to this field
*/
exports.list = async (req, res) => {
  try {
    const { _id, preferences } = req.user;

    const userReactions = [];
    await (
      await reactionService.list({ userId: _id }, { garmentId: 1, _id: 0 })
    ).forEach((reaction) => userReactions.push(reaction.garmentId));

    const query = {
      _id: { $nin: userReactions },
    };

    if (preferences.length) {
      query.tags = { $in: preferences };
    }

    const garments = shuffleArray(await garmentService.list(query));

    return okResponse(res, 200, { garments });
  } catch (err) {
    console.log('exports.list -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Gett all the garments (just in case)
exports.fullList = async (req, res) => {
  try {
    const garments = shuffleArray(await garmentService.list({}));

    return okResponse(res, 200, { garments });
  } catch (err) {
    console.log('exports.fullList -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get all garments of a user
exports.getByuser = async (req, res) => {
  try {
    const id = req.user._id;
    const garments = await garmentService.list({ userId: id });

    return okResponse(res, 200, { garments });
  } catch (err) {
    console.log('exports.list -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get one garment by id
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const garment = await garmentService.getOne(id);

    return okResponse(res, 200, { garment });
  } catch (err) {
    console.log('exports.getOne -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Create garment
exports.create = async (req, res) => {
  const userId = req.user._id;
  const {
    name, description, photos, tags,
  } = req.body;

  if (!name || !userId) {
    return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
  }

  try {
    const garment = await garmentService.create(name, description, photos, tags, userId);

    return okResponse(res, 201, { garment }, 'Prenda creada correctamente');
  } catch (err) {
    console.log('exports.create -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update garment
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, description, photos, tags,
    } = req.body;

    if (!id || !name) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const updatedGarment = await garmentService.update(id, name, description, photos, tags);

    return okResponse(res, 200, { garment: updatedGarment });
  } catch (err) {
    console.log('exports.update -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Delete garment
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await garmentService.delete(id);

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.delete -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};
