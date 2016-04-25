var User = require('../models/user');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.route('/')

  .get(function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);

      res.json(users);
    });
  });

module.exports = router;