var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  id_token: String,
  name:  String,
  selected: Boolean,
  draftNum: Number,
  editing: Boolean
});

module.exports = mongoose.model('User', userSchema);