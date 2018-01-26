var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var draftSchema = new Schema({
  draftNum: Number,
  userId: String,
  countryId: String,
  regionId: String,
  round: Number
});

module.exports = mongoose.model('Draft', draftSchema);