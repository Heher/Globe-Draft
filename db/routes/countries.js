module.exports = function(app) {
  var Country = require('../models/countries');
  app.get('/api/countries', function (request, response) {
    Country.find({}, function(err, countries) {
      response.json(countries);
    });
  });

  app.post('/api/countries', function (request, response) {
    Country.create(request.body, function(err, country) {
      response.json(country);
    });
  });

  app.put('/api/countries', function (request, response) {
    Country.findByIdAndUpdate(request.body.id, { $set: request.body.payload}, {new: true}, function(err, country) {
      response.json("Success");
    });
  });

  app.delete('/api/countries', function (request, response) {
    Country.find(request.body).remove(function(err, country) {
      response.json(country);
    });
  });
}