var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sportSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Sport', sportSchema);
