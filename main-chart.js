var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};
// Config for the chart
var config = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [
                2,
                60,
                12,
                4,
                5,
                5,
                4,
                8,
            ],
            borderColor: 'rgba(0, 0, 0, 0.0)',
            backgroundColor: [
                'rgb(37, 110, 230)',
                'rgb(228, 25, 117)',
                'rgb(126, 0, 149)',
                'rgb(30, 45, 96)',
                'rgb(99, 220, 237)',
                'rgb(245, 175, 1)',
                'rgb(132, 219, 44)',
                'rgb(255, 255, 255)',
            ],
            label: 'Token Distribution',
        }],
        labels: [
          "Pre-sale",
          "ICO Crowd Sale",
          "Founders & Team",
          "Advisers & Ambassadors",
          "Invenstors",
          "iCasting bounty community",
          "Future partners",
          "Bonus",
        ]
    },
    options: {
        cutoutPercentage: '70',
        responsive: true,
        legend: {
          display: false,
        },
        layout: {
            padding: {
              left: 64,
              right: 64,
              top: 64,
              bottom: 64,
            },
        },
        title: {
          display: false,
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          enabled: false,
        },
        plugins: {
          deferred: {
            "xOffset": "50%",
            "delay": 150,
          },
        },
        //This code is for a custom callBack for the legend and return the color of the chart
        legendCallback: function(chart) {
          console.log(chart.data.datasets[0]);
          var text = [];
          text.push('<ul class="chart-legend ' + chart.id + '-legend">');
          for (var i=0; i<chart.data.datasets[0].data.length; i++) {
              text.push('<li class="legend-item">');
              text.push('<span class="part-ammount">' + chart.data.datasets[0].data[i]+ '%'+ '</span>');
              if (chart.data.labels[i]) {
                  text.push(chart.data.labels[i]);
              }
              text.push('<div class="circle"></div>');
              text.push('</li>');
          }
          text.push('</ul>');
          return text.join("");
        }
    }
};

//Some random color function for testing the charts interaction
function rColor() {
  var rColor1 = Math.floor(Math.random() * 244) + 1;
  var rColor2 = Math.floor(Math.random() * 244) + 1;
  var rColor3 = Math.floor(Math.random() * 244) + 1;
  return "rgb(" + rColor1 + ", " + rColor2 + ", " + rColor3  + ")";
}

window.onload = function() {


  var draw = Chart.controllers.doughnut.prototype.draw;
    Chart.controllers.doughnut = Chart.controllers.doughnut.extend({
      draw: function() {
          draw.apply(this, arguments);
          let ctx = this.chart.chart.ctx;
          let _fill = ctx.fill;
          ctx.fill = function() {
              ctx.save();
              ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
              ctx.shadowBlur = 30;
              ctx.shadowOffsetX = 1;
              ctx.shadowOffsetY = 1;
              _fill.apply(this, arguments)
              ctx.restore();
          }
      }
    });

    // Define chart
    var ctx = $("#chart-area");
    var myDoughnut = new Chart(ctx, config);

    // Generates the new custom chart
    $(".chartLegend").html(myDoughnut.generateLegend());

    $( "#chart-area" ).on( "click", function(evt) {
      var activePoints = myDoughnut.getElementsAtEvent(evt);
      var firstPoint = activePoints[0];
      var label = myDoughnut.data.labels[firstPoint._index];
      var value = myDoughnut.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];

      //console.log(label + ": " + value + "% ");

      var clickedIndex = firstPoint._index++;
      $(".chartLegend li .circle").removeClass("active");
      $( ".chartLegend li:nth-child(" + firstPoint._index + ") .circle" ).toggleClass( "active" );

      // Update
      myDoughnut.update();
      rSize(firstPoint._index);
    });

    // On click event for the custom legend
    // It will change the backgroundcolor
    $(".chartLegend").on('click', "li", function() {
      //console.log("Index: " + $(this).index() );

      var value = $(this).index() + 1;
      $(".chartLegend li .circle").removeClass("active");
      $( ".chartLegend li:nth-child(" + value + ") .circle" ).toggleClass( "active" );

      // Makes the chart bigger if clicked on the a label
      //myData.data[ $(this).index() ] += 1;

      //myData.backgroundColor[ $(this).index() ] = rColor();
      //myData.hoverBackgroundColor[ $(this).index() ] = Chart.defaults.global.defaultColor;

      // Update
      myDoughnut.update();

      rSize($(this).index());

      // This logs the value of the label
      //console.log(myData.data[$(this).index()]);
    });

    function rSize(currentVal) {
      var myData = myDoughnut.data.datasets[0];
      var thisPart = myData._meta[0].data[ currentVal ];
      //console.log(thisPart);
      var innerRadius = thisPart._model["innerRadius"]*1.02;
      var outerRadius = thisPart._model["outerRadius"]*1.02;

      myData._meta[0].data[ currentVal ]._model["innerRadius"] = (innerRadius*0.98);
      myData._meta[0].data[ currentVal ]._model["outerRadius"] = (outerRadius*1.007);
    }
};

$('.chart-legend').scrollbar();
