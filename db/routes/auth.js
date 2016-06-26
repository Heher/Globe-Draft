module.exports = function(app) {
  var User = require('../models/users');

  app.post('/auth/facebook', function(request, response) {
    User.findOne({'email': request.body.payload.email}, function(err, user) {
      if (err) {
        console.log("Error!", err);
      }
      if (!user) {
        User.create({
          id_token: request.body.payload.id,
          name:  request.body.payload.first_name,
          email: request.body.payload.email,
          selected: false,
          draftNum: 0,
          editing: false,
          isAdmin: request.body.payload.isAdmin
        }, function(err, user) {
          response.json(user);
        });
      } else {
        response.json(user);
      }
    })
  });
}