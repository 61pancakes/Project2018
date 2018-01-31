/*  
 * Andrea van den Hooff
 * Minor Programmeren
 * 10439080
 * barchart.js: This file creates a bar chart in d3 with data loaded in from a .json file.
 */

/* Create the basis variables for the svg (hardcoded). */
var margin = { top: 50, right: 150, bottom: 50, left: 50 },
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    years = 6,
    genders = 2,
    studentMax = 3739;

function createBarchart() {

    var svg = d3.select("body").append("svg:svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /* Create axes' variables. */
    var y = d3.scale.linear()
        .domain([studentMax, 0])
        .range([0, height - 1]);

    /* x0 = x-axis ticks, x1 = placing the grouped bars on either side of an x-tick. */
    var x0 = d3.scale.ordinal()
        .domain(d3.range(years))
        .rangeBands([0, width], .5);

    var x1 = d3.scale.ordinal()
        .domain(d3.range(genders))
        .rangeBands([0, x0.rangeBand()]);

    var xLabels = d3.scale.ordinal()
        .domain(['\'12-\'13', '\'13-\'14', '\'14-\'15', '\'15-\'16', '\'16-\'17', '\'17-\'18',])
        .rangeBands([0, width], .5);

    /* Show the axes. */
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

    /* Add a title to the svg. */
    svg.append("g")
        .append("text")
        .attr("x", (width / 2))
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font", "sans-serif")
        .style("text-decoration", "underline")
        .text("Inschrijvingen FNWI-studenten door de jaren heen");

    /* Load dataset to create the bars. */
    d3.json("data/csv + json/barchart.json", function (error, data) {
        var classCounter = 0,
            colors = ["#ffe6ff", "#99e6ff", "#ffb3ff", "#1ac6ff"],
            years = ["twaalfdertien", "dertienveertien", "veertienvijftien",
                "vijftienzestien", "zestienzeventien", "zeventienachttien"];

        /* Transform the from the dataset from string to int in a multidimensional array.
            The result will be tuples with y coordinates of each bar:
            i.e.: [{Bachelor F}, {Bachelor M}, {Master F}, {Master M}]*/
        var barData = [];
        for (var i = 0; i < 4; i++) {
            barData[i] = [6];
            for (var j = 0; j < 6; j++) {
                if (i < 2) {
                    barData[i][j] = { begin: 0, end: parseInt(data.students[i][years[j]]) };
                } else {
                    barData[i][j] = {
                        begin: barData[i - 2][j].end,
                        end: barData[i - 2][j].end + parseInt(data.students[i][years[j]])
                    };
                }
            }
        }

        /* Finally, add the bars to the graph (stacked & grouped!) */
        svg.append("g").selectAll("g")
            .data(barData)
            .enter().append("g")
            .style("fill", function (d, i) { return colors[i]; })
            .attr("transform", function (d, i) { return "translate(" + x1(i % 2) + ",0)"; })
            .selectAll("rect")
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("height", function (d) { return (y(d.begin) - y(d.end)); })
            .attr("x", function (d, i) { return x0(i); })
            .attr("y", function (d) { return (y(d.end)); })
            .attr("id", function (d, i) { return i; })
            .attr("class", function (d, i) {
                /* The class is used in interactivity with the line graph. */
                if (classCounter < 6) { classCounter++; return "BF" }
                else if (classCounter < 12) { classCounter++; return "BM" }
                else if (classCounter < 18) { classCounter++; return "MF" }
                else { classCounter++; return "MM" }
            })
            .on('mouseover', mouseover)
            .on("mousemove", mousemove)
            .on("mouseout", mouseout)
            .on("click", click);

        /* Create and draw a legend */
        var legend = svg.selectAll(".legend")
            .data(colors)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(30," + (i * 19 + 30) + ")"; });

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
            })

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

        /* Create a tooltip. */
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 60)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");

        /* Show data on mouseover & highlight the bar. */
        function mouseover(d) {
            tooltip.style("display", null);
            d3.select(this).style("cursor", "pointer");
            d3.select(this).style("stroke", "black");
            d3.select(this).style("stroke-width", "2");
        };

        /* Let the tooltip follow the mouse while on a bar. */
        function mousemove(d) {
            var xPos = d3.mouse(this)[0] + 60;
            var yPos = d3.mouse(this)[1] - 20;
            tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
            tooltip.select("text")
                .html((d.end - d.begin) + " studenten");
        }

        /* Hide data & remove highlight of the bar. */
        function mouseout(d) {
            tooltip.style("display", "none");
            d3.select(this).style("stroke", "none");
            d3.select(this).style("cursor", "default");
        };

        /* Show the sunburst when clicked on a year. */
        function click(d) {
            updateSunburst(this.id);
        };
    })

    var img = svg.append("svg:image")
        .attr("xlink:href", "doc/info.png")
        .attr("width", 15)
        .attr("height", 15)
        .attr("x", 375)
        .attr("y", - 20)
        .on("mouseover", function () { d3.select(this).style("cursor", "pointer") })
};

createBarchart();