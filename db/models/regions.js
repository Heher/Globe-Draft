var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var regionSchema = new Schema({
  name:  String,
  maxCountriesSelected: Number
});

module.exports = mongoose.model('Region', regionSchema);