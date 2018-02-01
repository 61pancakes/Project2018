/*  
 * Andrea van den Hooff
 * Minor Programmeren
 * 10439080
 * sunburst.js: This file creates a zoomable sunburst in d3 with data
 * loaded in from a .json file. Used https://bl.ocks.org/mbostock/4348373
 * and https://bl.ocks.org/kerryrodden/7090426 as examples.
 */

/* Create the basis variables for the svg. */
var margin = { top: 0, right: 150, bottom: 0, left: 0 },
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    radius = (Math.min(width, height) / 2) - 10,
    first = true,
    legend = {
        width: 200, height: 30, slice: 3, arrow: 10
    }

/* Create the variables for the coloring (used in fillSunburst()). */
var courses = ["BA Artificial Intelligence", "MA Artificial Intelligence", "MA Astronomy and Astrophysics",
    "MA Biological Sciences", "BA Biology", "BA Biomedical Sciences", "MA Brain and Cognitive Sciences",
    "BA Chemistry", "MA Computational Science", "MA Computer Science", "BA Computing Science", "MA Earth Science", "MA Forensic Science",
    "BA Future Planet Studies", "BA Information Science", "MA Information Studies", "MA Life Sciences", "MA Logic",
    "MA Mathematical Physics", "BA Mathematics", "BA Natural and Social Sciences", "MA Physics",
    "BA Physics and Astronomy", "BA Psychobiology", "MA Software Engineering", "MA Stochastics and Financial Mathematics", "MA System and Network Engineering"],
    colors = ["#ff7f0e", "#1f77b4", "#aec7e8", "#ffbb78", "#2ca02c", "#98df8a", "#d62728",
        "#ff9896", "#9467bd", "#c5b0d5", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
        "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5", "#8c564b", "#393b79",
        "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b"],
    lightpink = "#ffe6ff",
    pink = "#ffb3ff",
    lightblue = "#99e6ff",
    blue = "#1ac6ff";

/* Add the svg. */
var svg = d3.select("#sunburst").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

/* Create the scaling variables. */
var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.sqrt()
    .range([0, radius]);

