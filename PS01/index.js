var svg = d3.select('svg')
              .append("g")
              .attr("transform", "translate(100,100)");

var allData;

var scaleX = d3.scaleLinear()
                 .domain([0,450000])
                 .range([0,600]);

var scaleY = d3.scaleLinear()
                .domain([160000,0])
                .range([0,400]);

var selectDepartment = "Boston Police Department";

d3.csv("./data.csv", function(data) {

    allData = data;

    var initialData = data.filter(function(d) {
      return d.department_name == "Boston Police Department";
    });

    // svg.selectAll("circle")
    //     .data(initialData);
    //     .enter()
    //     .append("circle")
    //     .attr("class", "circles");

    svg.append("g")
        .attr("transform", "translate(0,400)")
        .call(d3.axisBottom(scaleX));

    svg.append("g")
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(scaleY));

    console.log(initialData);

    updateData(initialData);

});

function updateData(dataPoints) {

        var selection = svg.selectAll("circle")
            .data(dataPoints)

       selection.transition()
                .duration(500)
                .ease(d3.easeSin)
                .attr("cx", function(d) { return scaleX(d.total) })
                .attr("cy", function(d) { return scaleY(d.overtime) })
                .attr("r", 5)
                .attr("fill", "red")
                .attr("opacity", .7);

        selection.enter().append("circle")
                  .attr("cx", function(d) { return scaleX(d.total) })
                  .attr("cy", function(d) { return scaleY(d.overtime) })
                  .attr("r", 0)
                    .transition()
                    .duration(500)
                    .ease(d3.easeSin)
                  .attr("r", 5)
                  .attr("fill", "red")
                  .attr("opacity", .7);

        selection.exit()
                    .transition()
                    .duration(100)
                    .ease(d3.easeSin)
                  .attr("r", 0)
                 .remove();


};

function buttonClicked() {
  if(selectDepartment == "Boston Police Department") {
    var newData = allData.filter(function(d) {
      return d.department_name == "BPS Ellis Elementary";
    });
    selectDepartment = "BPS Ellis Elementary";
    updateData(newData);
   }
  else {
    var oldData = allData.filter(function(d) {
      return d.department_name == "Boston Police Department";
    });
    selectDepartment = "Boston Police Department";
    updateData(oldData);
  }
};
