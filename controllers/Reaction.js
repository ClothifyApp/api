/* eslint-disable no-underscore-dangle */
const ReactionService = require('../services/Reaction');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

// Get all reactions
exports.list = async (req, res) => {
  try {
    const reactions = await ReactionService.list({});
    return okResponse(res, 200, { reactions });
  } catch (err) {
    console.log('exports.list -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get one reaction
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const reaction = await ReactionService.getOne(id);

    return okResponse(res, 200, { reaction });
  } catch (err) {
    console.log('exports.getOne -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};



// Create reaction
exports.create = async (req, res) => {
  const { userId, type, garmentId } = req.body;

  if (!userId || !type || !garmentId) {
    return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
  }

  try {
    const newReaction = await ReactionService.create(userId, type, garmentId);

    return okResponse(
      res,
      201,
      { reaction: newReaction },
      'Reaccion creada correctamente',
    );
  } catch (err) {
    console.log('exports.create -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update reaction
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const {
        userId, type, garmentId,
    } = req.body;

    if ((!userId || !type || !garmentId)) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const updatedReaction = await ReactionService.update(
      id,
      userId, 
      type, 
      garmentId
    );

    return okResponse(res, 200, { updatedReaction });
  } catch (err) {
    console.log('exports.update -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Delete reaction
exports.delete = async (req, res) => {
  try {
    
    const id = req.params.id;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await ReactionService.delete(id);

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.delete -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};
