module.exports = function(app) {
  var Region = require('../models/regions');
  app.get('/api/regions', function (request, response) {
    Region.find({}, function(err, regions) {
      response.json(regions);
    });
  });

  app.post('/api/regions', function (request, response) {
    Region.create(request.body, function(err, region) {
      response.json(region);
    });
  });

  app.put('/api/regions', function (request, response) {
    Region.findByIdAndUpdate(request.body.id, { $set: request.body.payload}, {new: true}, function(err, region) {
      response.json("Success");
    });
  });

  app.delete('/api/regions', function (request, response) {
    Region.find(request.body).remove(function(err, region) {
      response.json(region);
    });
  });
}