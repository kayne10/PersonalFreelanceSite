// Smooth scroll
$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});

// Skills
$(function(){

  var skills = $("li[data-score]"),
    skillScore = "<div class='skill-score'></div>";

  skills.append(skillScore);

  for(var i = 0; i < skills.length; i++) {

    var el = $(skills[i]),
      skillScore = el.children(".skill-score"),
      score = el.data("score"),
      diff = 5 - score;

    for(var j = 0; j < score; j++) {
      skillScore.append(" &#x2605; ")
            .css('color', '#4DB8E5');
    }

    for(var x = 0; x < diff; x++) {
      skillScore.append(" &#x2606; ");
    }

  }

});


// Explore Category Filters

function musicFilter() {

}

function hikingFilter() {

}



// Index page animations

var navbar = document.getElementById('cd-header-nav');

navbar.style.display = 'none';

function indexAnimation() {
  $("#cd-header-nav").fadeIn();
}

function AnimationCallback() {
  setTimeout(function() { indexAnimation(); }, 1000);
}

AnimationCallback();
