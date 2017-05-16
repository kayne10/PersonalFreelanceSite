console.log('javascript is connected');

var counter = 0;
var value = document.getElementById('value');
value.innerHTML = counter;

function addToCart() {
  counter++;
  console.log(counter);
  value.innerHTML = counter;
}

function removeFromCart() {
  if(counter > 0) {
    counter--;
    console.log(counter);
    value.innerHTML = counter;
  }
}

// var cartItems = 5;
// var shopValue = document.getElementById('shopValue');
// shopValue.innerHTML = cartItems;



//Initialize empty array of items
var totalItems = [];

// Item Constructor
function Item(imagePath, name, description, price) {
  this.imagePath = imagePath;
  this.name = name;
  this.description = description;
  this.price = price;
  return {
    imagePath: imagePath,
    name: name,
    description: description,
    price: price
  };
};

// Creating Items
var firstItem = new Item(
  "borderlands2",
  "Borderlands 2",
  "Best RPG shooter in the books!!! There are over a billion guns in this game! Must buy!!",
  40
);
var secondItem = new Item(
  "fishingrod",
  "Fishing Rod",
  "Fishing rod available!! Very good condition and has only been used a few times. Please Buy!!!",
  10
 );
var thirdItem = new Item(
  "gamecube",
  "Nintendo Gamecube",
  "This gamecube is in great condition and has barely been used. I have an emulator now so this has no use to me anymore.",
  20
);
var fourthItem = new Item(
  "halo4",
  "Halo 4",
  "Epic Campaign!!! Buy this product!",
  40
);
var fifthItem = new Item(
  "Nintendo-DS",
  "Nintendo DS",
  "Barely used Nintendo DS. It is working perfectly and I would like to get it off my hands. Please Buy!!",
  30
);
var sixthItem = new Item(
  "snowboard",
  "Snowboard Deck",
  "Deck only!!! Snowboard deck is in great condition! Please buy!",
  50
);

// Collect all items in single array
totalItems.push(firstItem);
totalItems.push(secondItem);
totalItems.push(thirdItem);
totalItems.push(fourthItem);
totalItems.push(fifthItem);
totalItems.push(sixthItem);

//get html elements
var imageContainer = document.getElementsByClassName('itemImage');
var nameContainer = document.getElementsByClassName('itemName');
var descriptionContainer = document.getElementsByClassName('itemDescription');
var priceContainer = document.getElementsByClassName('itemPrice');

// loop through array for html assignments
// for (var i = 0; i < totalItems.length; i++) {
//   imageContainer.style.backgroundImage = "url(img/" + totalItems[i].imagePath + ".jpg)";
//   nameContainer.innerHTML = totalItems[i].name;
//   descriptionContainer.innerHTML = totalItems[i].description;
//   priceContainer.innerHTML = totalItems[i].price;
// };
