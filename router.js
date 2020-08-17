const express = require('express');
const userRoutes = require('./routes/user');
const { authenticate } = require('./middleware/auth');

module.exports = (app) => {
  const apiRoutes = express.Router();

  apiRoutes.get('/', function (req, res) {
    res.json({
      message: 'Welcome to our api',
    });
  });

  /* -- Authenticate and Authorization processes -- */
  apiRoutes.get('/prenda', authenticate, (req, res) =>
    res.json({
      message: 'Autenticado ;)',
    })
  );
  
  app.use(apiRoutes);
  app.use(userRoutes);
};
