require('./db');

var mongoose = require( 'mongoose' );
var express = require('express');
var path = require('path');
var config = require('./webpack.config.dev');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
var compiler = webpack(config);

var port = process.env.PORT || 8080;

var bodyParser = require('body-parser')

app.use(webpackDevMiddleware(compiler, {
  noInfo: true, 
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:  String,
  selected: Boolean,
  draftNum: Number
});

var User = mongoose.model('User', userSchema);

app.get('/api/users', function (request, response) {
  User.find({}, function(err, users) {
    response.json(users);
  });
});

app.post('/api/users', function (request, response) {
  User.create(request.body, function(err, user) {
    response.json(user);
  });
});

app.put('/api/users', function (request, response) {
  User.findByIdAndUpdate(request.body.id, { $set: { draftNum: request.body.draftNum }}, function(err, user) {
    response.json("Success");
  });
});

app.delete('/api/users', function (request, response) {
  User.find(request.body).remove(function(err, user) {
    response.json(user);
  });
});

app.get('*', function (request, response){
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', function(error) {
  if (error) throw error;
  console.log("server started on port " + port);
});