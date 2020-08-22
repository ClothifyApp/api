const express = require('express');
const garmentController = require('../controllers/Garment');
const { authenticate } = require('../middleware/auth');

const garmentRoutes = express.Router();

// Bring the clothes for the feed
garmentRoutes.get('/garments', authenticate, garmentController.list);

// Get all tags
garmentRoutes.get('/garments/full', authenticate, garmentController.fullList);

// Get one by user
garmentRoutes.get('/garments/user', authenticate, garmentController.getByuser);

// Get one tag
garmentRoutes.get('/garments/:id', authenticate, garmentController.getOne);

// Create tag
garmentRoutes.post('/garments', authenticate, garmentController.create);

// Update tag
garmentRoutes.patch('/garments/:id', authenticate, garmentController.update);

// Delete tag
garmentRoutes.delete('/garments/:id', authenticate, garmentController.delete);

module.exports = garmentRoutes;
