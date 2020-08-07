// This function is only called by the onchange attribute of the dropdown menu in index.html
// newSample refers to the value of the selected menu option. In index.html, onchange=optionChanged(this.value) passes the selected menu option’s value
// to the optionChanged() function. This function gives this information the argument name newSample. In other words, this.value and newSample are equivalent.
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

// When a dropdown menu option is selected, the ID number is passed into the function as a sample 
function buildMetadata(sample) {
    // Pulls in the entire json dataset and refers to it as data
    d3.json("samples.json").then((data) => {
        // The metadata array in the dataset (data.metadata) is assigned the variable metadata.
        var metadata = data.metadata;
        // Filter data based on ID saved in sample
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        // The results of the filter() method are returned as an array, so the first item in the array is selected and assigned to the variable result
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");

        // Ensures that the contents of the panel are cleared when another ID number is chosen from the dropdown menu
        PANEL.html("");
        // Add each key and value pair to the panel
        Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

function buildCharts(sample) {
    // Create axis arrays
    var yData = [];
    var yAxis = [];
    var hoverText = [];
    
    // Pulls in the entire json dataset and refers to it as data
    d3.json("samples.json").then((data) => {  
        // The samples array in the dataset (data.samples) is assigned the variable samples.
        var samples = data.samples;
        // Filter data based on ID saved in sample
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        // Sort the Array of arrays 
        var sortedArray = resultArray.samples_values.sort((a,b) => {b-a});
        // Slice array to show top 10
        var filteredArray = sortedArray.samples_values.slice(0,10);

        // Assign values from filtered array to chart axis values
        xData = filteredArray.samples_values
        yaxis = filteredArray.otu_ids
        hoverText = filteredArray.otu_labels
    )};

    // Create bar chart
    var trace = {
        y: [yData],
        type: "bar",
        text: [hoverText]
    };

    var layout = {
        title: "Top 10 Bacterial Species",
        xaxis: {title: "Amount Present in Sample"},
        yaxis: {yAxis}
    };
    Plotly.newPlot("bar",[trace],layout);
};

// Creates a dropdown menu of ID numbers dynamically.
// Function is both declared and called in plots.js.
function init() {
    // Select the dropdown menu, which has an id of #selDataset
    var selector = d3.select("#selDataset");
  
    // Read the data from samples.json. The data from the entire file is assigned the data argument
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
    });
})}
  
init();
