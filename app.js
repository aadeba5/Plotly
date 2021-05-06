// import os

// import pandas as pd
// import numpy as np

// import sqlalchemy
// from sqlalchemy.ext.automap import automap_base
// from sqlalchemy.orm import Session
// from sqlalchemy import create_engine

// from flask import Flask, jsonify, render_template
// from flask_sqlalchemy import SQLAlchemy

// app = Flask(__name__)


// #################################################
// # Database Setup
// #################################################

// app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/bellybutton.sqlite'
// db = SQLAlchemy(app)

// # reflect an existing database into a new model
// Base = automap_base()
// # reflect the tables
// Base.prepare(db.engine, reflect=True)

// # Save references to each table
// Samples_Metadata = Base.classes.sample_metadata
// Samples = Base.classes.samples


// @app.route("/")
// def index():
//     """Return the homepage."""
//     return render_template("index.html")


// @app.route("/names")
// def names():
//     """Return a list of sample names."""

//     # Use Pandas to perform the sql query
//     stmt = db.session.query(Samples).statement
//     df = pd.read_sql_query(stmt, db.session.bind)

//     # Return a list of the column names (sample names)
//     return jsonify(list(df.columns)[2:])


// @app.route("/metadata/<sample>")
// def sample_metadata(sample):
//     """Return the MetaData for a given sample."""
//     sel = [
//         Samples_Metadata.sample,
//         Samples_Metadata.ETHNICITY,
//         Samples_Metadata.GENDER,
//         Samples_Metadata.AGE,
//         Samples_Metadata.LOCATION,
//         Samples_Metadata.BBTYPE,
//         Samples_Metadata.WFREQ,
//     ]

//     results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

//     # Create a dictionary entry for each row of metadata information
//     sample_metadata = {}
//     for result in results:
//         sample_metadata["sample"] = result[0]
//         sample_metadata["ETHNICITY"] = result[1]
//         sample_metadata["GENDER"] = result[2]
//         sample_metadata["AGE"] = result[3]
//         sample_metadata["LOCATION"] = result[4]
//         sample_metadata["BBTYPE"] = result[5]
//         sample_metadata["WFREQ"] = result[6]

//     print(sample_metadata)
//     return jsonify(sample_metadata)


// @app.route("/samples/<sample>")
// def samples(sample):
//     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
//     stmt = db.session.query(Samples).statement
//     df = pd.read_sql_query(stmt, db.session.bind)

//     # Filter the data based on the sample number and
//     # only keep rows with values above 1
//     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]

//     # Sort by sample
//     sample_data.sort_values(by=sample, ascending=False, inplace=True)

//     # Format the data to send as json
//     data = {
//         "otu_ids": sample_data.otu_id.values.tolist(),
//         "sample_values": sample_data[sample].values.tolist(),
//         "otu_labels": sample_data.otu_label.tolist(),
//     }
//     return jsonify(data)


// if __name__ == "__main__":
//     app.run()
//  76  belly_button-plotly/app.js 
// @@ -0,0 +1,76 @@
// function renderChart(id) {
//     console.log(id);
//     // get the data from the json file
//     d3.json("data/samples.json").then((data)=> {
//         console.log(data)

//         var samples = data.samples.filter(s => s.id.toString() === id)[0];

//         console.log(samples);

//         var trace = {
//             x: samples.sample_values.slice(0, 10),
//             y: samples.otu_ids.slice(0, 10),
//             type:"bar",
//             orientation: "h",
//             text: samples.otu_labels.slice(0, 10),
//             width: 100
//         }

//         var data = [trace]

//         var layout = {
//             margin: {
//                 l: 100,
//                 r: 100,
//                 t: 10,
//                 b: 100
//             }
//         }

//         Plotly.newPlot("bar", data, layout)
//     });
// }

// function renderInfo(id) {
//     d3.json("data/samples.json").then((data)=> {

//         var metadata = data.metadata;

//         console.log(id, metadata)

//         var result = metadata.filter(meta => meta.id.toString() === id)[0];

//         var demographicInfoPanel = d3.select("#sample-metadata");
//         demographicInfoPanel.html("");

