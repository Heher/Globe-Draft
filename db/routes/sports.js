module.exports = function(app) {
  var Sport = require('../models/sports');
  app.get('/api/sports', function (request, response) {
    Sport.find({}, function(err, sports) {
      response.json(sports);
    });
  });

  app.post('/api/sports', function (request, response) {
    Sport.create(request.body, function(err, sport) {
      response.json(sport);
    });
  });

  app.put('/api/sports', function (request, response) {
    Sport.findByIdAndUpdate(request.body.sport, { $set: request.body.payload }, { new: true }, function(err, sport) {
      response.json(sport);
    });
  });

  app.delete('/api/sports', function (request, response) {
    Sport.find(request.body).remove(function(err, sport) {
      response.json(sport);
    });
  });
}
