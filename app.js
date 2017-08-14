var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var csrf = require('csurf');


// Route Configuration
//No need for the admin controller... Just FTP instead.... Admin Panelwould be awesome!
var adminController = require('./controllers/admin');
var routes = require('./routes/index');
var users = require('./routes/users');
var configDB = require('./config/database');

var app = express();

// Use native Node promises
mongoose.Promise = global.Promise;

//Local Connection for MongoDB
mongoose.connect(configDB.localURL)
  .then(() =>  console.log('Successfully Connected to Server'))
  .catch((err) => console.error(err));

//Instance Connection for MongoDB
//mongoose.connect(configDB.url)
//  .then(() =>  console.log('Successfully Connected to Server'))
//  .catch((err) => console.error(err));

require('./config/passport');


// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    path    : '/',
    httpOnly: false,
    maxAge  : 24*60*60*1000,
    secure: !true
  }
}));
app.use(csrf());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public'))); //load static files

// Include Routing
app.use('/', routes);
app.use('/users', users);
// Fire Controller
adminController(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
