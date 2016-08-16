var db = require('./db');

var express = require('express');
var path = require('path');
var config = require('./webpack.config.dev');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var bodyParser = require('body-parser');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');

var port = process.env.PORT || 8080;

var app = express();

module.exports = app;

var compiler = webpack(config);

var dashboard = new Dashboard();
compiler.apply(new DashboardPlugin(dashboard.setData));

app.use(webpackDevMiddleware(compiler, {
  quiet: true,
  noInfo: true, 
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {
  log: () => {}
}));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));

require('./db/routes/users')(app);
require('./db/routes/events')(app);
require('./db/routes/countries')(app);
require('./db/routes/regions')(app);
require('./db/routes/settings')(app);
require('./db/routes/auth')(app);
require('./db/routes/stripe')(app);

app.get('*', function (request, response){
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', function(error) {
  if (error) throw error;
  console.log("server started on port " + port);
});