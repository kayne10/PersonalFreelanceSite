var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var flash = require('connect-flash');
var nodemailer = require('nodemailer');
var cfg = require('../config/config');


var csrfProtection = csrf();
router.use(csrfProtection);

var mailer = nodemailer.createTransport({
  service: cfg.HOST,
  port: 25,
  secure: false,
  auth : {
    user: cfg.USER,
    pass: cfg.PASS
  }
});

/* GET users listing. */

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('users/profile');
});

// Logout
router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logout();
  req.flash('success', 'You successfully logged out!');
  res.redirect('/');
  //redirect
});

router.use('/', notLoggedIn, function(req, res, next) {
  next();
});


router.get('/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('users/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
  failureRedirect: '/users/signup',
  failureFlash: true
}), function(req, res, next) {
  var emailReciever = req.body.email;
  // sending email via nodemailer
  var mailOptions = {
    from: cfg.USER,
    to: emailReciever,
    subject: 'Sign Up Confirmation',
    text: 'Thank you for signing up for my website! This is a confirmation email.'
  };
  mailer.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message Sent: ' + info.response);
      req.flash('success', 'Thank you for contacting me! You will hear back from me soon.');
      res.redirect('/');
    }
  });
  req.flash('success', 'Thank you for signing up! You will recieve an email shortly');
  res.redirect('/');
});

router.get('/signin', function(req, res, next) {
 var messages = req.flash('error');
 res.render('users/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/signin',
  failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.session.user);
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/signin');
}

// function permissionCheck(req, res, next) {
//   if (notLoggedIn()) {
//     res.redirect('/users/signin');
//   }
//   var currentUser = req.user;
//   if (currentUser.permissions == 'administrate') {
//     return next();
//   }
// }
