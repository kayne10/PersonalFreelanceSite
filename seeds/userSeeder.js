var User = require('../models/user');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('localhost:27017/freelance');

var adminTest = new User({
  email: "trka2035@colorado.edu",
  password: "admin123"
});

adminTest.grant('administrate');
adminTest.save();

mongoose.disconnect();

// method without mongoose permission
// var users = [
//   new User({
//     email: "test@test.com",
//     password: "test123",
//     isAdmin: false
//   }),
//   new User({
//     email: "admin@test.com",
//     password: "admin123",
//     isAdmin: true
//   })
// ];

// var done = 0;
// for (var i = 0; i < users.length; i++) {
//   users[i].save(function(err, data){
//     done++;
//     if (done === users.length) {
//       exit();
//     }
//   });
// }
//
// function exit() {
//   mongoose.disconnect();
// }
