module.exports = function(app) {
  var User = require('../models/users');

  app.post('/auth/facebook', function(request, response) {
    User.findOne({'email': request.body.payload.email}, function(err, user) {
      if (err) {
        response.json({error: "Email"});
      }
      if (!user) {
        User.create({
          id_token: request.body.payload.id,
          name:  request.body.payload.first_name,
          email: request.body.payload.email,
          selected: false,
          draftNum: 0,
          editing: false,
          isAdmin: false,
          hasPaid: false
        }, function(err, user) {
          if (err) {
            response.json({error: "Email"});
          } else {
            response.json(user);
          }
        })
        // response.json({error: "Email"});
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
        response.json({error: "Email"});
      }
      if (!user) {
        User.create({
          id_token: request.body.payload.Ka,
          name:  request.body.payload.Za,
          email: request.body.payload.hg,
          selected: false,
          draftNum: 0,
          editing: false,
          isAdmin: request.body.payload.isAdmin
        }, function(err, user) {
          if (err) {
            response.json({error: "Email"});
          } else {
            response.json(user);
          }
        });
        // response.json({error: "Email"});
      } else if (user.id_token === '') {
        User.findByIdAndUpdate(user._id, { $set: {id_token: request.body.payload.Ka} }, {new: true}, function(err, user) {
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
}