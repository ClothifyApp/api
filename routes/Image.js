const express = require('express');
const imageController = require('../controllers/Image');
const { authenticate } = require('../middleware/auth');

function imageApi(app) {
  const imageRoutes = express.Router();
  app.use('/image', imageRoutes);

  // Upload one image
  imageRoutes.post('/', authenticate, imageController.upload);
}

module.exports = imageApi;
