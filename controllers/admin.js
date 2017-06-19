// this link uses an admin config object that checks user permissions
// http://stackoverflow.com/questions/24286835/express-js-mongoose-user-roles-and-permissions

// Global Variables and Models
var csrf = require('csurf');
var flash = require('connect-flash');
var passport = require('passport');
var permission = require('mongoose-permission');
var User = require('../models/user');
var Post = require('../models/post');
var cfg = require('../config/config');


var csrfProtection = csrf();


module.exports = function(app) {

  app.use(csrfProtection);


  // GET and POST for admin authentication
  app.get('/admin/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('admin/signin', {csrfToken: req.csrfToken(), message: req.flash("info")});
  });
  app.post('/admin/signin', function(req, res, next){
    passport.authenticate('local.signin', function(err, user, info) {
      if (err) { return next(err); }
      // Redirect if it fails
      if (!user) {
        req.flash("info","Sorry, that is not a valid email or password.")
        return res.redirect('/admin/signin');
      }
      if(user.permissions[0] === cfg.permission) {
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          // Redirect if it succeeds
          return res.redirect('/admin/' + user._id);
        });
      } else {
        req.flash("info","Sorry, user is not an administrator.");
        return res.redirect('/admin/signin');
      }
    })(req, res, next);
  });

  // DASHBOARD CONTROLLER
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

} //End of Module Export
