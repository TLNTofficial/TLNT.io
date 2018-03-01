$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

function addCounter(element) {
  var fullNum = $( element ).attr("data-number");
  var Decimal = fullNum.split(',')[1];
  if(typeof Decimal == "string"){
    Decimal = ","+Decimal;
  } else {
    Decimal = "";
  }
  $(element).prop('Counter',0).animate({
    Counter: fullNum
  }, {
    duration: 1500,
    easing: 'swing',
    step: function (now) {
      $(element).text(Math.ceil(now));
    }
  });
}

$(window).on('resize scroll', function() {
  if ( $("#counter-1").isInViewport() ) {
    addCounter("#counter-1");
  }
  if ( $("#counter-2").isInViewport() ) {
    addCounter("#counter-2");
  }
  if ( $("#counter-3").isInViewport() ) {
    addCounter("#counter-3");
  }
});

$(document).ready(function(){
  $("form.mailSubscribe").on("submit", function() {
    var element = "<p class='form__msg'>Thanks for subscribing! Please check your inbox to complete the subscription.</p>";
    $( element ).insertAfter( this );
  })

  $(window).bind('resize scroll load', function() {
    var leftOffset = $('.content--left').offset().left;
    var targetLeft = $('.content--left .image-block');

    targetLeft.css("left", -Math.abs(leftOffset));

   });

  $(".nav-item").on('click', function(e) {
    // prevent default anchor click behavior
    e.preventDefault();

    // store hash
    var hash = this.hash;
    // animate
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, function(){
      // when done, add hash to url
      // (default click behaviour)
      window.location.hash = hash;
    });
  });

  $(" .nav-link ").on('click', function(e) {
    if ( $(" .navbar-toggler").attr("aria-expanded") == "true" ) {
        $(" .navbar-toggler, .navbar").attr("aria-expanded", false);
        $(".navbar-collapse").removeClass("show");
    }
  });
});

$(document).ready(function(){
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  var bRad = "2em";

  if( iOS ){
    $("#main-button").css("border-radius", bRad);

    $("#main-button, #sec-button").on("click", function(){
      if( $("#main-button").attr("aria-expanded") == "true" ){
        window.setTimeout(function(){
          $("#main-button").css("border-radius", bRad);
        },500);
      } else {
        $("#main-button").css("border-radius", 0);
      }
    })
  } else {
    $("#main-button").addClass("border-rad");
  }
});


window.sr = ScrollReveal();
sr.reveal('header .image-wrapper', { duration: 1500 });
sr.reveal('.video .content--right', { duration: 1500 });
sr.reveal('.video .image-wrapper', { delay: 400, duration: 1500 });
sr.reveal('.pilot .content--left', { duration: 1500 });
sr.reveal('.pilot .image-wrapper', { delay: 400, duration: 1500 });
sr.reveal('.stats');
