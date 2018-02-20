function makeTimer() {
	var endTime = new Date("22 April 2018 12:00:00 GMT+01:00");
	endTime = (Date.parse(endTime) / 1000);

	var now = new Date();
	now = (Date.parse(now) / 1000);

	var timeLeft = endTime - now;

	var days = Math.floor(timeLeft / 86400);
	var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
	var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
	var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

	if (hours < "10") { hours = "0" + hours; }
	if (minutes < "10") { minutes = "0" + minutes; }
	if (seconds < "10") { seconds = "0" + seconds; }

	$("#days .digits").html(days);
	$("#hours .digits").html(hours);
	$("#minutes .digits").html(minutes);
	$("#seconds .digits").html(seconds);
}

(function($){
  var rellax = new Rellax('.parallax--center', {
    center: true
  });

  var rellax = new Rellax('.parallax--top', {
    center: false
  });

  setInterval(function() { makeTimer(); }, 1000);

})(jQuery);
