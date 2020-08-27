const express = require('express');
const garmentController = require('../controllers/Garment');
const { authenticate } = require('../middleware/auth');

function garmentsApi(app) {
  const garmentRoutes = express.Router();
  app.use('/garments', garmentRoutes);

  // Bring the clothes for the feed
  garmentRoutes.get('/', authenticate, garmentController.list);

  // Get all tags
  garmentRoutes.get('/full', authenticate, garmentController.fullList);

  // Get one by user
  garmentRoutes.get('/user', authenticate, garmentController.getByuser);

  // Get one tag
  garmentRoutes.get('/:id', authenticate, garmentController.getOne);

  // Create tag
  garmentRoutes.post('/', authenticate, garmentController.create);

  // Update tag
  garmentRoutes.patch('/:id', authenticate, garmentController.update);

  // Delete tag
  garmentRoutes.delete('/:id', authenticate, garmentController.delete);
}

module.exports = garmentsApi;
