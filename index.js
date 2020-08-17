require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./router');
const port = process.env.PORT || 3002;

const app = express();
const server = http.createServer(app);

// App configuration
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,x-access-token'
  );
  next();
});

app.use(cors());
app.set('port', port);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  bodyParser.json({
    limit: '50mb',
  })
);

// Sockets
require('socket.io')(http, {
  pingInterval: 200,
  pingTimeout: 10000,
  origins: '*:*',
}).listen(server);

// Routes
router(app);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + process.env.MONGO_URI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// Start server
// =============================================================================
server.listen(app.get('port'), function () {
  console.log('Magic happens on port ', app.get('port'));
});

exports.app = app;
