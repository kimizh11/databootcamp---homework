// from data.js
var tableData = data;

// YOUR CODE HERE!
// Get a reference to the table body from index.html
var tbody = d3.select("tbody");

// For each UFO object in data
tableData.forEach((ufoItem) => {
    Object.keys(ufoItem).forEach(key => key);
    //Append a row (tr) element
    var row = tbody.append("tr");
    //For each key, value entry in UFO object
    Object.entries(ufoItem).forEach(([key, value]) => {
      //Append a cell (td) to the row for each value in the UFO object
      var cell = row.append("td");
      //Now append the value to the cell
      cell.text(value);
    });
  });

 // Select the filter button
 var submit = d3.select("#filter-btn");

 submit.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    var filteredData = tableData.filter(ufo => ufo.datetime === inputValue);
    
    if (inputValue == "") {
      filteredData = tableData;
    }

    //console.log(filteredData);

    // Get a reference to the table body from index.html, display filter data
    // First, clear the html area as there is data displayed already
    tbody.html("");
    // For each UFO object in data
    filteredData.forEach((ufo) => {
        
        //Append a row (tr) element
        var row = tbody.append("tr");
        
        //For each key, value entry in UFO object
        Object.entries(ufo).forEach(([key, value]) => {
        //Append a cell (td) to the row for each value in the UFO object
        var cell = row.append("td");
        //Now append the value to the cell
        cell.text(value);
        console.log(`Key: ${key} , Value: ${value}`);
    });
  });


});