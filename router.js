const express = require('express');
const userRoutes = require('./routes/user');
const imageRoutes = require('./routes/Image');
const tagRoutes = require('./routes/Tag');
const garmentRoutes = require('./routes/Garment');

module.exports = (app) => {
  const apiRoutes = express.Router();

  apiRoutes.get('/', (req, res) => {
    res.json({
      message: 'Welcome to our api',
    });
  });

  app.use(apiRoutes);

  // User Routes
  app.use(userRoutes);

  // Image Routes
  app.use(imageRoutes);

  // Tag Routes
  app.use(tagRoutes);

  // Garment Routes
  app.use(garmentRoutes);
};
