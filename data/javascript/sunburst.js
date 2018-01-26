/*  
 * Andrea van den Hooff
 * Minor Programmeren
 * 10439080
 * sunburst.js: This file creates a zoomable sunburst in d3 with data loaded in from a .json file.
 * Used https://bl.ocks.org/mbostock/4348373 as example.
 */

/* Create the basis variables for the svg. */
var margin = { top: 0, right: 50, bottom: 50, left: 150 },
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom,
    radius = (Math.min(width, height) / 2) - 10;

var totalSize = 30000;

var legend = {
    w: 150, h: 30, s: 3, t: 10
};

var courses = ["BA Artificial Intelligence", "MA Artificial Intelligence", "MA Astronomy and Astrophysics",
    "MA Biological Sciences", "BA Biology", "BA Biomedical Sciences", "MA Brain and Cognitive Sciences",
    "BA Chemistry", "MA Computational Science", "MA Computer Science", "BA Computing Science", "MA Earth Science", "MA Forensic Science",
    "BA Future Planet Studies", "BA Information Science", "MA Information Studies", "MA Life Sciences", "MA Logic",
    "MA Mathematical Physics", "BA Mathematics", "BA Natural and Social Sciences", "MA Physics",
    "BA Physics and Astronomy", "BA Psychobiology", "MA Software Engineering", "MA Stochastics and Financial Mathematics", "MA System and Network Engineering"],

    colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728",
        "#ff9896", "#9467bd", "#c5b0d5", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
        "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5", "#8c564b", "#393b79",
        "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b"],

    lightpink = "#ffe6ff",
    pink = "#ffb3ff",
    lightblue = "#99e6ff",
    blue = "#1ac6ff";

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

var svg = d3.select("body").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

var colorSlice = function (d) {
    /* Color each section the right color. */
    if (d.depth == 0) {
        return "white";
    } else if (d.depth == 1) {
        return "grey";
    } else if (d.depth == 2) {
        return colors[courses.indexOf(d.name)];
    } else if (d.depth == 3) {
        if (d.name == "Mannen") {
            return lightblue;
        } else {
            return lightpink;
        }
    } else if (d.depth == 4) {
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

/* Load dataset from local server to create the circle partitions. */
d3.json("data/json/sunburst.json", function (error, root) {
    createLegend();

    var formatNumber = d3.format(",d");
    svg.append("svg:circle")
        .attr("r", radius)
        .style("opacity", 0);

    svg.selectAll("path")
        .data(partition.nodes(root))
        .enter().append("svg:path")
        .attr("d", arc)
        .attr("class", "sunburst")
        .style("fill", colorSlice)
        .style("stroke-width", "0.5")
        .on("click", click)
        .on("mouseover", mouseover);

    d3.select("#container").on("mouseleave", mouseleave);

    function click(d) {
        svg.transition()
            .duration(1200)
            .tween("scale", function () {
                var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                    yd = d3.interpolate(y.domain(), [d.y, 1]),
                    yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
                return function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
            })
            .selectAll("path")
            .attrTween("d", function (d) { return function () { return arc(d); }; });
    }
});

function sunburstYear(year) {
    d3.json("data/json/sunburst.json", function (error, root) {
        data = partition.nodes(root);
        f = data.filter(
            function (data) { return data.name == year }
        );

        d = f[0];
        svg.transition()
            .duration(2000)
            .tween("scale", function () {
                var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                    yd = d3.interpolate(y.domain(), [d.y, 1]),
                    yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
                return function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
            })
            .selectAll("path")
            .attrTween("d", function (d) { return function () { return arc(d); }; });
    });
};


d3.select(self.frameElement).style("height", height + "px");

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {
    var studentcount = d.value + " studenten";
    d3.select("#explanation")
        .style("visibility", "");

    d3.select("#percentage")
        .text(studentcount);

    var ancestors = getAncestors(d);
    updateLegend(ancestors, studentcount);

    // Fade all the segments.
    d3.selectAll("path.sunburst")
        .style("stroke-width", 0.5)
        .style("opacity", 0.3);

    // Then highlight only those that are an ancestor of the current segment.
    svg.selectAll("path.sunburst")
        .filter(function (node) {
            return (ancestors.indexOf(node) >= 0);
        })
        .style("opacity", 1)
        .style("stroke-width", "2");
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

    // Hide the breadcrumb trail
    d3.select("#trail")
        .style("visibility", "hidden");

    // Deactivate all segments during transition.
    d3.selectAll("path.sunburst").on("mouseover", null);

    // Transition each segment to full opacity and then reactivate it.
    d3.selectAll("path.sunburst")
        .transition()
        .duration(1)
        .style("opacity", 1)
        .style("stroke-width", 0.5)
        .each("end", function () {
            d3.select(this).on("mouseover", mouseover);
        });

    d3.select("#explanation")
        .style("visibility", "hidden");
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
    var path = [];
    var current = node;
    while (current.parent) {
        path.unshift(current);
        current = current.parent;
    }
    return path;
}

function createLegend() {
    // Add the svg area.
    var trail = d3.select("#sequence").append("svg:svg")
        .attr("width", width)
        .attr("height", 50)
        .attr("id", "trail");
    // Add the label at the end, for the percentage.
    trail.append("svg:text")
        .attr("id", "endlabel")
        .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function legendPoints(d, i) {
    var points = [];
    points.push("0,0");
    points.push(legend.w + ",0");
    points.push(legend.w + legend.t + "," + (legend.h / 2));
    points.push(legend.w + "," + legend.h);
    points.push("0," + legend.h);
    if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
        points.push(legend.t + "," + (legend.h / 2));
    }
    return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateLegend(nodeArray, studentcount) {

    // Data join; key function combines name and depth (= position in sequence).
    var g = d3.select("#trail")
        .selectAll("g")
        .data(nodeArray, function (d) { return d.name + d.depth; });

    // Add breadcrumb and label for entering nodes.
    var entering = g.enter().append("svg:g");

    entering.append("svg:polygon")
        .attr("points", legendPoints)
        .style("fill", function (d) {
            if (d.depth == 0) {
                return "white";
            } else if (d.depth == 1) {
                return "grey";
            } else if (d.depth == 2) {
                return colors[courses.indexOf(d.name)];
            } else if (d.depth == 3) {
                if (d.name == "Mannen") {
                    return lightblue;
                } else {
                    return lightpink;
                }
            } else if (d.depth == 4) {
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
        });

    entering.append("svg:text")
        .attr("x", (legend.w + legend.t) / 2)
        .attr("y", legend.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function (d) { return d.name; });

    // Set position for entering and updating nodes.
    g.attr("transform", function (d, i) {
        return "translate(" + i * (legend.w + legend.s) + ", 0)";
    });

    // Remove exiting nodes.
    g.exit().remove();


    // Now move and update the percentage at the end.
    d3.select("#trail").select("#endlabel")
        .attr("x", (nodeArray.length + 0.5) * (legend.w + legend.s))
        .attr("y", legend.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(studentcount);

    // Make the breadcrumb trail visible, if it's hidden.
    d3.select("#trail")
        .style("visibility", "");

}