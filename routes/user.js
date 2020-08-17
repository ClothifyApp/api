const express = require('express');
const userController = require('../controllers/User');
const { authenticate } = require('../middleware/auth');

const userRoutes = express.Router()

userRoutes.get('/users', userController.list); // Get all users
userRoutes.get('/users/:id', userController.getOne); // Get one user
userRoutes.post('/users', userController.create); // Create user
userRoutes.patch('/users/:id', userController.update); // Create user
userRoutes.delete('/users/:id', userController.delete); // delete user

module.exports = userRoutes