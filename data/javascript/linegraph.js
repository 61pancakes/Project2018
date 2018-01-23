/*  
 * Andrea van den Hooff
 * Minor Programmeren
 * 10439080
 * linegraph.js: This file creates a multi line graph in d3 with data loaded in from a .json file.
 */


(function () {

    /* Create the basis variables for the svg. */
    var margin = { top: 50, right: 250, bottom: 50, left: 50 },
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom,
        years = 5;

    var y = d3.scale.linear()
        .domain([3739, 0])
        .range([0, height]);

    var x = d3.scale.ordinal()
        .domain(d3.range(years))
        .rangePoints([0, width]);

    var xLabels = d3.scale.ordinal()
        .domain(['\'12-\'13', '\'13-\'14', '\'14-\'15', '\'15-\'16', '\'16-\'17'])
        .rangePoints([0, width]);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /* Show the axes. */
    var xAxis = d3.svg.axis()
        .scale(xLabels)
        .innerTickSize(-height)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .innerTickSize(-width)
        .orient("left")
        .tickPadding(8);

    var yAxisRight = d3.svg.axis()
        .scale(y)
        .orient("right");

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
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ",0)")
        .call(yAxisRight);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", 500)
        .attr("y", 30)
        .style("text-anchor", "end")
        .text("→ Academisch jaar");

    /* Add a title */
    svg.append("g")
        .append("text")
        .attr("x", (width / 2))
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font", "sans-serif")
        .style("text-decoration", "underline")
        .text("Genderverdeling @ verschillende universiteiten.");

    /* Load dataset from local server to create the lines. */
    d3.json("data/json/linegraph.json", function (error, data) {
        var finalData = [];
        var years = ["twaalfdertien", "dertienveertien", "veertienvijftien",
            "vijftienzestien", "zestienzeventien"];

        /* Create M/F sets made of integers of the data. */
        var k = 0;
        for (var i = 0; i < 17; i++) {
            finalData[k] = [5];
            for (var j = 0; j < 5; j++) {
                finalData[k][j] = {
                    women: parseInt(data.data[i][years[j]]),
                    men: parseInt(data.data[i + 1][years[j]])
                };
            }
            i += 1;
            k += 1;
        }

        /* create a line function that can convert data[] into x and y coordinates. */
        var lineF = d3.svg.line()
            .x(function (d, i) { return x(i); })
            .y(function (d) { return y(d.women); })

        var lineM = d3.svg.line()
            .x(function (d, i) { return x(i); })
            .y(function (d) { return y(d.men); })

        var colors = ["#BBCCEE", "#44AA99", "#332288", "#117733", "#999933",
            "#DDCC77", "#CC6677", "#882255", "#AA4499"];
        var legendData = [];
        for (var l = 0; l < 9; l++) {
            legendData[l] = { color: colors[l], name: data.data[l * 2].naam }
        };

        /* Show the lines. */
        for (var i = 0; i < 9; i++) {
            svg.append("path")
                .attr("class", "line")
                .style("stroke", colors[i])
                .style("stroke-dasharray", ("5, 5"))
                .attr("d", lineF(finalData[i]))
                .on("mouseover", d3.select(this).style("stroke-width", "2"))
                .on("mouseout", d3.select(this).style("stroke-width", "1"));
            // .attr("id", "test")
            // .on("click", onclick(i));

            svg.append("path")
                .attr("class", "line")
                .style("stroke", colors[i])
                .attr("d", lineM(finalData[i]))
                .on("mouseover", d3.select(this).style("stroke-width", "2"))
                .on("mouseout", d3.select(this).style("stroke-width", "1"));
            // .attr("id", "test")
            // .on("click", onclick());
        }

        /* Add legend 'columns' */
        svg.append("g")
            .append("text")
            .attr("x", width + 75)
            .attr("y", 40)
            .attr("text-anchor", "middle")
            .style("font", "sans-serif")
            .style("font-size", "140%")
            .text("↓♂ ↓♀");

        /* Create and draw a legend */
        var legend = svg.selectAll(".legend")
            .data(legendData)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(70," + (i * 19 + 30) + ")"; });

        legend.append("line")
            .attr("x1", width - 28)
            .attr("x2", width)
            .attr("y1", 20)
            .attr("y2", 20)
            .style("stroke-width", "2")
            .style("stroke", function (d, i) {
                return legendData[i].color;
            })
        // .on("click", onclick);

        legend.append("line")
            .attr("x1", width + 5)
            .attr("x2", width + 33)
            .attr("y1", 20)
            .attr("y2", 20)
            .style("stroke-width", "2")
            .style("stroke-dasharray", ("5, 5"))
            .style("stroke", function (d, i) {
                return legendData[i].color;
            })
        // .on("click", onclick);

        legend.append("text")
            .attr("font", "sans-serif")
            .attr("font-weight", "bold")
            .attr("x", width + 35)
            .attr("y", 20)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function (d, i) {
                return legendData[i].name.substr(2);
            })
        // .on("click", onclick);
    });
})();

