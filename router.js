const express = require('express');
const userRoutes = require('./routes/user');

module.exports = (app) => {
  const apiRoutes = express.Router();

  apiRoutes.get('/', function (req, res) {
    res.json({
      message: 'Welcome to our api',
    });
  });
  
  app.use(apiRoutes);

  // User Routes
  app.use(userRoutes);
};
