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
var width = chartWidth - margin.left - margin.right;
var height = chartHeight - margin.top - margin.bottom;

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
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
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
        .attr("transform", `translate(0, ${height}`)
        .call(bottomAxis);
    //Y axis
        chartGroup.append("g")
        .call(leftAxis);

