// /**
//  * Helper function to select stock data
//  * Returns an array of values
//  * @param {array} rows
//  * @param {integer} index
//  * index 0 - Name
//  * index 1 - Metadata
//  * index 2 - Samples

//  */
 function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// // Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

//   // Select the input value from the form
  var samples = d3.select("#sampleInput").node().value;
  console.log(samples);

//   // clear the input value
  d3.select("#sampleInput").node().value = "";

//   // Build the plot with the new stock
  buildPlot(samples);
}

// // function buildPlot(stock) {
  var apiKey = "mWsJgyznw6YT1xx-qecH";

  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

  d3.json(.../samples.json).then(function(data) {

//     // Grab values from the response json object to build the plots
    var name = data.dataset.name;
    var metadata = data.dataset.dataset_code;
    var samples = data.dataset.samples;
    var endDate = data.dataset.end_date;
    var metadata = unpack(data.dataset.data, 0);
    var samples = unpack(data.dataset.data, 1);
  

    var trace1 = {
      type: "bellybutton",
      mode: "bar",
      name: name,
      x: otu_ids,
      y: sample_values,
      line: {
        color: "#17BECF"
      }
    };

//     // // Candlestick Trace
    var trace2 = {
      type: "candlestick",
      x: dates,
      high: highPrices,
      low: lowPrices,
      open: openingPrices,
      close: closingPrices
    };

//     var data = [trace1];

//     var layout = {
      title: `${samples} sample values`,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      };
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);
  });
}

// // Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);
