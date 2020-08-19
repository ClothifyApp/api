const express = require('express');
const imageController = require('../controllers/Image');

const imageRoutes = express.Router()

// Upload one image
imageRoutes.post("/image", imageController.upload)

module.exports = imageRoutes