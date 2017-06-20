var Post = require('../models/post');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('localhost:27017/freelance');

var posts = [
  new Post({
    category: "music",
    imagePath: "/images/blog/vanMorrison.jpg",
    title: "Van Morrison",
    description: "Just a simple description"
  }),
  new Post({
    category: "music",
    imagePath: "/images/blog/markKnopfler.jpg",
    title: "Mark Knopfer",
    description: "Just a simple description"
  }),
  new Post({
    category: "hike",
    imagePath: "/images/blog/cool.jpg",
    title: "Cool new hike",
    description: "just a simple description"
  })
];

var done = 0;
for (var i = 0; i < posts.length; i++) {
  posts[i].save(function(err, data){
    done++;
    if (done === posts.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
