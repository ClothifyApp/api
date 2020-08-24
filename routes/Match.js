const express = require('express');
const matchController = require('../controllers/Match');
const { authenticate } = require('../middleware/auth');

const matchRoutes = express.Router();

// Get all match
matchRoutes.get('/match', authenticate, matchController.list);

// Get all user's match
matchRoutes.get('/match/user', authenticate, matchController.getUserMatches);

// Get one match
matchRoutes.get('/match/:id', matchController.getOne);

// Create match
matchRoutes.post('/match', authenticate, matchController.create);

// Update match
matchRoutes.patch('/match/:id', authenticate, matchController.update);

// Delete match
matchRoutes.delete('/match/:id', authenticate, matchController.delete);

module.exports = matchRoutes;
