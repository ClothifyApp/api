const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Enviroment configuration
require('dotenv').config();

// User cors
app.use(cors());

// Automatically allow cross-origin requests
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log('Magic happens on port: 3000');

exports.app = app;
