
$(document).ready(function() {



  $('ul li:first-child').addClass('first');
  $('ul li:last-child').addClass('last');


  var owl1 = $("#owl1");
  owl1.owlCarousel({  
    autoPlay: false,
    items : 1,

    loop: false,

    responsiveClass:true,
    responsive:{
      1:{
        items:1
      },
      480:{
        items:1
      },
      768:{
        items:1
      },
      991:{
        items:1
      },
      1169:{
        items:1
      }
    }


  });

  if ($(window).width() > 767) {
    $(window).scroll(function() {
      50 < $(document).scrollTop() ? $("header").addClass("small") : $("header").removeClass("small")
    });
  }


  if ($(window).width() < 768) {
    $('header').addClass('small');
  }


  //Default Action
  $(".tab_content").hide(); //Hide all content
  $("ul.tabs li:first").addClass("active").show(); //Activate first tab
  $(".tab_content:first").show(); //Show first tab content

  //On Click Event
  $("ul.tabs li").click(function() {
    $("ul.tabs li").removeClass("active"); //Remove any "active" class
    $(this).addClass("active"); //Add "active" class to selected tab
    $(".tab_content").hide(); //Hide all tab content
    var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
    $(activeTab).fadeIn(); //Fade in the active content
    return false;

  });


  $('.mobilemenu_btn1').click(function () {

    $(this).toggleClass('open');
    $('header').toggleClass('showm');
    $('#nav').fadeToggle();

    return false;
  });

});



/*$(function(){
        if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {

          $('.parallax-container').height( $(window).height() * 0.5 | 0 );
        } else {
          $(window).resize(function(){
            var parallaxHeight = Math.max($(window).height() * 0.7, 200) | 0;
            $('.parallax-container').height(parallaxHeight);
          }).trigger('resize');
        }
      });
    */

var thumbs = jQuery('#thumbnails').slippry({
  // general elements & wrapper
  slippryWrapper: '<div class="slippry_box thumbnails" />',
  // options
  transition: 'horizontal',
  pager: false,
  auto: false,
  onSlideBefore: function (el, index_old, index_new) {
    jQuery('.thumbs a img').removeClass('active');
    jQuery('img', jQuery('.thumbs a')[index_new]).addClass('active');
  }
});

jQuery('.thumbs a').click(function () {
  thumbs.goToSlide($(this).data('slide'));
  return false;
});