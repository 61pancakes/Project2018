var data = [
    {
        "veertienvijftien": "29",
        "zeventienachttien": "89",
        "dertienveertien": "21",
        "twaalfdertien": "23",
        "course": "BA Artificial Intelligence F",
        "zestienzeventien": "65",
        "vijftienzestien": "41"
    },
    {
        "veertienvijftien": "171",
        "zeventienachttien": "324",
        "dertienveertien": "160",
        "twaalfdertien": "110",
        "course": "BA Artificial Intelligence M",
        "zestienzeventien": "267",
        "vijftienzestien": "200"
    }
];

$(function () {
    console.log("test");
    $('#table').bootstrapTable({
        data: data
    });
});

// d3.json("data/json/barchart.json", function (jsonData) {
//     $('#table').bootstrapTable({
//         data: jsonData
//     });
// });