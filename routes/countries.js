var Country = require('../models/country');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/', function(req, res) {
  User.find(function(err, users) {
    res.render('countries');
  }
});

module.exports = router;