// Vertical Nav
jQuery(document).ready(function($){
	var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('is-selected');
			}else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	600
        );
	}
});

// Main Nav Smooth Scroll
jQuery(document).ready(function($){
  var contentSections = $('.cd-section'),
    navigationItems = $('#cd-main-nav a');

  updateNavigation();
  $(window).on('scroll', function(){
    updateNavigation();
  });

  //smooth scroll to the section
  navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

  function updateNavigation() {
    contentSections.each(function(){
      $this = $(this);
      var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
      if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
        navigationItems.eq(activeSection).addClass('is-selected');
      }else {
        navigationItems.eq(activeSection).removeClass('is-selected');
      }
    });
  }

  function smoothScroll(target) {
        $('body,html').animate(
          {'scrollTop':target.offset().top},
          600
        );
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