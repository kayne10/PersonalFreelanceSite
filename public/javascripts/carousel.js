

var carousel = document.getElementById('carousel');
var counter = 0;


var images = [
  'dark-fall-mountains',
  'fall-color-border',
  'fall-tree-and-sky',
  'misty-road',
  'pumpkin-patch'
];

function slideshow() {

  // if we're on the last image, reset counter to 0
  if (counter >= images.length) {
    counter = 0;
    carousel.style.backgroundImage = "url(images/" + images[counter] + ".jpg)";
  } else if (counter === -1) {
    // if we're on the first image and hit the back, set counter to the last image
    counter = images.length - 1;
    carousel.style.backgroundImage = "url(images/" + images[counter] + ".jpg)";
  } else {
    // Otherwise just show the image
      carousel.style.backgroundImage = "url(images/" + images[counter] + ".jpg)";
  }
}

slideshow();
function nextImage() {
  counter++;
  slideshow();
}

function previousImage() {
  counter--;
  slideshow();
}

function startTimer() {
  setInterval(nextImage,4000);
}
startTimer();
