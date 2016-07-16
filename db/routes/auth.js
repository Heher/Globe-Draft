module.exports = function(app) {
  var User = require('../models/users');

  app.post('/auth/facebook', function(request, response) {
    User.findOne({'email': request.body.payload.email}, function(err, user) {
      if (err) {
        console.log("Error!", err);
      }
      if (!user) {
        response.json({error: "Email"});
      } else if (user.id_token === '') {
        User.findByIdAndUpdate(user._id, { $set: {id_token: request.body.payload.id} }, {new: true}, function(err, user) {
          response.json(user);
          response
        });
      } else {
        response.json(user);
      }
    })
  });

  app.post('/auth/google', function(request, response) {
    User.findOne({'email': request.body.payload.hg}, function(err, user) {
      if (err) {
        console.log("Error!", err);
      }
      if (!user) {
        response.json({error: "Email"});
      } else if (user.id_token === '') {
        console.log(request.body.payload.Ka);
        User.findByIdAndUpdate(user._id, { $set: {id_token: request.body.payload.Ka} }, {new: true}, function(err, user) {
          response.json(user);
        });
      } else {
        response.json(user);
      }
    })
  });
}