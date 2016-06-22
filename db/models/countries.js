var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var countrySchema = new Schema({
  name:  String,
  selected: Boolean,
  draftNum: Number,
  drafted: Boolean,
  regionId: String,
  round: Number,
  userId: String,
  editing: Boolean
});

module.exports = mongoose.model('Country', countrySchema);