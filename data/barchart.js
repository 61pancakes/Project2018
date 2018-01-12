// Load dataset from local server.
d3.json("http://localhost:8000/totaalstudenten.json", function (error, data) {

    // Transform data from string to int in multidimensional array.
    var finalData = [];
    var jaren = ["twaalfdertien", "dertienveertien", "veertienvijftien", "vijftienzestien", "zestienzeventien", "zeventienachttien"];
    for (var i = 0; i < 4; i++) {
        finalData[i] = [6];
        for (var j = 0; j < 6; j++) {
            finalData[i][j] = parseInt(data.students[i][jaren[j]]);
        }
    }

    // Create Domain variables
    var yearMax = 6;
    var studentMax = 0;
    for (var j = 0; j < 6; j++) {
        for (var i = 0; i < 2; i++) {
            if (studentMax == 0) {
                studentMax = finalData[i][j] + finalData[i + 2][j];
            } else {
                if (studentMax < finalData[i][j] + finalData[i + 2][j]) {
                    studentMax = finalData[i][j] + finalData[i + 2][j];
                }
            }
        }
    }

    // Create the basis variables. Nu nog HARDCODED.
    var years = 6,
        genders = 2;

    var margin = { top: 20, right: 30, bottom: 30, left: 40 },
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var y = d3.scale.linear()
        .domain([studentMax, 0])
        .range([0, height]);

    var xLabels = d3.scale.ordinal() // Jaren op de x-as 
        .domain(['\'12-\'13', '\'13-\'14', '\'14-\'15', '\'15-\'16', '\'16-\'17', '\'17-\'18',])
        .rangeBands([0, width], .5);

    var x0 = d3.scale.ordinal() // Jaren op de x-as 
        .domain(d3.range(years))
        .rangeBands([0, width], .5);

    var x1 = d3.scale.ordinal() // genders op de x-as
        .domain(d3.range(genders))
        .rangeBands([0, x0.rangeBand()]);

    var z = d3.scale.ordinal()
        .range(["#ffe6ff", "#99e6ff", "#ffb3ff", "#1ac6ff"]);

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

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g").selectAll("g")
        .data(finalData) // Voeg de data arrays toe.
        .enter().append("g")
        .style("fill", function (i) { return z(i); }) // Kleur elke balk de juiste kleur. 
        .attr("transform", function (d, i) { return "translate(" + x1(i % 2) + ",0)"; }) // Zet ze op de juiste plek links en rechts van een x coordinaat. // genders
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("height", function (d, i) { console.log(i); return y(0) - y(d); }) // Top van de rechthoek
        .attr("x", function (d, i) { return x0(i); })
        .attr("y", function (d) { return y(d); }) // Begin van de rechthoek

    // .attr("transform", function (d, i) { console.log(d, i); return "translate(0,-" + y(d) + ")"; });


    // Height: if (i < 2) { return y(0) - y(d); } if (i < 4) { return height(dy(d - 2) - y(d) }
    // Y: if (i < 2) { return y(d); } if (i < 4) { return y(d - 2) }

}
)