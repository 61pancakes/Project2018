var margin = { top: 20, right: 50, bottom: 30, left: 40 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    years = 5;

var y = d3.scale.linear()
    .domain([3500, 0])
    .range([0, height]);

var x = d3.scale.ordinal() // Jaren op de x-as 
    .domain(d3.range(years))
    .rangePoints([0, width]);

var xLabels = d3.scale.ordinal() // Jaren op de x-as 
    .domain(['\'12-\'13', '\'13-\'14', '\'14-\'15', '\'15-\'16', '\'16-\'17'])
    .rangePoints([0, width]);

// Create the svg.
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("svg:g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Show the axes.
var xAxis = d3.svg.axis()
    .scale(xLabels)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var yAxisRight = d3.svg.axis()
    .scale(y)
    .orient("right");

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + width + ",0)")
    .call(yAxisRight);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

d3.json("http://localhost:8000/totaalalgemeen.json", function (error, data) {
    // Transform data from string to int in multidimensional array.
    var finalData = [];
    var jaren = ["twaalfdertien", "dertienveertien", "veertienvijftien", "vijftienzestien", "zestienzeventien"];

    for (var i = 0; i < 18; i++) {
        finalData[i] = [6];
        for (var j = 0; j < 5; j++) {
            finalData[i][j] = parseInt(data.data[i + 1][jaren[j]]);
        }
    }

    // create a line function that can convert data[] into x and y points
    var line = d3.svg.line()
        .x(function (d, i) { return x(i); })
        .y(function (d) { return y(d); })

    for (var i = 0; i < 17; i++) {
        if (i % 2 != 0) {
            svg.append("path")		// Add the valueline path.
                .attr("class", "line")
                .style("stroke", "#1ac6ff")
                .attr("d", line(finalData[i]));
        } else {
            svg.append("path")		// Add the valueline2 path.
                .attr("class", "line")
                .style("stroke", "#ffb3ff")
                .attr("d", line(finalData[i]));
        }
    }
})