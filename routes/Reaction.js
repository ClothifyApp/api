const express = require('express');
const reactionController = require('../controllers/Reaction');
const { authenticate } = require('../middleware/auth');

function reactionsApi(app) {
  const reactionRoutes = express.Router();
  app.use('/reactions', reactionRoutes);

  // Get all reactions
  reactionRoutes.get('/', authenticate, reactionController.list);

  // Get one reaction
  reactionRoutes.get('/:id', authenticate, reactionController.getOne);

  // Create reaction
  reactionRoutes.post('/', authenticate, reactionController.create);

  // Update reaction
  reactionRoutes.patch('/:id', authenticate, reactionController.update);

  // Delete reaction
  reactionRoutes.delete('/:id', authenticate, reactionController.delete);
}

module.exports = reactionsApi;
