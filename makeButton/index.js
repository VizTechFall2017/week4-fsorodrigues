var height = 0;
var width = 0;
var margin = [];
var padding = [];

var svg = d3.select('svg')
              .append("g")
              .attr("transform", "translate(100,100)");
//
// /* Your code goes here */
//
d3.csv("./data.csv", function(dataIn) {

    console.log(dataIn);

    svg.selectAll("circle")
         .data(dataIn)
         .enter()
         .append("circle")
         .attr("cx", function(d) { return scaleX(d.x) })
         .attr("cy", function(d) { return scaleY(d.y) })
         .attr("r", 8)
         .attr("fill", "black")

    svg.append("g")
         .attr("transform","translate(0,400)")
         .call(d3.axisBottom(scaleX));

   svg.append("g")
        .attr("transform","translate(0,0)")
        .call(d3.axisLeft(scaleY));

   svg.append("text")
      .attr("x", 300)
      .attr("y", 0)
      .attr("font-size", 24)
      .text("test");

  svg.append("text")
     .attr("x", 300)
     .attr("y", 440)
     .attr("font-size", 13)
     .text("x Axis");

   svg.append("text")
      .attr("transform", "rotate(270)")
      .attr("x", -200)
      .attr("y", -40)
      .attr("font-size", 13)
      .text("y Axis");

});

var scaleX = d3.scaleLinear()
                 .domain([0,400])
                 .range([0,600]);

var scaleY = d3.scaleLinear()
                .domain([500,0])
                .range([0,400]);

function buttonClicked() {
  console.log("here");
}
