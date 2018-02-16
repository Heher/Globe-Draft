var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sportSchema = new Schema({
  name: String,
  slug: String
});

module.exports = mongoose.model('Sport', sportSchema);
