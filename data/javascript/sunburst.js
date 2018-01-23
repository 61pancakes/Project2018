/*  
 * Andrea van den Hooff
 * Minor Programmeren
 * 10439080
 * sunburst.js: This file creates a zoomable sunburst in d3 with data loaded in from a .json file.
 * Used https://bl.ocks.org/mbostock/4348373 as example.
 */

(function () {
    var coloringIndex = 0;
    /* Create the basis variables for the svg. */
    var margin = { top: 50, right: 250, bottom: 50, left: 50 },
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom,
        radius = (Math.min(width, height) / 2) - 10;

    /* x = radius */
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

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    var colorSlice = function (d) {
        var lightpink = "#ffe6ff",
            pink = "#ffb3ff",
            lightblue = "#99e6ff",
            blue = "#1ac6ff",
            courses = ["BA Artificial Intelligence", "MA Artificial Intelligence", "MA Astronomy and Astrophysics",
                "MA Biological Sciences", "BA Biology", "BA Biomedical Sciences", "MA Brain and Cognitive Sciences",
                "BA Chemistry", "MA Computational Science", "MA Computer Science", "BA Computing Science", "MA Earth Science", "MA Forensic Science",
                "BA Future Planet Studies", "BA Information Science", "MA Information Studies ", "MA Life Sciences", "MA Logic",
                "MA Mathematical Physics", "BA Mathematics", "BA Natural and Social Sciences", "MA Physics",
                "BA Physics and Astronomy", "BA Psychobiology", "MA Software Engineering", "MA Stochastics and Financial Mathematics", "MA System and Network Engineering"],
            colors = colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728",
                "#ff9896", "#9467bd", "#c5b0d5", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
                "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5", "#8c564b", "#393b79",
                "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b"];

        /* Color the boys/girls the right colors, rest is random. */
        if (d.depth == 0) {
            return "white";
        } else if (d.depth == 1) {
            return "grey";
        } else if (d.depth == 2) {
            return colors[courses.indexOf(d.name)];
        } else if (d.depth == 3) {
            if (d.name == "boys") {
                return lightblue;
            } else {
                return lightpink;
            }
        } else if (d.depth == 4) {
            if (d.parent.name == "boys") {
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
        } else {
            return "black";
        }
    }

    /* Load dataset from local server to create the circle partitions. */
    d3.json("data/json/sunburst.json", function (error, root) {
        var formatNumber = d3.format(",d");
        svg.selectAll("path")
            .data(partition.nodes(root))
            .enter().append("path")
            .attr("d", arc)
            .style("fill", colorSlice)
            .style("stroke", "none")
            .on("click", click)
            .on("mouseover", d3.select(this).style("stroke", "black"))
            .append("title")
            .text(function (d) { return d.name + "\n" + formatNumber(d.value); });
    });

    function click(d) {
        svg.transition()
            .duration(1000)
            .tween("scale", function () {
                var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                    yd = d3.interpolate(y.domain(), [d.y, 1]),
                    yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
                return function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
            })
            .selectAll("path")
            .attrTween("d", function (d) { return function () { return arc(d); }; });
    }

    d3.select(self.frameElement).style("height", height + "px");
})();
