// Read samples.json
const url = "../samples.json";

// function to build all charts
function buildAllCharts (id) {

  d3.json(url).then((raw) => {
    console.log(raw);
    
    data = raw.samples.filter(d => d.id === id);
    metaData = raw.metadata.filter(d => d.id == id);

    // Extract the sample_values from the samples data
    var sampleValues = data.map(x=>x.sample_values.slice(0,10))[0];
    console.log(sampleValues);


    var otuIds = data.map(x=>x.otu_ids.slice(0,10))[0];
    console.log(otuIds);

    var yLabels = []
    for (let i = 0; i < otuIds.length; i++) {
      otuString = otuIds[i].toString()
      yLabels.push(`OTU ${otuString}`)
    }

    var otuLabels = data.map(x=>x.otu_labels.slice(0,10))[0];
    console.log(otuLabels);

    barCharts(sampleValues, yLabels, otuLabels);
    metaTable(metaData)
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
  

function optionChanged (id) {
  buildAllCharts(id);

}


// function to initialize 
function init() {
    // create the drop down
    var html = ""
    d3.json(url).then(function(d){
       d.names.map(function(each){
           html += "<option value = "+each+" > "+each+"</option>"
       })
        // console.log(html);
        document.getElementById("selDataset").innerHTML = html;
        optionChanged(d.names[0]);
    })
  }
init()