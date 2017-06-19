var User = require('../models/user');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('localhost:27017/freelance');

User.findOneAndUpdate({_id: '59441de62e498203d7c831d7'}, function(err, user){
  if(err){
    return err;
  } else {
    var admin = user;
    var _id = admin._id;
    admin.permissions.push('administrate');
    admin.save({_id: _id, upsert:true });
    console.log(admin);
  }
});


mongoose.disconnect();
// This command works in the Mongo Shell!! but does not save email and password...
// db.users.findAndModify({query:{"email":"troy.kayne@colorado.edu"},update:{emailpermissions:['admininistrate']},upsert:true})


// function addAdmin(User) {
//   User.findById({_id: ObjectId("59441de62e498203d7c831d7")}, function(err, user){
//     if(err){
//       return err;
//     } else {
//       var admin = user;
//       var permission = 'administrate';
//       admin.permissions.push(permission);
//       console.log(admin);
//       admin.save();
//     }
//   });
// }

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
