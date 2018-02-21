$('.counter').each(function () {
  var fullNum = $(this).text();
  // var Decimal = fullNum.split(',')[1];
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
});
