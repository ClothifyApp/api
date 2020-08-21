const express = require('express');
const reactionController = require('../controllers/Reaction');
const { authenticate } = require('../middleware/auth');

const reactionRoutes = express.Router();

// Get all reactions
reactionRoutes.get('/reactions',  authenticate,reactionController.list);

// Get one reaction
reactionRoutes.get('/reactions/:id', authenticate, reactionController.getOne);

// Create reaction
reactionRoutes.post('/reactions', authenticate, reactionController.create);

// Update reaction
reactionRoutes.patch('/reactions/:id', authenticate, reactionController.update);

// Delete reaction
reactionRoutes.delete('/reactions/:id',  authenticate,reactionController.delete);

module.exports = reactionRoutes;
