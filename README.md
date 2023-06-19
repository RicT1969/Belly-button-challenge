# Belly-button-challenge
An interactive dashboard to explore the Belly Button Biodiversity dataset. It links to an external site, and catalogues the microbes that colonise human navels.
<p>The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare. This is displayed through 3 interactive charts which are displayed on a free static page hosting service (GitHub pages, such as GitHub Pages) using JavaScript. The html file (including css) were provided withint he starter code).</p><p>The displays are driven by a drop down menu allowing the selection of a subject id (from 153 subjects) and include:<ol>
  <li>a barchart of the top ten bacteria by number found in each subject's navel;</li>
  <li>a panel with the demographic information about the subject (including id, gender, age etc,);</li>
  <li>a bubble chart showing all bacterial specimens per subject by size of population.</li></ol></p>
<p>The bar chart and bubble chart both utilise hovertext to display the quantity and the type of bacteria for each sample logged (the top tem in the case og the bar chart) and all samples in the case of the bubble chart.</p>
<p><h2>Notes on the code:</h2><ol>
<li>JavaScript code fetches the JSON data, populates a dropdown menu with test subject IDs, generates a bar chart, displays demographic information, and creates a bubble graph based on the selected test subject. The dashboard can be updated by selecting different test subjects from the dropdown menu.</li>
<li>Data Retrival</li><ul>
   <li>The data is retreived from "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json". The URL is stored in a variable ('url') and the JSON file is fetched ausing the D3.js library. Once the data is retrieved, it is passed as an argument to the arrow function and inspected using console.log to understand the data structure.</li></ul>
  <li>Dropdown Menu Initialization:</li><ul>
  <li>Define init() function, which serves as the initialization function for the dashboard. It selects the dropdown element with the ID "selDataset" using <b>d3.selectAll("#selDataset")</b> and assigns it to the dropDown variable.</li>
  <li>Another <b>d3.json(url).then(function(data) {...})</b>code block is used to fetch the JSON data again, this time within the <b>init() function.</b></li>
  <li>The second arrow function extracts the IDs of test subject which are then used to populate the dropdown menu by iterating over the name array and appending options to the dropdown element.</li>
  <li>The first ID <b>(name[0])</b> is selected and stored in the nameId variable.</lio>
  <li>Finally, three functions (barChart(), demographicPanel(), and bubbleChart()) are called with the initial nameId to display the corresponding charts and data.</li></ul>
<li>Bar Chart Generation:</li><ul>
  <li>The barChart(selected) function is defined taking the parameter representing the ID of the selected test subject.</li>
  <li>Inside the function, the JSON data is fetched using <b>d3.json(url).then((data) => {...})</b> to retrieve the data for generating the bar chart.</li>
  <li>The samples array (containing details of the bacteria found), is filtered so that the id property matches the selected value and sorted based on the otu_id property.</li>
  <li>The required data for the bar chart (sample values, IDs, and labels) is retreived from the filtered object and the top ten values are selected, reversed (for the purposes of producung the horizontal graph), and assigned to the xaxis and yaxis variables, respectively.</li>
  <li>A trace object (trace1) is defined with x, y, text, and other properties required for the bar chart.</li>
  <li>The trace object is placed inside an array and passed to Plotly.newPlot() along with the layout to create the bar chart in the HTML element with the ID "bar".</li></ul>
<li>Demographic Summary Panel:</li><ul>
  <li>The demographicPanel(selected) function is defined, taking the the ID of the selected test subject as the paramater.</li>
  <li>The function fetches , the JSON data using <b>d3.json(url).then((data) => {...})</b> to retrieve the data for populating the demographic summary panel</li>
  <li>The metadata array, containing details of the test subject, is obatined from the fetched data and filtered to find the object where the id property matches the selected value before assigning to the subjectMeta variable..</li>
  <li>When the display is updated the ID "sample-metadata" tag (within the html file) is cleared using <b>.html("")</b> removing the child elements.</li>
  <li>The key-value pairs of the subjectMeta object are iterated using Object.entries() and For each key-value pair, an h5 child element is appended to the HTML element with the ID "sample-metadata" to display the information.</li></ul> 
<li>Bubble Graph Generation:</li><ul>
  <li>The bubbleChart(selected) function takes the parameter representing the ID of the selected test subject.</li>
  <li>Inside the function, the JSON data is fetched using <b>d3.json(url).then((data) => {...})</b> to get the data for the bubble graph.</li>
  <li>We extract the samples array from the fetched data, containing details of the bacteria found and filter to obtain the id property matching the selected value and a trace object (trace2) defined with x, y, text, and other properties.</li>
  <li>The layout of the graph (layout2) is set up, including the title, hover mode, colour scheme (https://plotly.com/javascript/colorscales) and axis labels. The trace object is placed inside an array and passed to Plotly.newPlot() along with the layout to create the bubble graph in the HTML element with the ID "bubble".</li></ul>
<li>Update Dashboard:</li><ul>
<li>The optionChanged(newValue) function is called when a new sample is selected from the dropdown menu. The barChart(), demographicPanel(), and bubbleChart() functions are called again with the new selected value to update the charts and data.</li></u>

 <p><h3>Sources</h3><ul>
<li>https://www.encodedna.com/javascript/populate-select-dropdown-list-with-json-data-using-javascript.htm</li>
<li>https://stackoverflow.com/questions/9329446/loop-for-each-over-an-array-in-javascript</li>
<li>https://thenewtoys.dev/blog/2021/04/17/misusing-map/</li>
<li>https://www.google.com/search?q=setting+up+dashboard%2C+how+to+link+a+chart+to+selected+value+on+dropdown+js.&rlz=1C1ONGR_enAU1054AU1054&oq=setting+up+dashboard%2C+how+to+link+a+chart+to+selected+value+on+dropdown+js.&aqs=chrome..69i57.20260j0j7&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:75def8e2,vid:mH6MfzUJRms</li>
<li>https://plotly.com/javascript/colorscales/</li></ul></p>

