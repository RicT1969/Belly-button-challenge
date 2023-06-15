// //Set up the url as a constant variable to get data endpoint

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it for inspection of data formats
d3.json(url).then(function(data) {
  

//----------------------------------------------------------------------------------------
//data holds 3 main arrays:
//metadata - with details of the test subject
//names - with the ids of test subjects
//samples - with details of the bacteria found.
//----------------------------------------------------------------------------------------
//Structure of code  - set up dashboard and elements and then automate selection functions
//----------------------------------------------------------------------------------------


// Initialize variables to hold data as arrays

// variable for Names array
    let names = data.names; 
      console.log(names);

  //variable for Metadata array  
    let meta = data.metadata;
      console.log(meta);
    
  //variable for Sample array
    let samples = data.samples;
      console.log(samples);


  function sampleId(subjectId) {
      return subjectId.id;
    };

//*************************************************************************************** */
  //Function to build Dropdown menu.
//*************************************************************************************** */
// On change to the DOM, call getData()
let dropDown = d3.selectAll("#selDataset")

  names.forEach((id) => {
  dropDown.append("option")
  .text(id)
  .property("value",id);

});
// set up a vairable to hold the selected id

// //*************************************************************************************** */   
//   //Function to build bar chart
// //*************************************************************************************** */
  let sample = samples.filter(sampleId);
  
  //Retrieve the element at index 0 in sample array (this will help for user selection)

  sampleChart = sample[0];

// //------------------------------------------------------------------------------------------
// // **structure of sample array**
// //   id - the test subject id
// //   otu_ids - the specimen samples
// //   otu_labels - specimen names
// //   sample_vales

// //-----------------------------------------------------------------------------------------
 //Retrieve elements required for chart and assign to variables
 let specimenId = sampleChart.otu_ids;
 let specimenLabels = sampleChart.otu_labels;
 let specimenValues = sampleChart.sample_values;

 //Sort and slice SampleValues for chart
   // Sort the array in descending order of occurrence and assign the results to a variable
  let sorted = specimenValues.sort((a, b) => b.sampleVal - a.sampleVal);

  // slice sample values to produce the top 10 results
  let sliceValues = sorted.slice(0,10);
 
  // Reverse the array to accommodate Plotly's defaults
  let reverseValue = sliceValues.reverse();

  //Set variable for the rollover text
  let idName = specimenLabels.map(object =>`otu_ ${specimenLabels}`);

 // Setup y-axis labels for label.id

 let specimenSlice = specimenId.slice(0,10);
 let sortSpec = specimenSlice.map(id => `otu_ ${id} `);

 let specimens = sortSpec.reverse();

let trace1 = {
  x: reverseValue,
  y: specimens, //Label otu_ids on the y-axis
  text: idName,// Label otu_labels as hover text
  type: 'bar',
  orientation: 'h'
};

//Set up the layout of the Chart
let layout = {
  title: `The Top Ten Bacterial Species Found in Subject ${sampleChart.id}`
}

//Set up the trace variable for the chart
let traceData = [trace1];

Plotly.newPlot('bar', traceData, layout);

// ***************************************************************************************
//   Function to build Demographic summary
// ***************************************************************************************
//Filter based on the value of the sample

// let value = meta.filter(result => result.id == subjectId);
// Get the first index from the array
let demographic = meta[0];
// let subjectData = value[0]
console.log(demographic);

const panelBody = d3.select("#sample-metadata");

// // Clear the panel body
panelBody.html("");

// // Iterate over the data object and append the key-val
// //ue pairs as paragraphs
Object.entries(demographic).forEach(([key, value]) => {
  console.log(key, value);

  d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

// ***************************************************************************************
//  Build Bubble Graph
// *************************************************************************************** 
    //Use vairables set in the bar graph
      // call variable for sample data
      // let specimenId = sampleChart.otu_ids;
      // let specimenLabels = sampleChart.otu_labels;
      // let specimenValues = sampleChart.sample_values;

      // Log the data to the console
      console.log(specimenId,specimenLabels,specimenValues);
      
      // Set up the trace for bubble chart
      let trace2 = {
          x: specimenId,
          y: specimenValues,
          text: specimenLabels,
          type: "bubble",
          mode: "markers",
          marker: {
              size: specimenValues,
              color: specimenId,
              colorscale: "Earth"
          }
      };

      // Set up the layout
      let layout2 = {
          title: `Types of Bacteria Found in Subject ${sampleChart.id}`,
          hovermode: "closest",
          xaxis: {title: "OTU ID"},
      };

      // // Call Plotly to plot the bubble chart
      Plotly.newPlot("bubble", [trace2], layout2)

    });

// ***************************************************************************************
