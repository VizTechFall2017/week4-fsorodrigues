var height = 600;
var width = 800;

var svg = d3.select('svg')
              .attr("height", height)
              .attr("width", width)
              .append("g")
              .attr("transform", "translate(100,100)");

// creating global variable to access csv data
var allData;

var scaleX = d3.scaleLinear()
                 .domain([0,450000])
                 .range([0,600])
                 .nice(); // making scale end in round number

var scaleY = d3.scaleLinear()
                .domain([150000,0])
                .range([0,400])
                .nice(); // making scale end in round number

var selectDepartment = "Boston Police Department"; // setting up toggle switch for data change

var button = d3.select(".button")
                .text(selectDepartment);

d3.csv("./data_original.csv", function(error, data) {
    if (error) { throw error };

    allData = data; // passing data to global variable

    // filtering for defaul vizualization
    var initialData = data.filter(function(d) {
      return d.department_name == "Boston Police Department";
    });

    // svg.selectAll("circle")
    //     .data(initialData);
    //     .enter()
    //     .append("circle")
    //     .attr("class", "circles");

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
        return "#654321"
} else if (d.department_name == "Boston Police Department") {
        return "#123456"
}};

function updateData(dataPoints) {

        // binding data to DOM selection
        var selection = svg.selectAll("circle")
            .data(dataPoints)

       // updating existing circles
       selection.transition()
                .duration(500)
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
                    .duration(500)
                    .ease(d3.easeSin)
                  .attr("r", 5)
                  .attr("fill", colorFill)
                  .attr("opacity", .7);

        // removing unnecessary circles
        selection.exit()
                    .transition()
                    .duration(100)
                    .ease(d3.easeSin)
                  .attr("r", 0)
                 .remove();

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

function chartTitle() {
          svg.append("text")
               .attr("x", 0)
               .attr("y", -25)
               .attr("font-size", 24)
               .text("City of Boston PD and FD payroll, 2016");
};

function buttonClicked() {
  if(selectDepartment == "Boston Police Department") {
    var newData = allData.filter(function(d) {
      return d.department_name == "Boston Fire Department";
    });
    selectDepartment = "Boston Fire Department";
    button.text(selectDepartment);
    updateData(newData);

   } else {
    var oldData = allData.filter(function(d) {
      return d.department_name == "Boston Police Department";
    });

    selectDepartment = "Boston Police Department";
    button.text(selectDepartment);
    updateData(oldData);
  }
};