var partition = d3.layout.partition()
    .value(function (d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function (d) { return Math.max(0, y(d.y)); })
    .outerRadius(function (d) { return Math.max(0, y(d.y + d.dy)); });

/* Create & update the sunburst when called by barchart.js. */
function updateSunburst(year) {
    d3.json("data/csv + json/sunburst.json", function (error, root) {
        if (first == true) {
            createLegend();
            first = false;
        }

        data = partition.nodes(root.children[year]);

        /* Create the correct sunburst. */
        svg.selectAll("path")
            .data(data)
            .attr("d", arc)
            .attr("class", "sunburst")
            .enter().append("path")
            .style("stroke-width", "0.5")
            .style("fill", fillSunburst)
            .on("click", clickSunburst)
            .on("mouseover", mouseover)

        /* Show the sunburst. */
        clickSunburst(data[0]);

        /* Remove old data (if any). */
        svg.selectAll("path")
            .data(data)
            .exit().remove();
    });
};

/* Change the visualisation based on mouseclick, keeping scale in mind. */
function clickSunburst(d) {
    svg.transition()
        .duration(750)
        .tween("scale", function () {
            var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                yd = d3.interpolate(y.domain(), [d.y, 1]),
                yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
            return function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
        })
        .selectAll("path")
        .attrTween("d", function (d) { return function () { return arc(d); }; });
}

/* Below are function concerning interaction. This adds a 'background' circle for correct hovering.*/
svg.append("circle")
    .attr("r", radius)
    .style("opacity", 0);

/* If mouse stops hovering the sunburst, go back to default CSS. */
d3.select("#container").on("mouseleave", mouseleave);

/* Fade all but the current sequence, and show correct legend. */
function mouseover(d) {
    var studentcount = d.value + " studenten",
        ancestors = getAncestors(d);
    updateLegend(ancestors, studentcount);

    d3.select("#percentage")
        .text(studentcount);

    /* Fade the sunburst, highlght current sequence. */
    console.log(d3.selectAll("path.sunburst"));
    d3.selectAll("path.sunburst")
        .style("stroke-width", 0.5)
        .style("opacity", 0.3);

    svg.selectAll("path.sunburst")
        .filter(function (node) { return (ancestors.indexOf(node) >= 0); })
        .style("opacity", 1)
        .style("stroke-width", "2");
}

/* Set sunburst back to default CSS. */
function mouseleave(d) {
    d3.select("#legend")
        .style("visibility", "hidden");
    d3.select("#explanation")
        .style("visibility", "hidden");
    d3.selectAll("path.sunburst")
        .on("mouseover", null)
        .transition()
        .duration(500)
        .style("opacity", 1)
        .style("stroke-width", 0.5)
        .each("end", function () {
            d3.select(this).on("mouseover", mouseover);
        });
}

/* Return an array of all of a node's ancestors (needed in legend). */
function getAncestors(node) {
    var ancestors = [],
        current = node;
    while (current.parent) {
        ancestors.unshift(current);
        current = current.parent;
    }

    return ancestors;
}

/* Generate a string that describes the tabs of the legend. */
function createTabs(d, i) {
    var tabs = [];
    tabs.push("0,0");
    tabs.push(legend.width + ",0");
    tabs.push(legend.width + legend.arrow + "," + (legend.height / 2));
    tabs.push(legend.width + "," + legend.height);
    tabs.push("0," + legend.height);

    /* Create the arrowshape on the tabs. */
    if (i > 0) {
        tabs.push(legend.arrow + "," + (legend.height / 2));
    }

    return tabs.join(" ");
}

/* Create an svg for the legend. */
function createLegend() {
    var legend = d3.select("#sequence").append("svg:svg")
        .attr("width", 750)
        .attr("height", 50)
        .attr("id", "legend");

    legend.append("svg:text")
        .attr("id", "endlabel")
        .style("fill", "black")
        .style("font-size", "100%");
}

/* Update the legend to show the current sequence and amount of students in that path. */
function updateLegend(ancestors, studentcount) {
    /* Combine name and depth (= position in sequence). */
    var g = d3.select("#legend")
        .selectAll("g")
        .data(ancestors, function (d) { return d.name + d.depth; });

    /* Add tabs and label for new tabs. */
    var newTab = g.enter().append("svg:g");
    newTab.append("svg:polygon")
        .attr("points", createTabs)
        .style("fill", fillSunburst);
    newTab.append("svg:text")
        .attr("x", (legend.width + legend.arrow) / 2)
        .attr("y", legend.height / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .style("fill", function (d) {
            if (d.name == "BA Physics and Astronomy" ||
                d.name == "BA Natural and Social Sciences" ||
                d.name == "MA Software Engineering" ||
                d.name == "MA Artificial Intelligence" ||
                d.name == "BA Future Planet Studies" ||
                d.name == "MA Physics" || d.name == "BA Mathematics") {
                return "white";
            } else {
                return "black";
            }
        })
        .text(function (d) { return d.name; })
        .style("font-size", "80%");

    /* Set position for the new tabs & remove old tabs. */
    g.attr("transform", function (d, i) {
        return "translate(" + i * (legend.width + legend.slice) + ", 0)";
    });
    g.exit().remove();

    /* Update text of legend. */
    d3.select("#legend").select("#endlabel")
        .attr("x", (ancestors.length + 0.3) * (legend.width + legend.slice))
        .attr("y", legend.height / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .style("font-size", "80%")
        .text(studentcount);

    d3.select("#legend")
        .style("visibility", "");
}

/* Function to color each section of the sunburst the right color. */
function fillSunburst(d) {
    if (d.depth == 0) {
        return "wheat";
    } else if (d.depth == 1) {
        return colors[courses.indexOf(d.name)];
    } else if (d.depth == 2) {
        if (d.name == "Mannen") {
            return lightblue;
        } else {
            return lightpink;
        }
    } else if (d.depth == 3) {
        if (d.parent.name == "Mannen") {
            if (d.name == "Postpropedeuse") {
                return blue;
            } else {
                return lightblue;
            }
        } else {
            if (d.name == "Postpropedeuse") {
                return pink;
            } else {
                return lightpink;
            }
        }
    }
}
