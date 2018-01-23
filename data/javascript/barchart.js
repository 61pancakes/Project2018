/*  
 * Andrea van den Hooff
 * Minor Programmeren
 * 10439080
 * barchart.js: This file creates a bar chart in d3 with data loaded in from a .json file.
 */

function createBarchart() {
    /* Create the basis variables for the svg. */
    var margin = { top: 50, right: 150, bottom: 50, left: 50 },
        width = 700 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var years = 6,
        genders = 2,
        studentMax = 3739;

    var y = d3.scale.linear()
        .domain([studentMax, 0])
        .range([0, height - 1]); // 

    var x0 = d3.scale.ordinal()
        .domain(d3.range(years))
        .rangeBands([0, width], .5);

    var x1 = d3.scale.ordinal()
        .domain(d3.range(genders))
        .rangeBands([0, x0.rangeBand()]);

    var xLabels = d3.scale.ordinal()
        .domain(['\'12-\'13', '\'13-\'14', '\'14-\'15', '\'15-\'16', '\'16-\'17', '\'17-\'18',])
        .rangeBands([0, width], .5);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

    /* Add a title */
    svg.append("g")
        .append("text")
        .attr("x", (width / 2))
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font", "sans-serif")
        .style("text-decoration", "underline")
        .text("Studenten @ FNWI door de jaren heen");

    /* Load dataset from local server to create the bars. */
    d3.json("data/json/barchart.json", function (error, data) {
        var colors = ["#ffe6ff", "#99e6ff", "#ffb3ff", "#1ac6ff"];

        /* Transform the data from the dataset from string to int in a multidimensional array. */
        var studentdata = [];
        var years = ["twaalfdertien", "dertienveertien", "veertienvijftien",
            "vijftienzestien", "zestienzeventien", "zeventienachttien"];
        for (var i = 0; i < 4; i++) {
            studentdata[i] = [6];
            for (var j = 0; j < 6; j++) {
                if (i < 2) {
                    studentdata[i][j] = { begin: 0, end: parseInt(data.students[i][years[j]]) };
                } else {
                    studentdata[i][j] = {
                        begin: studentdata[i - 2][j].end,
                        end: studentdata[i - 2][j].end + parseInt(data.students[i][years[j]])
                    };
                }
            }
        }

        /* Finally, add the bars to the graph */
        svg.append("g").selectAll("g")
            .data(studentdata) // studentdata: [{BA F}, {BA M}, {MA F}, {MA M}]
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
            .attr("id", function (d, i) {
                switch (i) {
                    case 0: return "Opleidingen in 2012 - 2013";
                    case 1: return "Opleidingen in 2013 - 2014";
                    case 2: return "Opleidingen in 2014 - 2015";
                    case 3: return "Opleidingen in 2015 - 2016";
                    case 4: return "Opleidingen in 2016 - 2017";
                    case 5: return "Opleidingen in 2017 - 2018";
                }
            })
            .on('mouseover', synchronizedMouseOver)
            .on("mousemove", function (d) {
                var xPosition = d3.mouse(this)[0] + 60;
                var yPosition = d3.mouse(this)[1] - 20;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text")
                    .html((d.end - d.begin) + " studenten");
            })
            .on("mouseout", synchronizedMouseOut)
            .on("click", clickSunburst);

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

        function synchronizedMouseOver(d) {
            tooltip.style("display", null);
            d3.select(this).style("stroke", "black");
            console.log(this);
        };

        function synchronizedMouseOut(d) {
            tooltip.style("display", "none");
            d3.select(this).style("stroke", "none");
        };

        function clickSunburst(d) {
            console.log(d);
            // click(d);
        };

    }
    )
};

createBarchart();
