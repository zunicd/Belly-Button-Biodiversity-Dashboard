# Belly-Button Biodiversity Dashboard

The link to the dashboard: https: https://zunicd.github.io/Belly-Button-Biodiversity-Dashboard/

### Objective

The purpose of this project is to build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### Plotly

[Plotly](https://plotly.com/javascript/) was used to plot all charts.

The D3 library was used to read in the input file `samples.json`.

The elements of the dashboard:

- A **dropdown menu** to select a sample.
- A **horizontal bar chart** to display the top 10 OTUs found in the selected individual.
- A **bubble chart** that displays each sample.
- An **individual's demographic information**. Each key-value pair from the metadata JSON object is displayed. 
- The **Gauge Chart** from https://plot.ly/javascript/gauge-charts/ was adapted to plot the weekly washing frequency of the individual.
- All of the plots are updated any time that a new sample is selected.



### Tools / Techniques Used:

- JavaScript
- D3.js
- Plotly
- HTML/CSS
- Bootstrap



### About Data

**Source:** Hulcr, J. et al.(2012) *A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable*. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/

***data/sample.json*** is the input file in a json format.