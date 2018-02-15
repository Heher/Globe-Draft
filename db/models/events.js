var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
  name:  String,
  sportId: String,
  team: Boolean,
  datetime: Date,
  editing: Boolean,
  gold: [],
  silver: [],
  bronze: []
});

module.exports = mongoose.model('Event', eventSchema);