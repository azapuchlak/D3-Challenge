//Ensure that console is working and webpage is connected
console.log("app.js loaded");

//---------------------------------------------------------------------------//

//Step 1 : Set up Chart
//define width and height of svg area
var svgWidth = 700;
var svgHeight = 500;

//define margins
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 50
};

//define width and height for chart
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Step 2: Create SVG Wrapper
//Create a variable called SVG that will point to SVG area - select body portion of HTML/DOM
var svg = d3.select('#scatter')
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight)

//Create var chart group by appending a HTML g
var chartGroup = svg.append("g")    
    //Program this transform element to be a translation -- moves it over and down by the amount of the margins
    .attr("transform", `translate(${margin.left}, ${margin.top})`);     


//Step 3: Import Data from data.csv file
//read CSV file
d3.csv("assets/data/data.csv").then(function(stateData) {
    //console.log(stateData)

    //Step 4: Parse the data
    //Format the data and convert it to numerical values

    //Format the data
    stateData.forEach(function(stateData) {
        stateData.poverty = +stateData.poverty;
        stateData.healthcare = +stateData.healthcare;
        //console.log(stateData);
    });

    //Step 5: Create the Scales for the chart
    // 
    var xLinearScale = d3.scaleLinear()
        //Set the domain as the minimum and maximum of the values in the data
        .domain([0, d3.max(stateData, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.healthcare)])
        .range([height, 0]);


    //Step 6: Create the axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 7: Append the axes to the chart by appending another g
    //X axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    //Y axis
        chartGroup.append("g")
        .call(leftAxis);

    //Step 8: Create Circles (1:50ish in class vid)
    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".75");

    //Step 9: Initialize a tool tip
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80,-60])
    .html(function(d) {
        return (`${d.state}<br>Percent in Poverty: ${d.poverty}<br>Percent Lacks Healthcare: ${d.healthcare}`);
    });

    //Step 9: Create tool tip in the chart
    //attach to chart group
    chartGroup.call(toolTip);

    //Step 10: Create event listeners to display and hide the tooltip
    //On mouse click show data; on mouse out you hide it

    circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
    })

        //onmouse event
        .on("mouseout", function(data, index) {
            toolTip.hide(Data);
    }); 

    //Step 11: Create axes labels
    chartGroup.append("text")
    //flips text to read sideways up the chart
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height/2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .attr("Lacks Healthcare (%)")

    chartGroup.append("text")
    .attr("transform", `translate(${(width / 2) }, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .attr("In Poverty (%)");   
}); 

