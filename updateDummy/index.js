var svg = d3.select('svg')
              .append("g")
              .attr("transform", "translate(100,100)");

var allData;

var scaleX = d3.scaleLinear()
                 .domain([0,400])
                 .range([0,600]);

var scaleY = d3.scaleLinear()
                .domain([500,0])
                .range([0,400]);

var currentYear = "2016";

d3.csv("./data.csv", function(data) {

    allData = data;

    var data2016 = data.filter(function(d) {
      return d.year == 2016;
    });

    svg.selectAll("circle")
        .data(data2016)
        .enter()
        .append("circle")
        .attr("class", "myCircles");

    svg.append("g")
        .attr("transform", "translate(0,400)")
        .call(d3.axisBottom(scaleX));

    svg.append("g")
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(scaleY));

    updateData(data2016);

});

function updateData(dataPoints) {

    svg.selectAll(".myCircles")
        .data(dataPoints)
        .attr("cx", function(d) { return scaleX(d.x) })
        .attr("cy", function(d) { return scaleY(d.y) })
        .attr("r", function(d) { return d.r })
        .attr("fill", function(d) { return d.fill });

};

function buttonClicked() {

  if(currentYear == "2016") {
    var data2017 = allData.filter(function(d) {
      return d.year == 2017;
    });
    currentYear = "2017";
    updateData(data2017);
   }
  else {
    var data2016 = allData.filter(function(d) {
      return d.year == 2016;
    });
    currentYear = "2016";
    updateData(data2016);
  }
};

window.setInterval(function(){
  buttonClicked()},1000)
