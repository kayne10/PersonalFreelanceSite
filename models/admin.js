var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var adminUserSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
});

adminUserSchema.plugin(require('mongoose-role'), {
  roles: ['public', 'user', 'admin'],
  accessLevels: {
    'public': ['public', 'user', 'admin'],
    'anon': ['public'],
    'user': ['user', 'admin'],
    'admin': ['admin']
  }
});

// Add encryption
adminUserSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

adminUserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

var Admin = mongoose.model('Admin', adminUserSchema);
var admin = new Admin({email: 'troy.kayne@colorado.edu', password: 'windig#300', role:'admin'});

module.exports = mongoose.model('Admin', adminUserSchema);
