const express = require('express');
const userController = require('./controllers/User');
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

  // Users
  apiRoutes.get('/users', userController.list); // Get all users
  apiRoutes.post('/users', userController.create); // Create user
  apiRoutes.post('/users/register',userController.register); // SMS validation

  app.use(apiRoutes);
};
