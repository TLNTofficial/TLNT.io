$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

var countUp = 0;

$(window).on('resize scroll', function() {
  $('.stats__single--counter').each(function() {
    if ($(this).isInViewport()) {
      if(countUp < 3){
        var fullNum = $(this).text();
        var Decimal = fullNum.split(',')[1];
        if(typeof Decimal == "string"){
          Decimal = ","+Decimal;
        } else {
          Decimal = "";
        }
        $(this).prop('Counter',0).animate({
          Counter: fullNum
        }, {
          duration: 1500,
          easing: 'swing',
          step: function (now) {
            $(this).text(Math.ceil(now));
          }
        });
      }
      countUp++
    }
  })
})

$(document).ready(function(){
  $(window).bind('resize scroll load', function() {
    var leftOffset = $('.content--left').offset().left;
    var targetLeft = $('.content--left .image-block');

    targetLeft.css("left", -Math.abs(leftOffset));

   });
});

window.sr = ScrollReveal();
sr.reveal('header .image-wrapper', { duration: 1500 });
sr.reveal('.video .content--right', { duration: 1500 });
sr.reveal('.video .image-wrapper', { delay: 400, duration: 1500 });
sr.reveal('.pilot .content--left', { duration: 1500 });
sr.reveal('.pilot .order-first', { delay: 400, duration: 1500 });
sr.reveal('.stats');
