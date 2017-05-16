var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var commentSchema = new Schema({
  body: {type: String, required: false, default: null},
  user: {type: ObjectId, required: false, default: null},
  date: {type: Date, required: false, default: Date.now}
});

module.exports = mongoose.model('Comment', commentSchema);
