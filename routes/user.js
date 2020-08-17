const express = require('express');
const userController = require('../controllers/User');
const { authenticate } = require('../middleware/auth');

const userRoutes = express.Router()

// Get all users
userRoutes.get('/users', userController.list); 

// Get one user
userRoutes.get('/users/:id', userController.getOne);

// Create user
userRoutes.post('/users', userController.create);

// Create user
userRoutes.patch('/users/:id', userController.update);

// Delete user
userRoutes.delete('/users/:id', userController.delete);

module.exports = userRoutes