const express = require('express');
const userRoutes = require('./routes/user');
const imageRoutes = require('./routes/Image');
const tagRoutes = require('./routes/Tag');
const garmentRoutes = require('./routes/Garment');
const reactionRoutes = require('./routes/Reaction');
const matchRoutes = require('./routes/Match');

module.exports = (app) => {
  const apiRoutes = express.Router();

  apiRoutes.get('/', (req, res) => {
    res.json({
      message: 'Welcome to our api',
    });
  });

  app.use(apiRoutes);

  userRoutes(app);

  imageRoutes(app);

  tagRoutes(app);

  garmentRoutes(app);

  reactionRoutes(app)

  matchRoutes(app);
};
