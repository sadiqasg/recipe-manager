require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const dust = require('dustjs-helpers');

const router = require('./routes');

const app = express();

const PORT = process.env.PORT;

// Assign dust engine to .dust files
app.engine('dust', cons.dust);

// set default extension to dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// connect router
app.use(router);

// server
app.listen(PORT, function () {
  console.log(`server started on port ${PORT}`);
});