var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// No Comments for now!
// var Comment = new Schema({
//   body: {type: String, required: false, default: null},
//   _userId: {type: ObjectId, required: false, default: null},
//   date: {type: Date, required: false, default: Date.now}
// });

var postSchema = new Schema({
  category: {type: String, required: true},
  imagePath: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  // comments: [Comment],
  date: {type: Date, default: Date.now}
});

// Model export
module.exports = mongoose.model('Post', postSchema);
