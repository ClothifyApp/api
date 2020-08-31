/* eslint-disable no-underscore-dangle */
const ReactionService = require('../services/Reaction');
const MatchService = require('../services/Match');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');
const { secondsSinceEpoch } = require('../utils/dates');

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
  const { type, garmentId } = req.body;
  const { user } = req;

  if (!user || !type || !garmentId) {
    return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
  }

  try {
    let newReaction = '';

    // Only create superlike reactions after 60 seconds for superlike
    if (type === 'superlike') {
      const latestReactionUser = await ReactionService.getLatestReaction(user._id, 'superlike');

      if (latestReactionUser) {
        const { createdAt } = latestReactionUser;
        const currentSeconds = secondsSinceEpoch();
        const latestReactionSeconds = secondsSinceEpoch(createdAt);

        if ((currentSeconds - latestReactionSeconds) <= 60) {
          console.log('exports.create -> To create a new superlike wait 60 seconds');
          return errorResponse(res, errors.SUPERLIKE_RESTRICTION);
        }
      }
    }

    newReaction = await ReactionService.create(user._id, type, garmentId);

    const match = await MatchService.validateMatch(user._id, garmentId);

    if (match) {
      // eslint-disable-next-line global-require
      const socket = require('../socket').connection();
      socket.sendEvent(match.firstUser._id, 'match', {
        data: {
          userMatch: match.secondUser,
          garmets: match.matchR.garments,
        },
      });
      socket.sendEvent(match.secondUser._id, 'match', {
        data: {
          userMatch: match.firstUser,
          garmets: match.matchR.garments,
        },
      });
    }

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
    const { user } = req;
    const { id } = req.params;
    const {
      type, garmentId,
    } = req.body;

    if ((!user || !type || !garmentId)) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const updatedReaction = await ReactionService.update(
      id,
      user._id,
      type,
      garmentId,
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
    const { id } = req.params;

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
