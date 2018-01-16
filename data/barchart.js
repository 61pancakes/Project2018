// Load dataset from local server.
d3.json("http://localhost:8000/studentenperstudie.json", function (error, data) {

    // Transform data from string to int in multidimensional array.
    var finalData = [];
    var jaren = ["twaalfdertien", "dertienveertien", "veertienvijftien", "vijftienzestien", "zestienzeventien", "zeventienachttien"];
    for (var i = 0; i < 4; i++) {
        finalData[i] = [6];
        for (var j = 0; j < 6; j++) {
            if (i < 2) {
                finalData[i][j] = { begin: 0, end: parseInt(data.students[i][jaren[j]]) };
            } else {
                finalData[i][j] = { begin: finalData[i - 2][j].end, end: finalData[i - 2][j].end + parseInt(data.students[i][jaren[j]]) };
            }
        }
    }

    // Create domain variables
    var yearMax = 6;
    var studentMax = 0;
    for (var j = 0; j < 6; j++) {
        for (var i = 2; i < 4; i++) {
            if (studentMax == 0) {
                studentMax = finalData[i][j].end;
            } else {
                if (studentMax < finalData[i][j].end) {
                    studentMax = finalData[i][j].end;
                }
            }
        }
    }

    // Create the basis variables (hardcoded).
    var years = 6,
        genders = 2;

    var margin = { top: 50, right: 150, bottom: 50, left: 50 },
        width = 700 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var y = d3.scale.linear()
        .domain([studentMax, 0])
        .range([0, height - 1]); // 

    var xLabels = d3.scale.ordinal() // Jaren op de x-as 
        .domain(['\'12-\'13', '\'13-\'14', '\'14-\'15', '\'15-\'16', '\'16-\'17', '\'17-\'18',])
        .rangeBands([0, width], .5);

    var x0 = d3.scale.ordinal() // Jaren op de x-as 
        .domain(d3.range(years))
        .rangeBands([0, width], .5);

    var x1 = d3.scale.ordinal() // genders op de x-as
        .domain(d3.range(genders))
        .rangeBands([0, x0.rangeBand()]);

    var colors = ["#ffe6ff", "#99e6ff", "#ffb3ff", "#1ac6ff"];

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
        .innerTickSize(-width)
        .orient("left")
        .tickPadding(8);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -10)
        .style("text-anchor", "end")
        .text("→ Aantal studenten");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", 500)
        .attr("y", 30)
        .style("text-anchor", "end")
        .text("→ Academisch jaar");

    svg.append("g")

    // Finally, add the bars to the graph
    svg.append("g").selectAll("g")
        .data(finalData) // FinalData: [{BA F}, {BA M}, {MA F}, {MA M}]
        .enter().append("g")
        .style("fill", function (d, i) { return colors[i]; }) // Color bars the right color.
        .attr("transform", function (d, i) { return "translate(" + x1(i % 2) + ",0)"; }) // = Grouped 
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("height", function (d) { return (y(d.begin) - y(d.end)); }) // = Top van de rechthoek
        .attr("x", function (d, i) { return x0(i); })
        .attr("y", function (d) { return (y(d.end)); })
        .on("mouseover", function () {
            d3.select(this)
                .style("stroke", "black")    // set the line colour
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .style("stroke", "none")    // set the line colour
        })

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font", "sans-serif")
        .style("text-decoration", "underline")
        .text("Studenten @ FNWI door de jaren heen");

    // Draw legend
    var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { console.log(colors); return "translate(30," + (i * 19 + 30) + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d, i) {
            switch (i) {
                case 0: return colors[0];
                case 1: return colors[2];
                case 2: return colors[1];
                case 3: return colors[3];
            }
        });

    legend.append("text")
        .attr("font", "sans-serif")
        .attr("x", width + 5)
        .attr("y", 10)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function (d, i) {
            switch (i) {
                case 0: return "♀ Bachelor";
                case 1: return "♀ Master";
                case 2: return "♂ Bachelor";
                case 3: return "♂ Master";
            }
        });


}
)