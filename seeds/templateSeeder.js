var Template = require('../models/template');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('localhost:27017/freelance');

var templates = [
  new Template({
    imagePath: '/images/templateOne/bandScreenShot.png',
    name: 'Band Landing Page',
    features: ['Responsive Design','1 html templates','1 CSS template', '1 Javascript File']
  }),
  new Template({
    imagePath: '/images/templateTwo/LandingScreenshot.png',
    name: 'Personal Landing Page',
    features: ['Responsive Design','1 html page', '1 css template', '1 Javascript files']
  }),
  new Template({
    imagePath: '/images/templateThree/personalShopScreenshot.png',
    name: 'Shopping Cart Website',
    features: ['Responsive Design','Admin Panel','Approximately 10 html pages', 'User Authentication', 'Email API', 'E-Commerce']
  })
];

var done = 0;
for (var i = 0; i < templates.length; i++) {
  templates[i].save(function(err, data){
    done++;
    if (done === templates.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
