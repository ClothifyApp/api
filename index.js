require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./router');

const port = process.env.PORT || 3002;
const socket = require('./socket');

const app = express();
const server = http.createServer(app);

// App configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,x-access-token',
  );
  next();
});

app.use(cors());
app.set('port', port);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);

// Routes
router(app);

// Database connections
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${process.env.MONGO_URI}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

// Start server
// =============================================================================
server.listen(app.get('port'), () => {
  console.log('Magic happens on port ', app.get('port'));
});

// Connect Socket
socket.connect(server);

exports.app = app;
