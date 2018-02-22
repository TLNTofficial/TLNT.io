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
          duration: 3000,
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


$(document).on("ready", function() {
  var d = $( ".pilot .content--left" );
  var offset = d.offset();

  console.log("is at " + offset.left + "," + offset.top + " of document");
});
