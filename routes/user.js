const express = require('express');
const userController = require('../controllers/User');
const { authenticate } = require('../middleware/auth');

const userRoutes = express.Router()

// Get all users
userRoutes.get('/users', authenticate, userController.list); 

// Get one user
userRoutes.get('/users/:id', authenticate, userController.getOne);

// Create user
userRoutes.post('/users', userController.create);

// Create user
userRoutes.patch('/users', authenticate, userController.update);

// Delete user
userRoutes.delete('/users', authenticate, userController.delete);

// SMS validation
userRoutes.post('/users/register', userController.register); 

module.exports = userRoutes