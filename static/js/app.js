// Read samples.json
const url = "/samples.json";

// function to initialize and set ID dropdown
function init() {
  d3.json(url).then(x => {
    x.names.map(each => {
      var dropDown = d3.select("#selDataset");
      var idDrop = dropDown.append("option");
      idDrop.attr("value", each).text(`${each}`);
      console.log(dropDown);
    })
    optionChanged(x.names[0]);
  })
}

// On id change handler
function optionChanged (id) {
  buildAllCharts(id);
}

// function to build all charts
function buildAllCharts (id) {

  d3.json(url).then((raw) => {
    console.log(raw);
    
    data = raw.samples.filter(d => d.id === id);
    metaData = raw.metadata.filter(d => d.id == id);

    // Extract the sliced sample_values from the samples data
    var sampleValues = data.map(x=>x.sample_values.slice(0,10))[0];
    console.log(sampleValues);
    // Extract all sample_values 
    var allSampleValue = data.map(x => x.sample_values)[0];
    console.log(allSampleValue);

    // Extract sliced otu_ids
    var otuIds = data.map(x=>x.otu_ids.slice(0,10))[0];
    console.log(otuIds);
    // Extract all otu_ids
    var allOtuIds = data.map(x=>x.otu_ids)[0];
    console.log(allOtuIds);

    // Convert otu_id to string
    var yLabels = []
    for (let i = 0; i < otuIds.length; i++) {
      otuString = otuIds[i].toString()
      yLabels.push(`OTU ${otuString}`)
    }

    // Extract sliced otu_labels 
    var otuLabels = data.map(x=>x.otu_labels.slice(0,10))[0];
    console.log(otuLabels);
    // Extract all otu_labels
    var allOtuLabels = data.map(x=>x.otu_labels)[0];
    console.log(allOtuLabels);

    // Extract wash frequency 
    var washFreq = metaData.map(x=>x.wfreq)[0];
    console.log(washFreq);

    barCharts(sampleValues, yLabels, otuLabels);
    metaTable(metaData);
    bubbleChart(allOtuIds, allSampleValue,allOtuLabels, allSampleValue, allOtuIds)
    gaugeChart(washFreq);
  })
}

// function to build bar charts
function barCharts (xValue, yValue, textValue) {
  trace = {
    x: xValue,
    y: yValue,
    type: "bar",
    text: textValue,
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
}

// Build demographic table
function metaTable (data) {
  var x = d3.select("#sample-metadata");
  x.html("");
  data.forEach(d => {
    Object.entries(d).forEach(([k, v]) => {
      var row = x.append("div")
      row.text(`${k}: ${v}`)
    })
  })
}

// Build bubble chart
function bubbleChart (xValue, yValue, textValue, markerSize, markerColor) {
  var trace = {
    x: xValue,
    y: yValue,
    text: textValue, 
    mode: "markers",  
    marker: {
      size: markerSize,
      color: markerColor
    }
  };

  var data = [trace];

  var layout = {
    xaxis: {
      title: "OTU ID"
    },
    showlegend: false,
    height:500,
    width: 1100,
  };

  Plotly.newPlot("bubble", data, layout);

}

// Build gauge chart
function gaugeChart (gValue) {
  var data = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: gValue,
      title: { text: "Scrubs per Week", font: { size: 14 } },
      gauge: {
        axis: { range: [0, 9], tickwidth: 1, tickcolor: "black" },
        bar: { color: "#2980B9" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "black",
        steps: [
          { range: [0, 1], color: "#CB4335" },
          { range: [1, 2], color: "#E74C3C" },
          { range: [2, 3], color: "#EC7063 " },
          { range: [3, 4], color: "#F1C40F" },
          { range: [4, 5], color: "#F4D03F" },
          { range: [5, 6], color: "#F7DC6F" },
          { range: [6, 7], color: "#28B463" },
          { range: [7, 8], color: "#239B56" },
          { range: [8, 9], color: "#1D8348" }
        ],
      }
    }
  ];
  
  var layout = {
    width: 450,
    height: 400,
    margin: { t: 0, r: 25, l: 25, b: 50 },
    font: { color: "black", family: "Arial" }
  };
  
  Plotly.newPlot('gauge', data, layout);
}

init()