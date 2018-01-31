/*  
 * Andrea van den Hooff
 * Minor Programmeren
 * 10439080
 * linegraph.js: This file creates a multi line graph in d3 with data loaded in from a .json file.
 */

/* Create the basis variables for the svg (hardcoded). */
var margin = { top: 50, right: 300, bottom: 50, left: 100 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    years = 5,
    studentMax = 3738,
    standard = 3,
    larger = 5;

function createLinegraph() {
    /* Create axes variables. */
    var y = d3.scale.linear()
        .domain([studentMax, 0])
        .range([0, height]);

    var x = d3.scale.ordinal()
        .domain(d3.range(years))
        .rangePoints([0, width]);

    var xLabels = d3.scale.ordinal()
        .domain(['\'12-\'13', '\'13-\'14', '\'14-\'15', '\'15-\'16', '\'16-\'17'])
        .rangePoints([0, width]);

    /* Show the axes. */
    var xAxis = d3.svg.axis()
        .scale(xLabels)
        .innerTickSize(-height)
        .orient("bottom")
        .tickPadding(8);

    var yAxis = d3.svg.axis()
        .scale(y)
        .innerTickSize(-width)
        .orient("left")
        .tickPadding(8);

    var yAxisRight = d3.svg.axis()
        .scale(y)
        .orient("right");

    var svg = d3.select("#linegraph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -60)
        .style("text-anchor", "end")
        .text("→ Aantal studenten");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ",0)")
        .call(yAxisRight);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", 400)
        .attr("y", 40)
        .style("text-anchor", "end")
        .text("→ Academisch jaar");

    /* Add a title to the svg. */
    svg.append("g")
        .append("text")
        .attr("x", (width / 2))
        .attr("y", -35)
        .attr("text-anchor", "middle")
        .style("font", "sans-serif")
        .style("text-decoration", "underline")
        .text("Man-vrouwverhouding bij verschillende universiteiten");

    /* Create a tooltip. */
    var tooltip2 = svg.append("g")
        .attr("class", "tooltip2")
        .style("display", "none");

    tooltip2.append("rect")
        .attr("width", 200)
        .attr("height", 200)
        .attr("fill", "black")
        .style("opacity", 0.8)

    tooltip2.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px");

    function infobox() {
        var xPos = d3.mouse(this)[0] - 200,
            yPos = d3.mouse(this)[1] + 20;
        d3.select(this).style("cursor", "pointer");
        tooltip2
            .attr("transform", "translate(" + xPos + "," + yPos + ")")
            .style("display", null)
    }

    function closeinfobox() {
        d3.select(this).style("cursor", "default");
        tooltip2.style("display", "none");
        active = false;
    }

    var img = svg.append("svg:image")
        .attr("xlink:href", "doc/info.png")
        .attr("width", 15)
        .attr("height", 15)
        .attr("x", width + 270)
        .attr("y", 210)
        .on("mouseover", infobox)
        .on("mouseout", closeinfobox);

    /* Load dataset to create the lines. */
    d3.json("data/csv + json/linegraph.json", function (error, data) {
        /* Create variables for (coloring of) the data. */
        var colors = ["#BBCCEE", "#44AA99", "#332288", "#117733", "#999933",
            "#DDCC77", "#CC6677", "#882255", "#AA4499"],
            years = ["twaalfdertien", "dertienveertien", "veertienvijftien",
                "vijftienzestien", "zestienzeventien"],
            legendData = [];

        for (var l = 0; l < 9; l++) {
            legendData[l] = { color: colors[l], name: data.data[l * 2].naam }
        };

        /* Transform the dataset from string to int in a multidimensional array.
            The result will be tuples (male/female) with y coordinates:
            i.e.: [{TU Delft F, TU Delft M}, {UvA FNWI F, UvA FNWI M}]*/
        var lineData = [];
        for (var i = 0, k = 0; i < 17; i++ , k++) {
            lineData[k] = [5];
            for (var j = 0; j < 5; j++) {
                lineData[k][j] = {
                    women: parseInt(data.data[i][years[j]]),
                    men: parseInt(data.data[i + 1][years[j]])
                };
            }
            i += 1;
        }

        /* Create line functions for both genders. */
        var drawlineF = d3.svg.line()
            .x(function (d, i) { return x(i); })
            .y(function (d) { return y(d.women); })

        var drawlineM = d3.svg.line()
            .x(function (d, i) { return x(i); })
            .y(function (d) { return y(d.men); })

        /* Loop over data to create all lines. 
            The id is used to combine with the legend, to toggle the lines on/off.
            The class is used to combine with the datapoints. */
        for (var i = 0; i < 9; i++) {
            /* Lines representing women (dashed). */
            svg.append("path")
                .attr("id", "true")
                .attr("class", "lineF" + i)
                .style("stroke", colors[i])
                .style("stroke-dasharray", ("10, 10"))
                .attr("d", drawlineF(lineData[i]))
                .on("mouseover", mouseoverLines("F"))
                .on("mouseout", mouseoutLines("F"));

            /* Lines representing men */
            svg.append("path")
                .attr("id", "true")
                .attr("class", "lineM" + i)
                .style("stroke", colors[i])
                .attr("d", drawlineM(lineData[i]))
                .on("mouseover", mouseoverLines("M"))
                .on("mouseout", mouseoutLines("M"));
        }

        /* Add circles ("datapoints") to the lines, corresponding with the data points, 
            The class is used to combine with the lines. */
        for (var j = 0; j < 9; j++) {
            /* First, add all datapoints on lines representing women. */
            svg.selectAll(".datapoint")
                .data(lineData[j])
                .enter().append("circle")
                .attr("class", "datapointF" + j)
                .attr("fill", function (d) { return colors[j] })
                .attr("cx", function (d, j) { return x(j) })
                .attr("cy", function (d) { return y(d.women) })
                .attr("r", standard)
                .on("mouseover", mouseoverdatapointF)
                .on("mouseout", mouseoutdatapointF);

            /* Then add all datapoints on lines representing men. */
            svg.selectAll(".datapoint")
                .data(lineData[j])
                .enter().append("circle")
                .attr("class", "datapointM" + j)
                .attr("fill", function (d) { return colors[j] })
                .attr("cx", function (d, j) { return x(j) })
                .attr("cy", function (d) { return y(d.men) })
                .attr("r", standard)
                .on("mouseover", mouseoverdatapointM)
                .on("mouseout", mouseoutdatapointM);
        }

        /* Add legend. */
        var legend = svg.selectAll(".legend")
            .data(legendData)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(90," + (i * 19 + 30) + ")"; });

        /* Add both lines in the legend. */
        legend.append("line")
            .attr("x1", width - 28)
            .attr("x2", width)
            .attr("y1", 20)
            .attr("y2", 20)
            .style("stroke-width", standard)
            .style("stroke", function (d, i) { return legendData[i].color; })
            .on("click", mouseclickLegend);

        legend.append("line")
            .attr("x1", width + 5)
            .attr("x2", width + 33)
            .attr("y1", 20)
            .attr("y2", 20)
            .style("stroke-width", standard)
            .style("stroke-dasharray", ("5, 5"))
            .style("stroke", function (d, i) { return legendData[i].color; })
            .on("click", mouseclickLegend);

        /* Add text to the legend. */
        legend.append("text")
            .attr("class", function (d, i) { return legendData[i].name.substr(2) })
            .attr("font-weight", "bold")
            .attr("x", width + 35)
            .attr("y", 20)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function (d, i) { return legendData[i].name.substr(2); })
            .on("mouseover", mouseoverLegend)
            .on("mouseout", mouseoutLegend)
            .on("click", mouseclickLegend);

        /* Add a 'column separator' above the lines. */
        svg.append("g")
            .append("text")
            .attr("x", width + 90)
            .attr("y", 40)
            .attr("text-anchor", "middle")
            .style("font-size", "100%")
            .text("↓♂  ↓♀");

        /* Check if the clicked line is active & toggle the line & datapoints off, or on otherwise.
        On advise I hardcoded the strings, instead of creating variables at the top of function. */
        function mouseclickLegend(d, i) {
            var currentLine = d3.select(".lineF" + i),
                active = currentLine[0][0].id == "true" ? true : false;

            if (active) {
                d3.select(this).attr("font-weight", "normal");
                d3.selectAll(".lineF" + i + ",.lineM" + i)
                    .style("opacity", 0)
                    .attr("id", "false");
                d3.selectAll(".datapointF" + i + ",.datapointM" + i)
                    .style("opacity", 0);
            } else {
                d3.select(this).attr("font-weight", "bold");
                d3.selectAll(".lineF" + i + ",.lineM" + i)
                    .style("opacity", 1)
                    .attr("id", "true");
                d3.selectAll(".datapointF" + i + ",.datapointM" + i)
                    .style("opacity", 1);
            }
        }

        /* Highlight lines corresponding with the legend. */
        function mouseoverLegend(d, i) {
            d3.select(this).style("cursor", "pointer");
            d3.selectAll(".lineF" + i + ",.lineM" + i)
                .style("stroke-width", larger);
            d3.selectAll(".datapointM" + i + ",.datapointF" + i)
                .attr("r", larger)
        }

        /* Stop highlighting lines corresponding with the legend. */
        function mouseoutLegend(d, i) {
            d3.select(this).style("cursor", "default");
            d3.selectAll(".lineF" + i + ",.lineM" + i)
                .style("stroke-width", standard);
            d3.selectAll(".datapointM" + i + ",.datapointF" + i)
                .attr("r", standard)
        }

        /* Highlight the current line and datapoints & highlight barchart if it's the corresponding data. */
        function mouseoverLines(gender) {
            return function () {
                d3.select(this).style("cursor", "pointer");
                d3.select(this).style("stroke-width", 4)
                if (gender == "M") {
                    d3.selectAll(".datapointM" + this.classList[0].slice(-1)).attr("r", 5);
                    if (this.classList == "lineM4") {
                        d3.selectAll("rect.MM")
                            .style("stroke", "black")
                            .style("stroke-width", standard);
                    } else if (this.classList == "lineM3") {
                        d3.selectAll("rect.BM")
                            .style("stroke", "black")
                            .style("stroke-width", standard);
                    }
                } else {
                    d3.selectAll(".datapointF" + this.classList[0].slice(-1)).attr("r", 5);
                    if (this.classList == "lineF4") {
                        d3.selectAll("rect.MF")
                            .style("stroke", "black")
                            .style("stroke-width", standard);
                    } else if (this.classList == "lineF3") {
                        d3.selectAll("rect.BF")
                            .style("stroke", "black")
                            .style("stroke-width", standard);
                    }
                }
            }
        }

        /* Show data of the current datapoint & highlight the rest of the line. */
        function mouseoverdatapointF(d) {
            console.log(tooltip);
            var xPos = d3.mouse(this)[0] + 30,
                yPos = d3.mouse(this)[1] - 20;
            tooltip
                .style("display", null)
                .attr("transform", "translate(" + xPos + "," + yPos + ")")
                .select("text")
                .html((d.women) + " vrouwen");
            d3.select(this).style("cursor", "pointer");
            d3.selectAll(".datapointF" + this.classList[0].slice(-1)).attr("r", larger);
            d3.selectAll(".lineF" + this.classList[0].slice(-1)).style("stroke-width", 5);
        }

        function mouseoverdatapointM(d) {
            var xPos = d3.mouse(this)[0] + 30,
                yPos = d3.mouse(this)[1] - 20;
            tooltip
                .style("display", null)
                .attr("transform", "translate(" + xPos + "," + yPos + ")")
                .select("text")
                .html((d.men) + " mannen");
            d3.select(this).style("cursor", "pointer");
            d3.selectAll(".datapointM" + this.classList[0].slice(-1)).attr("r", larger);
            d3.selectAll(".lineM" + this.classList[0].slice(-1)).style("stroke-width", 5);
        }

        function mouseoutdatapointF(d) {
            tooltip.style("display", "none");
            d3.select(this).style("cursor", "default");
            d3.selectAll(".datapointF" + this.classList[0].slice(-1)).attr("r", standard);
            d3.selectAll(".lineF" + this.classList[0].slice(-1)).style("stroke-width", 2);
        }

        function mouseoutdatapointM(d) {
            d3.select(this).style("cursor", "default");
            tooltip.style("display", "none");
            d3.selectAll(".datapointM" + this.classList[0].slice(-1)).attr("r", standard)
            d3.selectAll(".lineM" + this.classList[0].slice(-1)).style("stroke-width", 2)
        }

        /* Remove the highlights. */
        function mouseoutLines(gender) {
            return function () {
                d3.select(this).style("cursor", "default");
                d3.select(this).style("stroke-width", 2);
                d3.selectAll(".datapointF" + this.classList[0].slice(-1)).attr("r", standard);
                if (gender == "M") {
                    d3.selectAll(".datapointM" + this.classList[0].slice(-1)).attr("r", standard);
                    if (this.classList == "lineM4") {
                        d3.selectAll("rect.MM").style("stroke-width", 0);
                    } else if (this.classList == "lineM3") {
                        d3.selectAll("rect.BM").style("stroke-width", 0);
                    }
                } else {
                    if (this.classList == "lineF4") {
                        d3.selectAll("rect.MF").style("stroke-width", 0);
                    } else if (this.classList == "lineF3") {
                        d3.selectAll("rect.BF").style("stroke-width", 0);
                    }
                }
            }
        }

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
    });
}
createLinegraph();