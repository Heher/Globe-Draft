var Country = require('../models/country');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  countries: [Country]
});

module.exports = mongoose.model('User', UserSchema);