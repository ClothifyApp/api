const express = require('express');
const tagController = require('../controllers/Tag');
const { authenticate } = require('../middleware/auth');

const tagsRoutes = express.Router()

// Get all tags
tagsRoutes.get('/tags', tagController.list); 

// Get one tag
tagsRoutes.get('/tags/:id', tagController.getOne);

// Create tag
tagsRoutes.post('/tags', authenticate, tagController.create);

// Update tag
tagsRoutes.patch('/tags/:id', authenticate, tagController.update);

// Delete tag
tagsRoutes.delete('/tags/:id', authenticate, tagController.delete);

module.exports = tagsRoutes