var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountrySchema = new Schema({
  country: String,
  gold: String,
  silver: String,
  bronze: String
});

module.exports = mongoose.model('Country', CountrySchema);