//         Object.entries(result).forEach((key) => {
//             if(key[0] !== "id") {
//                 demographicInfoPanel.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
//             }
//         });
//     });
// }

// function optionChanged(id) {
//     renderChart(id);
//     renderInfo(id);
// }

// function init() {
//     // select dropdown menu 
//     var dropdown = d3.select("#selDataset");

//     d3.json("data/samples.json").then((data)=> {
//         console.log(data)

//         data.names.forEach(function(name) {
//             dropdown.append("option").text(name).property("value", name);
//         });

//         renderChart(data.names[0]);
//         renderInfo(data.names[0]);
//     });
// }

// init();
//  119  belly_button-plotly/app1.js 
// @@ -0,0 +1,119 @@
// // read the data file to get necessary data for the plots
// d3.json("data/samples.json").then((data) => {
//     console.log(data);

//     var values = data.samples;
//     console.log(values);

//     // grab id, ethnicity, gender, age, location, bb type and wfreq information
//     var metaData = data.metadata;
//     console.log(metaData);

//     var id = metaData.map(d => d.id);
//     console.log(id);

//     var ethnicity = metaData.map(d => d.ethnicity);
//     console.log(ethnicity);

//     var gender = metaData.map(d => d.gender);
//     console.log(gender);

//     var age = metaData.map(d => d.age);
//     console.log(age);

//     var bbType = metaData.map(d => d.bbtype);
//     console.log(bbType)

//     var wFreq = metaData.map( d => d.wfreq);
//     console.log(wFreq);

//     // grab the sample values from the values array
//     var sample_values = values.map(d => d.sample_values);
//     console.log(sample_values);

//     // select top 10 sample_values
//     var top_otus = sample_values.map(d => d.slice(0,10));
//     console.log(top_otus);

//     // grab the ids from the values array
//     var otu_ids = values.map( d => d.otu_ids);
//     console.log(otu_ids);

//     // get top 10 otu ids
//     var top_ids = otu_ids.map( d => d.slice(0,10));
//     console.log(top_ids);

//     // grab the labels from the values array
//     var otu_labels = values.map( d => d.otu_labels);
//     console.log(otu_labels);

//     // get top 10 otu lables
//     var top_labels = otu_labels.map( d => d.slice(0,10));
//     console.log(top_labels)


//     // create the trace variable for the plot
//     var trace = {
//         x: top_otus[0],
//         y: top_ids[0],
//         type:"bar",
//         orientation:"h",
//         //text: top_labels[0] 
//     };

//     var data = [trace];

//     var layout = {
//         margin: {
//             l: 100,
//             r: 100,
//             t: 0,
//             b: 100
//           }
//     }


//     Plotly.newPlot("bar", data, layout);

// });   

// var option = d3.select("#selDataset").append("option")



//  var list = d3.select("#sample-metadata").append("ul")
//       list.append("li").text("AGE:")
//       list.append("li").text("BBTYPE:")
//       list.append("li").text("ETHNICITY:")
//       list.append("li").text("GENDER:")
//       list.append("li").text("LOCATION:")
//       list.append("li").text("WFREQ:")
//       list.append("li").text("sample:")







// // select the dropdown and create an event handler 
// // d3.select("#selDataset").on("change", getData);

// // // Create the getData function
// // function getData(){
// //     var dropdownMenu= d3.select("#selDataset")
// //     var inputId = dropdownMenu.property("values");

// //     var new_id = []

// //     if (inputId == otu_ids){

// //         new_id = otu_ids;
// //     }

// //     updatePlotly(new_id)    
// // }

// // function updatePlotly(d){
// //     Plotly.restlye("bar", "x", [x])
// // }
//  0  bellybbutton-plotly/data/samples.json → belly_button-plotly/data/samples.json 
// File renamed without changes.
//   6  bellybbutton-plotly/index.html → belly_button-plotly/index.html 
// @@ -44,11 +44,11 @@ <h3 class="panel-title">Demographic Info</h3>
//       </div>
//     </div>
//   </div>

  
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.5.0/d3.js"></script>
//   <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
//   <script src="./static/js/app.js"></script>
//   <script src="./static/js/bonus.js"></script>
//   <script src="app.js"></script>
//   <!--<script src="./static/js/bonus.js"></script>-->

// </body>