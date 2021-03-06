module.exports = function(app) {
  var Setting = require('../models/settings');
  app.get('/api/settings', function (request, response) {
    Setting.find({}, function(err, settings) {
      response.json(settings);
    });
  });

  app.post('/api/settings', function (request, response) {
    Setting.findOrCreate({}, request.body, function(err, setting) {
      response.json(setting);
    });
  });

  app.put('/api/settings', function (request, response) {
    Setting.findOneAndUpdate({}, { $set: request.body.payload }, function(err, setting) {
      response.json(setting);
    });
  });

  app.delete('/api/settings', function (request, response) {
    Setting.find(request.body).remove(function(err, setting) {
      response.json(setting);
    });
  });

  app.post('/api/settings/reset', function(request, response) {
    Setting.update({}, request.body, function(err, setting) {
      response.json(setting);
    });
  });
}