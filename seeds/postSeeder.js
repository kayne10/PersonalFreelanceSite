var Post = require('../models/post');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('localhost:27017/freelance');

var posts = [
  new Post({
    category: "music",
    imagePath: "/images/blog/vanMorrison.jpg",
    title: "Van Morrison",
    description: "Just a simple description",
    comments: [
      {body: "Van the man!", _userId: "586d4c6be0fcdc282eb9be53"}
    ]
  }),
  new Post({
    category: "music",
    imagePath: "/images/blog/markKnopfler.jpg",
    title: "Mark Knopfer",
    description: "Just a simple description",
    comments: [
      {body: "He shreds the guitar", _userId: "586d4c6be0fcdc282eb9be53"}
    ]
  }),
  new Post({
    category: "hike",
    imagePath: "/images/blog/cool.jpg",
    title: "Cool new hike",
    description: "just a simple description",
    comments: [
      {body: "Beautiful", _userId: "586d4c6be0fcdc282eb9be53"},
      {body: "I love the view", _userId: "586c440debdab61da01f7be2"}
    ]
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
