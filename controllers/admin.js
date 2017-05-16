// this link uses an admin config object that checks user permissions
// http://stackoverflow.com/questions/24286835/express-js-mongoose-user-roles-and-permissions

// Variables and Models
var csrf = require('csurf');
var flash = require('connect-flash');
var permission = require('mongoose-permission');
var User = require('../models/user');
var Post = require('../models/post');


var csrfProtection = csrf();


// var adminRoles = ["administrate","create","read","update","delete","write"];

function requireRole(role) {
    return function(req, res, next) {
        if(req.session.user && req.session.user.permissions === role)
            return next();
        else
            console.log(req.session.user);
            res.sendStatus(403);
    }
}



module.exports = function(app) {

  app.use(csrfProtection);

  app.get('/admin', requireRole("administrate"), function(req, res, next) {
    res.render('admin/index');
  });


}


// function isAdmin(req, res, next) {
//   var currentUser = req.user;
//   User.findOne({'email': currentUser.email}, function(err, user) {
//     if (user.isAdmin === true) {
//       return next();
//     } else {
//       req.flash('error', 'Not an admin');
//       res.redirect('/');
//     }
//   });
// }
