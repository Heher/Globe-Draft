var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var countrySchema = new Schema({
  name:  String,
  selected: Boolean,
  draftNum: Number,
  drafted: Boolean,
  regionId: Number,
  round: Number,
  userId: String
});

module.exports = mongoose.model('Country', countrySchema);