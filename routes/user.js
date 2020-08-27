const express = require('express');
const userController = require('../controllers/User');
const { authenticate } = require('../middleware/auth');

function usersApi(app) {

    const userRoutes = express.Router();
    app.use("/users",userRoutes);

    // Get all users
    userRoutes.get('/', authenticate,userController.list);

    // Get one user
    userRoutes.get('/:id', authenticate, userController.getOne);

    // Create user
    userRoutes.post('/', userController.create);

    // Update user
    userRoutes.patch('/', authenticate, userController.update);

    // Delete user
    userRoutes.delete('/', authenticate, userController.delete);

    // SMS validation
    userRoutes.post('/register', userController.register);

}

module.exports = usersApi;
