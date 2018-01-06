var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var countrySchema = new Schema({
  name: String,
  shortName: String,
  selected: Boolean,
  draftNum: Number,
  drafted: Boolean,
  regionId: String,
  round: Number,
  userId: String,
  editing: Boolean,
  goodCountry: Boolean,
  badCountry: Boolean
});

module.exports = mongoose.model('Country', countrySchema);