const express = require('express');
const garmentController = require('../controllers/Garment');
const { authenticate } = require('../middleware/auth');

const garmentRoutes = express.Router();

// Get all tags
garmentRoutes.get('/garmets', authenticate, garmentController.list);

// Get one tag
garmentRoutes.get('/garmet/:id', authenticate, garmentController.getOne);

// Get one by user
garmentRoutes.get('/garmet', authenticate, garmentController.getByuser);

// Create tag
garmentRoutes.post('/garmets', authenticate, garmentController.create);

// Update tag
garmentRoutes.patch('/garmet/:id', authenticate, garmentController.update);

// Delete tag
garmentRoutes.delete('/garmet/:id', authenticate, garmentController.delete);

module.exports = garmentRoutes;
