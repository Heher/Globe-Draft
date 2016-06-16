module.exports = function(app) {
  var Event = require('../models/events');
  app.get('/api/events', function (request, response) {
    Event.find({}, function(err, events) {
      response.json(events);
    });
  });

  app.post('/api/events', function (request, response) {
    Event.create(request.body, function(err, event) {
      response.json(event);
    });
  });

  app.put('/api/events', function (request, response) {
    Event.findByIdAndUpdate(request.body.id, { $set: request.body.payload}, {new: true}, function(err, event) {
      response.json("Success");
    });
  });

  app.delete('/api/events', function (request, response) {
    Event.find(request.body).remove(function(err, event) {
      response.json(event);
    });
  });
}