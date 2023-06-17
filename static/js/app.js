// //Set up the url as a variable to retrieve data

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"



// Fetch the JSON data and console log it for inspection of data formats
d3.json(url).then((data) => {
  console.log(data);
});
//----------------------------------------------------------------------------------------
//data holds 3 main arrays:
//metadata - with details of the test subject
//names - with the ids of test subjects
//samples - with details of the bacteria found.

//***************************************************************************************
  //Build Dropdown menu.
//***************************************************************************************


// set up function for plots and to allow dropdown to retrieve data

function init() {
  let dropDown = d3.selectAll("#selDataset"); 
    
  d3.json(url).then(function(data) {
    console.log(data);

    let name = data.names; 
    console.log(name);

    // Function to go through the names array and add to append.  
      // let dropdownMenu = d3.select("#selDataset");
      name.forEach((id) => {
      dropDown.append("option").text(id).property("value",id);
      });
    
      let nameId = name[0];

    // call functions for dashboard elements and for the inital display of data (using the first name.i: 940)
    barChart(nameId);
    demographicPanel(nameId);
    bubbleChart(nameId); 
})};

// //***************************************************************************************   
//   //Build bar chart
// //***************************************************************************************
  
// //---------------------------------------------------------------------------------------
// // **structure of sample array**
// //   id - the test subject id
// //   otu_ids - the specimen samples
// //   otu_labels - specimen names
// //   sample_vales

// //---------------------------------------------------------------------------------------
function barChart(selected) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
      console.log(data);

// //------------------------------------------------------------------------------------------
// // **structure of sample array**
// //   id - the test subject id
// //   otu_ids - the specimen samples
// //   otu_labels - specimen names
// //   sample_vales

// //-----------------------------------------------------------------------------------------
 
// extract samples' array from the fetched data
let samples = data.samples;

//Filter sample array to find objects where the id property matches the selectedValue
let filterVal = samples.filter(sample => sample.id === selected);

filterVal.sort((a,b) => b.otu_id - a.otu_id)

let sampleVal = filterVal[0];

let specimenValues = sampleVal.sample_values;
let specimenId = sampleVal.otu_ids;
let specimenLabels = sampleVal.otu_labels;


//display only top ten values in descending order
let yaxis = specimenId.slice(0,10).map(id => `otu_ ${id} `).reverse();
let xaxis = specimenValues.slice(0,10).reverse();
let text = specimenLabels.slice(0,10).reverse();

console.log(xaxis, yaxis)
    
let trace1 = {
  x: xaxis,//value of sample_values
  y: yaxis, //Label otu_ids on the y-axis
  text: text,// Label otu_labels as hover text
  type: 'bar',
  orientation: 'h'
};

//Set up the layout of the Chart
let layout = {
  title: `The Top Ten Bacterial Species Found in Subject ${sampleVal.id}`
}

//Set up the trace variable for the chart
let traceData = [trace1];

Plotly.newPlot('bar', traceData, layout);

  });
}
// ***************************************************************************************
//   Populate Demographic Summary
// ***************************************************************************************
//Filter based on the value of the sample
function demographicPanel(selected) {

  d3.json(url).then((data) => {
    console.log(data);

  // extract metadata array from the fetched data
  let meta = data.metadata;
  console.log(meta); 

 //Filter metadata array to find objects where the id property matches the selectedValue
  let filteredMeta = meta.filter((subject) => subject.id == selected);
  console.log(filteredMeta);
  
  let subjectMeta = filteredMeta[0];

  console.log(subjectMeta);

  // Clear child elements in panel body
  const panelBody = d3.select("#sample-metadata");
  panelBody.html("");

  // // Iterate over the data object and append key-value pairs
  Object.entries(subjectMeta).forEach(([key, value]) => {
    console.log(key, value);

    //Add a h5 child element for each key-value pair to the div with id sample-metadata
    d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
})};
// ***************************************************************************************
//  Build Bubble Graph
// *************************************************************************************** 

// Function for bubble chart
function bubbleChart(selected) {

  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    console.log(data);

    // extract samples' array from the fetched data
    let samples = data.samples;

    //Filter sample array to find objects where the id property matches the selectedValue 
    let filterVal = samples.filter((subject) => subject.id === selected);

    let sampleVal = filterVal[0];

    let sampleValues = sampleVal.sample_values;
    let sampleId = sampleVal.otu_ids;
    let sampleLabels = sampleVal.otu_labels;

  console.log(sampleId, sampleValues)
  // Set up the trace for bubble chart
  // select colurscale - https://plotly.com/javascript/colorscales/#custom-colorscale
  let trace2 = {
    x: sampleId,
    y: sampleValues,
    text: sampleLabels,
    type: "bubble",
    mode: "markers",
    marker: {
        size: sampleValues,
        color: sampleId,
        colorscale: "Earth"
    }
  };

  // Set up the layout
  let layout2 = {
      title: `Types of Bacteria Found in Subject ${sampleVal.id}`,
      hovermode: "closest",
      xaxis: {title: "OTU ID"},
  };

    // // Call Plotly to plot the bubble chart
    Plotly.newPlot("bubble", [trace2], layout2);
  });  
                                                    
}

// Function to update dashboard when new sample selected
function optionChanged(newValue) { 

  // Log the new value
  console.log(newValue); 

  // Call all functions 
  barChart(newValue);
  demographicPanel(newValue);
  bubbleChart(newValue);
 
};

 init();
// ***************************************************************************************
