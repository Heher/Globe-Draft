module.exports = function(app) {
  var User = require('../models/users');
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
    User.findByIdAndUpdate(request.body.id, { $set: { draftNum: request.body.draftNum }}, {new: true}, function(err, user) {
      response.json("Success");
    });
  });

  app.delete('/api/users', function (request, response) {
    User.find(request.body).remove(function(err, user) {
      response.json(user);
    });
  });
}