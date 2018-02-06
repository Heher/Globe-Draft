module.exports = function(app) {
  var User = require('../models/users');

  app.post('/auth/facebook', function(request, response) {
    User.findOne({'email': request.body.payload.email}, function(err, user) {
      if (err) {
        response.json({error: "Email"});
      }
      if (!user) {
        response.json({error: "No user found"});
      } else if (user.id_token === '' || user.id_token !== request.body.payload.id) {
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
    User.findOne({ 'email': request.body.payload.profileObj.email }, function(err, user) {
      if (err) {
        response.json({ errorType: "Email", error: err });
      }
      if (!user) {
        response.json({error: "No user found"});
      } else if (user.id_token === '') {
        User.findByIdAndUpdate(user._id, { $set: { id_token: request.body.payload.accessToken } }, { new: true }, function(err, foundUser) {
          if (err) {
            response.json({errorType: "Email", error: err});
          } else {
            response.json(foundUser);
          }
        });
      } else {
        response.json(user);
      }
    })
  });
}
