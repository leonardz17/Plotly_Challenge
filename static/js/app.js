// Read samples.json
const url = "../samples.json";

function barChart () {

  d3.json(url).then((data) => {
    console.log(data);
    
    // Extract the sample_values from the samples data
    var sampleValues = data.samples.map(x=>x.sample_values.slice(0,10));
    console.log(sampleValues);
    // var sampleValues1 = sampleValues[0];

    var otuIds = data.samples.map(x=>x.otu_ids.slice(0,10));
    console.log(otuIds);
    // var otuIds1 = otuIds[0];
    var ylabels = []
    for (let i = 0; i < otuIds.length; i++) {
      otuString = otuIds[i].toString()
      ylabels.push(`OTU ${otuString}`)
    }

    var otuLabels = data.samples.map(x=>x.otu_labels.slice(0,10));
    console.log(otuLabels);
    // var otuLabels1 = otuLabels[0];

    trace = {
      x: sampleValues1,
      y: ylabels,
      type: "bar",
      text: otuLabels1,
      orientation: 'h'
    };
    var layout = {
      yaxis: {
        autorange: 'reversed'
      },
      xaxis: {
        tick0: 0,
        dtick: 50
      }
    }

    var data = [trace]
    Plotly.newPlot('bar', data, layout);
  });

};
  















  // Initialize x and y arrays
//   if (dataset === 'dataset1') {
//     var x = [1, 2, 3, 4, 5];
//     var y = [1, 2, 4, 8, 16];
//     type = "line";
//     Plotly.restyle("plot", "x", [x]);
//     Plotly.restyle("plot", "y", [y]);
//     Plotly.restyle("plot", "type", type);
//   }

//   else if (dataset === 'dataset2') {
//     var x = [10, 20, 30, 40, 50];
//     var y = [1, 10, 100, 1000, 10000];
//     type = "pie";
//     Plotly.restyle("plot", "labels", [x]);
//     Plotly.restyle("plot", "values", [y]);
//     Plotly.restyle("plot", "type", type);
//   }

  // Note the extra brackets around 'x' and 'y'