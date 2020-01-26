function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
  
    // Use `d3.json` to fetch the metadata for a sample
    var url = `/metadata/${sample}`;
    d3.json(url).then(function(sample){
      // Use d3 to select the panel with id of `#sample-metadata`
      var sample_metadata = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      sample_metadata.html("");
  s
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(sample).forEach(function ([key, value]) {
        var row = sample_metadata.append("p");
        row.text(`${key}: ${value}`);
  
  });
    }
  )};
  
  function buildCharts(sample) {
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var url = `/samples/${sample}`;
    d3.json(url).then(function(data) {
  
      // @TODO: Build a Bubble Chart using the sample data
      var exes = data.otu_ids;
      var whys = data.sample_values;
      var bigosmallo = data.sample_values;
      var colors = data.otu_ids; // add a little pizzazz
      var text_stuff = data.otu_labels;
  
      var trace1 = {
        x: exes,
        y: whys,
        text: text_stuff,
        mode: 'markers',
        marker: {
          color: colors,
          size: bigosmallo
        }
      };
  
      var doom = [trace1];
  
      var layout = {
        xaxis: { title: "OTU ID"},
        // how do I get better more interesting colors?
      };
  
      Plotly.newPlot('bubble', doom, layout);
  
  
      // @TODO: Build a Pie Chart
  
  // for some reason this slice stuff freaked out and now its not and I don't know why!?
  
      d3.json(url).then(function(data) {
      var amounts = data.sample_values.slice(0,10);
        var names = data.otu_ids.slice(0,10);
        var alts = data.otu_labels.slice(0,10);
  
        var data = [{
          values: amounts,
          labels: names,
          hovertext: alts,
          type: 'pie'
        }];
  
        Plotly.newPlot('pie', data);
  
      });
    });
  }
  
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();