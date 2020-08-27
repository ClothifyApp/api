const express = require('express');
const matchController = require('../controllers/Match');
const { authenticate } = require('../middleware/auth');

function matchApi(app) {
  const matchRoutes = express.Router();
  app.use('/match', matchRoutes);

  // Get all match
  matchRoutes.get('/', authenticate, matchController.list);

  // Get all user's match
  matchRoutes.get('/user', authenticate, matchController.getUserMatches);

  // Get one match
  matchRoutes.get('/:id', matchController.getOne);

  // Create match
  matchRoutes.post('/', authenticate, matchController.create);

  // Update match
  matchRoutes.patch('/:id', authenticate, matchController.update);

  // Delete match
  matchRoutes.delete('/:id', authenticate, matchController.delete);
}

module.exports = matchApi;
