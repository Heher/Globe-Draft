module.exports = function(app) {
  var User = require('../models/users');

  app.post('/auth/facebook', function(request, response) {
    User.findOne({'email': request.body.payload.email}, function(err, user) {
      if (err) {
        response.json({error: "Email"});
      }
      if (!user) {
        response.json({error: "Email"});
      } else if (user.id_token === '') {
        User.findByIdAndUpdate(user._id, { $set: {id_token: request.body.payload.id} }, {new: true}, function(err, user) {
          if (err) {
            response.json({error: "Email"});
          } else {
            response.json(user);
          }
        });
      } else {
        response.json(user);
      }
    })
  });

  app.post('/auth/google', function(request, response) {
    User.findOne({'email': request.body.payload.hg}, function(err, user) {
      if (err) {
        response.json({errorType: "Email", error: err});
      }
      if (!user) {
        response.json({errorType: "Email", error: err});
      } else if (user.id_token === '') {
        User.findByIdAndUpdate(user._id, { $set: {id_token: request.body.payload.Ka} }, {new: true}, function(err, user) {
          if (err) {
            response.json({errorType: "Email", error: err});
          } else {
            response.json(user);
          }
        });
      } else {
        response.json(user);
      }
    })
  });
}