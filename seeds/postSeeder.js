var Post = require('../models/post');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('localhost:27017/freelance');

var posts = [
  new Post({
    category: "hike",
    imagePath: "/images/blog/royal_arch.jpg",
    title: "Royal Arch",
    description: "The Royal Arch is a short yet surprisingly steep hike in Boulder, Colorado. As of one of the many routes on Chatauqua, the Royal Arch is one my favorite hikes. The end is truly satisfying while admiring the scenic view and the beauty of this massive arch-shaped rock."
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
    description: "The journey to Bear Peak is extremely exhausting for being the highest peak in Boulder. Prepare well if you pursue this hike. It may take all day to get to the top, but once you reach it, the view is truly breath-taking and is definitely worth it! I came across some beautiful wild life on this journey."
  }),
  new Post({
    category: "hike",
    imagePath: "/images/blog/flatiron.jpg",
    title: "Mallory Cave",
    description: "Although this is not the best photo that represents the Mallory Cave, I could not get access to the cave due to the reason that bats inhabit the cave. At the end of the hike, there is a small climb you have to do if you want to get up close to the cave. The photo above illustrates the magnificient view after the climb."
  }),
  new Post({
    category: "camp",
    imagePath: "/images/blog/moab.jpg",
    title: "Camping in Moab",
    description: "Outside the border of Arches National Park, my friends and I found this remarkable camping spot where there was absolutely no sign of anyone else in miles. At night time, the stars were not shy at all, as the milky way was very noticeable. It was an amazing sight that I can not take for granted. Along with the beautiful night, Moab's massive canyons and sandstone had been existed for many years. It was truly aspring to walk along the sand and rocks of Moab."
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
