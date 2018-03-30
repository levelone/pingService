const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Device = require('./api/models/deviceModel');
const deviceRoutes = require('./api/routes/deviceRoutes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pingServicedb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
deviceRoutes(app);
app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('Api server started on: ' + port);
