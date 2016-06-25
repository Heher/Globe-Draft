require('./db');

var express = require('express');
var path = require('path');
var config = require('./webpack.config.dev');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var bodyParser = require('body-parser');
var passport = require('passport');

var port = process.env.PORT || 8080;

var app = express();

module.exports = app;

var compiler = webpack(config);


var configPassport = require('./db/config/passport')(passport);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true, 
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./db/routes/users')(app);
require('./db/routes/events')(app);
require('./db/routes/countries')(app);
require('./db/routes/regions')(app);
require('./db/routes/auth')(app, configPassport);

app.get('*', function (request, response){
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', function(error) {
  if (error) throw error;
  console.log("server started on port " + port);
});