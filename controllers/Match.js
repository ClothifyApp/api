const MatchService = require('../services/Match');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

// Get all match
exports.list = async (req, res) => {
  try {
    const matches = await MatchService.list({});
    return okResponse(res, 200, { matches });
  } catch (err) {
    console.log('exports.list -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

exports.getUserMatches = async (req, res) => {
  try {
    const id = req.user._id;

    const matches = await MatchService.getUserMatches(id);

    return okResponse(res, 200, { matches });
  } catch (err) {
    console.log('exports.list -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get one match
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const macth = await MatchService.getOne(id);

    return okResponse(res, 200, { macth });
  } catch (err) {
    console.log('exports.getOne -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Create match
exports.create = async (req, res) => {
  const { secondUser, garments } = req.body;
  const { user } = req;

  if (!user || !secondUser || !garments) {
    return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
  }

  try {
    const match = await MatchService.create(user, secondUser, garments);

    return okResponse(res, 201, { match }, 'Match creado correctamente');
  } catch (err) {
    console.log('exports.create -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update match
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstUser, secondUser, garments } = req.body;

    if (!id || !firstUser || !secondUser || !garments) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const updateMatch = await MatchService.update(id, firstUser, secondUser, garments);

    return okResponse(res, 200, { match: updateMatch });
  } catch (err) {
    console.log('exports.update -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Delete match
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await MatchService.delete(id);

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.delete -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};
