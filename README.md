# Belly-button-challenge
An interactive dashboard to explore the Belly Button Biodiversity dataset. It links to an external site, and catalogues the microbes that colonise human navels.
<p>The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare. This is displayed through 3 interactive charts which are displayed on a free static page hosting service (GitHub pages, such as GitHub Pages) using JavaScript. The html file (including css) were provided withint he starter code). The displays are driven by a drop down menu allowing the selection of a subject id (from 153 subjects) and include:<ol>
  <li>a barchart of the top ten bacteria by number found in each subject's navel;</li>
  <li>a panel with the demographic information about the subject (including id, gender, age etc,);</li>
  <li>a bubble chart showing all bacterial specimens per subject by size of population.</li></ol></p>
<p>The bar chart and bubble chart both utise hovertext to display the quantity and the type of bacteria for each sample logged (the top tem in the case og the bar chart) and all samples in the case of the bubble chart.</p>
<p><h3>Notes on the code:</h3><ol>
  <li>I first approached the task plotting out the individual elements with only one smaple showing</li>
  <li>The task of making the graphs interactive proved more challenging and I had to rewrite elements of the code to allow this to happen</li>
  <li>A particular error I found I was making was that any variables set up with reference to the call of the JSON file needed to be included wihtin the function making that call. THerefore there are seperate calls made for each element of the dashboard. In retrospect the code could be imporved by inclduing the charts (the bar and bubbke graph) within the same function, using the same variables for the different elemtns. This would have made the code more efficient</li>
  <li>Another learning was that functions are better decalered than being included within a variable. I found that it as easier to declare functions (such as the sort and split functions) rather than use them to within variables. The latter often caused errors: - '[variable_name]' is not a function. This became an issue when making the charts dynamic as oposed to reporesenting a static value.</li>
 <p><h3>Sources</h3><ul>
<li>https://www.encodedna.com/javascript/populate-select-dropdown-list-with-json-data-using-javascript.htm</li>
<li>https://stackoverflow.com/questions/9329446/loop-for-each-over-an-array-in-javascript</li>
<li>https://thenewtoys.dev/blog/2021/04/17/misusing-map/</li>
<li>https://www.google.com/search?q=setting+up+dashboard%2C+how+to+link+a+chart+to+selected+value+on+dropdown+js.&rlz=1C1ONGR_enAU1054AU1054&oq=setting+up+dashboard%2C+how+to+link+a+chart+to+selected+value+on+dropdown+js.&aqs=chrome..69i57.20260j0j7&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:75def8e2,vid:mH6MfzUJRms</li>
<li>https://plotly.com/javascript/colorscales/</li></ul></p>

