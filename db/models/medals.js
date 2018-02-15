var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var medalSchema = new Schema({
  countryId: String,
  eventId: String,
  type: String,
  points: Number
});

module.exports = mongoose.model('Medal', medalSchema);
