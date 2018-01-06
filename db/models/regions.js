var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var regionSchema = new Schema({
  name: String,
  maxCountriesSelected: Number,
  editing: Boolean
});

module.exports = mongoose.model('Region', regionSchema);