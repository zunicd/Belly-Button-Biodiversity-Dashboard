
const url = "../../data/samples.json";

d3.json(url).then(function (data) {
  data = data[0];
  console.log(data);

  let subjectIDs = data.names;
  console.log(subjectIDs);

  // Add options
  subjectIDs.forEach(subject => {
    let options = d3.select("#selDataset").append("option");
    options.attr("value", subject).text(subject);
  });

  // Initial build
  buildDashboard(data, subjectIDs[0], init = true);

  // On change to the DOM, call optionChanged()
  d3.selectAll("#selDataset").on("change", function () { optionChanged(data) });

});

// Function called by DOM changes
function optionChanged(data) {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let subject = dropdownMenu.property("value");
  buildDashboard(data, subject);
}

// Function to build Dashboard
function buildDashboard(data, subject, init = false) {
  console.log("data", data);
  console.log("sub", subject);
  let metadata = data.metadata.filter(m => m.id === parseInt(subject));
  console.log(metadata);

  let samples = data.samples.filter(s => s.id === subject);
  console.log(subject, samples);

  let sample_values = samples.map(s => s.sample_values);
  let otu_ids = samples.map(s => s.otu_ids);
  let otu_labels = samples.map(s => s.otu_labels);
  console.log(sample_values);
  console.log(otu_ids);
  console.log(otu_labels);

  // var lengths = sample_values.map(l => l.length);
  // console.log(lengths);

  let sample_values_10 = sample_values[0].slice(0, 10).reverse();
  let otu_ids_10 = otu_ids[0].slice(0, 10).reverse().map(id => `OTU ${id}`);
  let otu_labels_10 = otu_labels[0].slice(0, 10).reverse();
  console.log(sample_values_10);
  console.log(otu_ids_10);
  console.log(otu_labels_10);

  // Display sample metadata
  let panel = d3.select("#sample-metadata");
  let mdString = "";

  Object.entries(metadata[0]).forEach(([key, value]) => {
    mdString += `<p>${key}: ${value}</p>`
  });

  panel.html(mdString);

  // Define colorscale for buble charts
  let colorScale = "Cividis";

  // Horizontal bar chart
  let hBarTrace = {
    type: 'bar',
    x: sample_values_10,
    y: otu_ids_10,
    text: otu_labels_10,
    orientation: 'h',
    marker: {
      color: "orangered",
    },
    width: 0.9
  };

  let hBarLayout = {
    width: 480,
    height: 420,
    margin: {
      t: 0,
      b: 20
      // pad: 4
    }
  };

  // Buble Chart
  let bubbleTrace = {
    x: otu_ids[0],
    y: sample_values[0],
    text: otu_labels[0],
    mode: 'markers',
    marker: {
      color: otu_ids[0],
      size: sample_values[0],
      colorscale: colorScale
    }
  };

  let bubbleLayout = {
    showlegend: false,
    xaxis: { title: "OTU ID" },
    height: 600,
    // width: 600
  };

  // Gauge chart
  let gaugeTrace = {
    domain: { x: [0, 1], y: [0, 1] },
    value: metadata[0].wfreq,
    title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      bar: {
        color: "red"
      },
      axis:
      {
        range: [null, 9],
        nticks: 10
      },
      steps: [
        { range: [0, 1], color: "#ecfaea" },
        { range: [1, 2], color: "#c7f0c1" },
        { range: [2, 3], color: "#a1e798" },
        { range: [3, 4], color: "#8ee283" },
        { range: [4, 5], color: "#7bdd6e" },
        { range: [5, 6], color: "#56d345" },
        { range: [6, 7], color: "#43cf30" },
        { range: [7, 8], color: "#3cba2c" },
        { range: [8, 9], color: "#36a527" }
      ]
    }
  };

  let gaugeLayout = {
    width: 600,
    height: 400,
    // paper_bgcolor: "lavender",
    font: {
      color: "darkblue",
      // family: "Arial"
    }
  };

  // Initial plotting of all charts
  if (init) {
    Plotly.newPlot('bar', [hBarTrace], hBarLayout);
    Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);
    Plotly.newPlot('gauge', [gaugeTrace], gaugeLayout);
  }
  // Plotting after selection
  else {
    // Horizontal bar chart
    let hBarStyle = {
      x: [sample_values_10],
      y: [otu_ids_10],
      text: [otu_labels_10]
    };

    Plotly.restyle('bar', hBarStyle);

    // Buble Chart
    let bubbleStyle = {
      x: [otu_ids[0]],
      y: [sample_values[0]],
      text: [otu_labels[0]],
      marker: [{
        color: otu_ids[0],
        size: sample_values[0],
        colorscale: colorScale
      }]
    };

    Plotly.restyle('bubble', bubbleStyle);

    // Gauge chart
    let gaugeStyle = {
      value: [metadata[0].wfreq]
    };

    Plotly.restyle('gauge', gaugeStyle);

  }
}
















