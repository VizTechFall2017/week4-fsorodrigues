var height = 600;
var width = 800;

var svg = d3.select('svg')
              .attr("height", height)
              .attr("width", width)
              .append("g")
              .attr("transform", "translate(100,100)");

// creating global variable to access csv data
var allData = [];

var scaleX = d3.scaleLinear()
                 .domain([0,450000])
                 .range([0,600])
                 .nice(); // making scale end in round number

var scaleY = d3.scaleLinear()
                .domain([150000,0])
                .range([0,400])
                .nice(); // making scale end in round number

var selectedDepartment = "Boston Police Department"; // setting up "switch" for data change
var unselectedDepartment = "Boston Fire Department"; // setting up initial button text

var button = d3.select(".button")
                .text(unselectedDepartment);

d3.csv("./data.csv", function(error, data) {
    if (error) { throw error };

    allData = data; // passing data to global variable

    // filtering for defaul vizualization
    var initialData = data.filter(function(d) {
      return d.department_name == "Boston Police Department";
    });
    
    // calling title and axis' labels
    chartTitle();
    xLabel();
    yLabel();

    // calling axis
    xAxis(scaleX);
    yAxis(scaleY);

    // drawing circles
    updateData(initialData);

});


function colorFill(d) { if (d.department_name == "Boston Fire Department") {
        return "#FF2819"
} else if (d.department_name == "Boston Police Department") {
        return "#123456"
}};

//defining function to update data
function updateData(dataPoints) {

        // binding data to DOM selection
        var selection = svg.selectAll("circle")
            .data(dataPoints)

       // updating existing circles
       selection.transition()
                .duration(1000)
                .ease(d3.easeSin)
                .attr("cx", function(d) { return scaleX(d.total) })
                .attr("cy", function(d) { return scaleY(d.overtime) })
                .attr("r", 5)
                .attr("fill", colorFill)
                .attr("opacity", .7);

       // entering and appending new circles
        selection.enter().append("circle")
                  .attr("cx", function(d) { return scaleX(d.total) })
                  .attr("cy", function(d) { return scaleY(d.overtime) })
                  .attr("r", 0)
                    .transition()
                    .duration(1000)
                    .ease(d3.easeSin)
                  .attr("r", 5)
                  .attr("fill", colorFill)
                  .attr("opacity", .7);

        // removing unnecessary circles
        selection.exit()
                    .transition()
                    .duration(200)
                    .ease(d3.easeSin)
                  .attr("r", 0)
                 .remove();

};

// defining functions to append title and labels to axis
function chartTitle() {
          svg.append("text")
               .attr("x", 0)
               .attr("y", -25)
               .attr("font-size", 24)
               .text("City of Boston PD and FD payroll, 2016");
};

function xLabel() {
          svg.append("text")
              .attr("x", 300)
              .attr("y", 440)
              .attr("font-size", 13)
              .attr("text-anchor", "middle")
              .text("Total earnings, in USD");
};

function yLabel() {
          svg.append("text")
               .attr("transform", "rotate(270)")
               .attr("x", -200)
               .attr("y", -60)
               .attr("font-size", 13)
               .attr("text-anchor", "middle")
               .text("Overtime earnings, in USD");
};

// defining functions to append axis
function xAxis(scale) {
          svg.append("g")
              .attr("transform", "translate(0,400)")
              .call(d3.axisBottom(scale));
};

function yAxis(scale) {
          svg.append("g")
              .attr("transform", "translate(0,0)")
              .call(d3.axisLeft(scale));
};

// defining event listener function
function buttonClicked() {
  if(selectedDepartment == "Boston Police Department") {
    // filtering data
    var newData = allData.filter(function(d) {
      return d.department_name == "Boston Fire Department";
    });

    button.text(selectedDepartment); // changing HTML button text
    selectedDepartment = "Boston Fire Department"; // flipping "switch"
    updateData(newData); // calling update function

   } else {
    // filtering data
    var oldData = allData.filter(function(d) {
      return d.department_name == "Boston Police Department";
    });

    button.text(selectedDepartment); // changing HTML button text
    selectedDepartment = "Boston Police Department"; // flipping "switch"
    updateData(oldData); // calling update function
  }
};
