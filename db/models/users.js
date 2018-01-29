var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  id_token: String,
  name: String,
  email: String,
  selected: Boolean,
  draftNum: Number,
  editing: Boolean,
  isAdmin: Boolean,
  hasPaid: Boolean
});

module.exports = mongoose.model('User', userSchema);
