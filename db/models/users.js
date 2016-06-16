var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:  String,
  selected: Boolean,
  draftNum: Number
});

module.exports = mongoose.model('User', userSchema);