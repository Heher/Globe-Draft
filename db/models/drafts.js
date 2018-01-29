var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var draftSchema = new Schema({
  draftNum: Number,
  userId: String,
  country: Object,
  round: Number
});

module.exports = mongoose.model('Draft', draftSchema);