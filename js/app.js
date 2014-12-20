var app = {
  system: 'sysA'
};

var bindPopovers = function () {
  "use strict";
  $("#lifetime")
    .popover({
      content: "Eg. value is 30",
      trigger: 'focus',
      placement: 'top'
    });
};

var compute = function () {
  "use strict";

  /*var data = {
    labels: ["Initial total cost of System/sq.m", "Total Cost/sq.m", "Project Cost for full size(over lifetime)", "Life cycle cost per year", "Life cycle cost for 5yrs"],
    datasets: [
      {
        label: "System A",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: [38.68, 38.7, 386784, 12983, 64464]
        },
      {
        label: "System B",
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        data: [27.50, 46.5, 465273, 23264, 116318]
        }
    ]
  };

  var ctx = $("#costSummary").get(0).getContext("2d");
  var chart = new Chart(ctx).Bar(data, {
    tooltipTitleFontSize : 0
  });*/

  $('.compare-row').each(function () {
    var elems = $('td.compare-data', $(this));
    elems.removeClass('success');
    if (elems) {
      var smallest = elems[0];
      for (var i = 1; i < elems.length; i++) {
        if (parseFloat(elems[i].innerHTML) < parseFloat(smallest.innerHTML)) {
          smallest = elems[i];
        }
      }
      $(smallest).addClass('success');
    }
  });
  $('#costModal').modal({
    show: true
  });
};

$(document).ready(function () {
  "use strict";
  bindPopovers();
  $(document).on('syschanged', function (event, id) {
    app.system = id;
    console.log(app.system);
  });
});