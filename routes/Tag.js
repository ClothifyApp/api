const express = require('express');
const tagController = require('../controllers/Tag');
const { authenticate } = require('../middleware/auth');

function tagsApi(app) {
  const tagsRoutes = express.Router();
  app.use('/tags', tagsRoutes);

  // Get all tags
  tagsRoutes.get('/', tagController.list);

  // Get one tag
  tagsRoutes.get('/:id', tagController.getOne);

  // Create tag
  tagsRoutes.post('/', authenticate, tagController.create);

  // Update tag
  tagsRoutes.patch('/:id', authenticate, tagController.update);

  // Delete tag
  tagsRoutes.delete('/:id', authenticate, tagController.delete);
}

module.exports = tagsApi;
