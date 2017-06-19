// this link uses an admin config object that checks user permissions
// http://stackoverflow.com/questions/24286835/express-js-mongoose-user-roles-and-permissions

// Variables and Models
var csrf = require('csurf');
var flash = require('connect-flash');
var passport = require('passport');
var permission = require('mongoose-permission');
var User = require('../models/user');
var Post = require('../models/post');


var csrfProtection = csrf();


module.exports = function(app) {

  app.use(csrfProtection);

  app.get('/admin/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('admin/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  });
  app.post('/admin/signin', function(req, res, next){
    passport.authenticate('local.signin', function(err, user, info) {
      if (err) { return next(err); }
      // Redirect if it fails
      if (!user) { return res.redirect('/signup'); }
      if(user.permissions[0] === 'administrate') {
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          // Redirect if it succeeds
          return res.redirect('/admin/' + user._id);
        });
      }
    })(req, res, next);
  });
  app.get('/admin/:id', function(req, res, next) {
    var adminId = req.params.id;
    User.findById(adminId, function(err, admin) {
      if (err) {
        return res.redirect('/');
      }
      else {
        res.render('admin/index', {admin: admin});
      }
    });
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
