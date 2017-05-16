var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var permission = require('mongoose-permission');



// User Constructor
var userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
  // isAdmin: {type: Boolean, default: false}
});

//Permission tree initialization
userSchema.plugin(permission, {
    'administrate': ['create', 'read', 'update', 'delete'],
    'manage articles': ['publish', 'write'],
    'write': ['read'],
    'read': ['']
});

// Add encryption
userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


// Model export
module.exports = mongoose.model('User', userSchema);
