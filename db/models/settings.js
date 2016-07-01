var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var Schema = mongoose.Schema;

var settingSchema = new Schema({
  round:  Number,
  userTurn: Number,
  numberDrafted: Number,
  editDraftOrder: Boolean,
  goodCountry: String,
  badCountry: String
});

settingSchema.plugin(findOrCreate);

module.exports = mongoose.model('Setting', settingSchema);