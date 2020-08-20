const express = require('express');
const imageController = require('../controllers/Image');
const { authenticate } = require('../middleware/auth');

const imageRoutes = express.Router()

// Upload one image
imageRoutes.post("/image", authenticate, imageController.upload)

module.exports = imageRoutes