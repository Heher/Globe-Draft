module.exports = function(app) {
  var User = require('../models/users');

  app.post('/auth/facebook', function(request, response) {
    User.findOne({'id_token': request.body.payload.id}, function(err, user) {
      if (err) {
        console.log("Error!", err);
      }
      if (!user) {
        User.create({
          id_token: request.body.payload.id,
          name:  request.body.payload.first_name,
          selected: false,
          draftNum: 0,
          editing: false
        }, function(err, user) {
          response.json(user);
        });
      } else {
        response.json(user);
      }
    })
  });
}