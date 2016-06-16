require('./db');

var express = require('express');
var path = require('path');
var config = require('./webpack.config.dev');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();

module.exports = app;

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

require('./db/routes/users')(app);
require('./db/routes/events')(app);

app.get('*', function (request, response){
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', function(error) {
  if (error) throw error;
  console.log("server started on port " + port);
});