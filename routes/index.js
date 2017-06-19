var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var nodemailer = require('nodemailer');
var fs = require('fs');
var flash = require('connect-flash');
var archiver = require('archiver');
var path = require('path');
var cfg = require('../config/config')
var stripe = require("stripe")(cfg.STRIPE.test_key);

var Cart = require('../models/cart');
var Template = require('../models/template');
var Order = require('../models/order');
var Post = require('../models/post');
var Comment = require('../models/comment');


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


/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  res.render('index', {
    title: '',
    successMsg: successMsg,
    noMessages: !successMsg
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Troy Kayne' });
});


// GET GALLERY
router.get('/gallery', function(req, res, next) {
  res.render('gallery/index', { title: 'About Troy Kayne' });
});
router.get('/gallery/rocky-mtn', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'rocky-mtn-gallery.html'));
});
router.get('/gallery/israel', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'israel-gallery.html'));
});
// End of Gallery Routes


router.get('/developer', function(req, res, next) {
  Template.find(function(err, docs) {
    var productChunks = []; //formatting
    var chunkSize = 2;
    for (var i = 0; i < docs.length; i+= chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    var features = docs.features;
    res.render('webdev', {
      title: 'Web Development',
      templates: productChunks,
      features: features
    });
  });
});

// GET add to cart
router.get('/add-to-cart/:id', function(req, res, next) {
  var templateId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Template.findById(templateId, function(err, template) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(template, template.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/developer#products');
  });
});


// Demos
// Must edit template files.... should not be hard but it will annoying
// res.sendFile(path.join(__dirname, '../public/index.html'))
router.get('/developer/demo/:id', function(req, res, next) {
  templateId = req.params.id;
  Template.findById(templateId, function(err, template) {
    if (err) {
      return res.redirect('/developer#products');
    }
    if (template.price < 10) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      var readableStream = fs.createReadStream(path.join(__dirname, 'fixtures/templateOne', 'index.html'));
      readableStream.pipe(res);
    }
    if (template.price === 15) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      var readableStream = fs.createReadStream(path.join(__dirname, 'fixtures/templateOne', 'index.html'));
      readableStream.pipe(res);
    }
    if (template.price === 20) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      var readableStream = fs.createReadStream(path.join(__dirname, 'fixtures/templateOne', 'index.html'));
      readableStream.pipe(res);
    }
  });
});

router.get('/shopping-cart/', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {templates: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {templates: cart.generateArray(), totalPrice: cart.totalPrice});
});

// GET reducebyOne
router.get('/reduce/:id', function(req, res, next) {
  var templateId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(templateId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

// GET removeItem
router.get('/remove/:id', function(req, res, next) {
  var templateId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(templateId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

// Include zip file in email
router.post('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  // Create a charge: this will charge the user's card
  stripe.charges.create({
    amount: cart.totalPrice * 100, //Amount in cents
    currency: "usd",
    source: req.body.stripeToken, //name of hidden input field
    description: "Test charge"
  }, function(err, charge) {
      if (err) {
        req.flash('error', err.message)
        return res.redirect('/checkout');
      }
      var order = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name,
        paymentId: charge.id
      });
      order.save(function(err, result){
        req.session.cart = null;
        //SEND EMAIL
        //mailOptions = {};
        //mailer.sendMail({});
        req.flash('success', 'Successfully bought product!');
        res.redirect('/');
      });
  });
});


router.get('/explore', function(req, res, next) {
  Post.find(function(err, docs) {
    var musicRelated = [];
    var hikeRelated = [];
    for (var i = 0; i < docs.length; i++) {
      if (docs[i].category === "music" ) {
        musicRelated.push(docs[i]);
      }
      if (docs[i].category === "hike") {
        hikeRelated.push(docs[i]);
      }
    }
    res.render('explore/index', {
      title: 'Explore',
      musicPosts: musicRelated,
      hikePosts: hikeRelated,
    });
  });
});

router.get('/explore/post/:id', function(req, res, next) {
  blogId = req.params.id;
  Post.findById(blogId, function(err, post) {
    if (err) {
      return res.redirect('/explore#explore');
    }
    var comments = post.comments;
    res.render('explore/post', {
      post: post,
      comments: comments
    });
  });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {title: 'Contact', csrfToken: req.csrfToken()});
});

router.post('/contact', function(req, res, next) {
  var emailSender = req.body.email;
  var emailSubject = req.body.subject;
  var emailContent = req.body.content;
  var mailOptions = {
    from: emailSender,
    to: cfg.USER,
    subject: 'Website Notification',
    text: emailContent
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
});



module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/users/signin');
};
