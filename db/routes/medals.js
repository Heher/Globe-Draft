module.exports = function(app) {
  var Medal = require('../models/medals');
  app.get('/api/medals', function (request, response) {
    Medal.find({}, function(err, medals) {
      response.json(medals);
    });
  });

  app.post('/api/medals', function (request, response) {
    Medal.create(request.body, function(err, medal) {
      response.json(medal);
    });
  });

  app.put('/api/medals', function (request, response) {
    Medal.findByIdAndUpdate(request.body.id, { $set: request.body.payload }, { new: true }, function(err, medal) {
      response.json(medal);
    });
  });

  app.delete('/api/medals', function (request, response) {
    Medal.find(request.body).remove(function(err, medal) {
      response.json(medal);
    });
  });
}
