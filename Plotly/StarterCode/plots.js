var apiKey = "mWsJgyznw6YT1xx-qecH";

/* global Plotly */
var url =
  `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

function buildPlot() {
  d3.json(url).then(function(data) {

    // Grab values from the data json object to build the plots
    var name = data.dataset.name;
    var location = data.dataset.location;
    var age = data.dataset.age;
    var bbtype = data.dataset.bbtype;
    // var dates = unpack(data.dataset.data, 0);
    // var closingPrices = unpack(data.dataset.data, 4);

    var selectorOptions = {
      buttons: [{
          step: 'names',
          stepmode: 'backward',
          count: 1,
          label: '1n'
      }, {
          step: 'location',
          stepmode: 'backward',
          count: 6,
          label: '6n'
      }, {
          step: 'age',
          stepmode: 'todate',
          count: 1,
          label: 'YTD'
      }, {
          step: 'age',
          stepmode: 'backward',
          count: 1,
          label: '1y'
      }, {
          step: 'bbtype',
          stepmode: 'backward',
          count: 5,
          label: 5n
      },
      
      {
          step: 'all',
      }],
    };

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: location,
      y: bbtype,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    var layout = {
      title: `${bbtype} locations`,
      xaxis: {
        rangeselector: selectorOptions,
        rangeslider: {}
      },
      yaxis: {
        fixedrange: true
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
}

buildPlot();
