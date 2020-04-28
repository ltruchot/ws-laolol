/* eslint-disable no-unused-vars */
require('dotenv').config();
// get npm dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');

const cacheOpts = {
  max: Infinity,
  maxAge: 1000, // 1000 * 60 * 60 * 24 // 24h
};
require('mongoose-cache').install(mongoose, cacheOpts);

const bodyParser = require('body-parser');
const logger = require('morgan');
const compression = require('compression');

// get local dependencies

// mongoose models & controllers
const User = require('./models/usersModel');
const Theme = require('./models/themesModel');
const Item = require('./models/itemsModel');
const Version = require('./models/versionsModel');

const app = express();
// Prepare mongodb connexion
mongoose.Promise = global.Promise;
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Parsers for POST data
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Enable CORS from client-side
app.use(cors());

// Set our api routes
const usersRoutes = require('./routes/usersRoutes');
const itemsRoutes = require('./routes/themesRoutes');
const themesRoutes = require('./routes/itemsRoutes');
const versionsRoutes = require('./routes/versionsRoutes');

usersRoutes(app);
itemsRoutes(app);
themesRoutes(app);
versionsRoutes(app);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3010';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan
