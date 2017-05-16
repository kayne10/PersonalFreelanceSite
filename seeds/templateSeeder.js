var Template = require('../models/template');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('localhost:27017/freelance');

var templates = [
  new Template({
    imagePath: '/images/templates/firstTemplate.jpg',
    price: 8,
    name: 'First Template',
    features: ['Responsive Design','5 html templates','1 CSS template', '1 Javascript File', 'Email API']
  }),
  new Template({
    imagePath: '/images/templates/firstTemplate.jpg',
    price: 15,
    name: 'Second Template',
    features: ['Responsive Design','Admin Panel','Approximately 10 html pages', 'User Authentication', 'Email API']
  }),
  new Template({
    imagePath: '/images/templates/firstTemplate.jpg',
    price: 20,
    name: 'Second Template',
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
