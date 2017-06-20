var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var templateSchema = Schema({
  imagePath: {type: String, required: true},
  name: {type: String, required: true},
  features: [String]
});

module.exports = mongoose.model('Template', templateSchema);


// price: {type: Number, required: true},
