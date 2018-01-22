/*  
 * Andrea van den Hooff
 * Minor Programmeren
 * 10439080
 * sunburst.js: This file creates a zoomable sunburst in d3 with data loaded in from a .json file.
 * Used https://bl.ocks.org/mbostock/4348373 as example.
 */

(function () {

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

    // /* Coloring function. */
    var colors = function (d) {
        var pink = "#ffb3ff";
        var blue = "#99e6ff";
        var colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728",
            "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
            "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];

        console.log(d);

        /* Color the boys/girls the right colors. */
        if (typeof (d) === "string") {
            if (d == "boys") {
                return blue;
            } else {
                return pink;
            }
        } else {
            return colors[Math.floor((Math.random() * 20) + 1)];
        }
    }

    /* Load dataset from local server to create the circle partitions. */
    d3.json("data/json/sunburst.json", function (error, root) {
        var formatNumber = d3.format(",d");

        svg.selectAll("path")
            .data(partition.nodes(root))
            .enter().append("path")
            .attr("d", arc)
            .style("fill", function (d, i) {
                if (!d.children.children) {
                    console.log(d.children);
                    return colors(d.children.name);
                }
            })
            .on("click", click)
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
