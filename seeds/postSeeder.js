var Post = require('../models/post');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('localhost:27017/freelance');

var posts = [
  new Post({
    category: "music",
    imagePath: "/images/blog/van_morrison.jpg",
    title: "Van Morrison",
    description: "Just a simple description"
  }),
  new Post({
    category: "music",
    imagePath: "/images/blog/mark_knopfler.jpg",
    title: "Mark Knopfer",
    description: "Just a simple description"
  }),
  new Post({
    category: "hike",
    imagePath: "/images/blog/royal_arch.jpg",
    title: "Royal Arch",
    description: "just a simple description"
  }),
  new Post({
    category: "camp",
    imagePath: "/images/blog/hammock.jpg",
    title: "Camping at Gold Hill, Colorado",
    description: "Amazing time spent while camping in Boulder's backyard. This spot was definitely a little complicated to find, but after a second time, it will be no problem. On my left, the Boulder street lights were in the near distance. On my right, was an incredible view of these snow capped mountains. I wish the really cool hammock in the photo aboved was mine for the night. It would have been great sleeping directly under the stars..."
  }),
  new Post({
    category: "hike",
    imagePath: "/images/blog/bear-peak.jpg",
    title: "On the Way to Bear Peak",
    description: "just a simple description"
  }),
  new Post({
    category: "hike",
    imagePath: "/images/blog/flatiron.jpg",
    title: "Mallory Cave",
    description: "just a simple description"
  }),
  new Post({
    category: "camp",
    imagePath: "/images/blog/moab.jpg",
    title: "Camping in Moab",
    description: "Amazing time spent while camping in Boulder's backyard. This spot was definitely a little complicated to find, but after a second time, it will be no problem. On my left, the Boulder street lights were in the near distance. On my right, was an incredible view of these snow capped mountains. I wish the really cool hammock in the photo aboved was mine for the night. It would have been great sleeping directly under the stars..."
  }),
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
