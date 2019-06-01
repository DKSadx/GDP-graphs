import React, { Component } from 'react';
import './App.scss';
import * as d3 from 'd3';
import axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  componentDidMount() {
    // axios.get('https://api.tradingeconomics.com/historical/country/bosnia%20and%20herzegovina/indicator/gdp?c=guest:guest&format=json')
    //   .then(res => {
    //     const data = res.data;
    //     this.setState({ data });
    //     console.log(data)
    //   })
    // https://docs.tradingeconomics.com/?javascript#indicators
    // https://tradingeconomics.com/bosnia-and-herzegovina/gdp
    axios.get("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
  }

  draw() {
    const h = 900;
    const w = 1800;
    const evenBarColor = "#0B132B";
    const oddBarColor = "#1C2541";
    // Scales the height of the bars from 0,max to 0,h
    const scaleHeight = d3.scaleLinear();
    scaleHeight
      .domain([0, d3.max(this.state.data.data, d => d[1])])
      .range([0, h]);

    const xAxis = d3.axisBottom(xScale);



    const tooltip = d3.select(".App")
      .append("div")
      .attr("class", "tooltip");

    // Creates svg in div(App)
    const svg = d3.select(".App").append("svg")
      .attr("width", w)
      .attr("height", h);

    // Creates rectangle(bars) in bar-chart
    svg.selectAll("rect")
      .data(this.state.data.data)
      .enter()
      .append("rect")
      .attr("width", (d, i) => w / this.state.data.data.length + 5)
      .attr("height", d => scaleHeight(d[1]))
      .attr("x", (d, i) => i * (w / this.state.data.data.length))
      .attr("y", d => h - scaleHeight(d[1]))
      // .attr("class", "bar")   // adds bar class to element
      .each((d, i, node) => {       // Third arg is the node, node[i] targets the current bar
        i % 2 === 0 ? d3.select(node[i]).style("fill", evenBarColor) : d3.select(node[i]).style("fill", oddBarColor);
      })
      .on("mouseover", (d, i, node) => {
        tooltip.text(`Date: ${d[0]}, GDP: ${d[1]}`)
          .style("opacity", 1)
          .style("left", i * 4 + "px")
          .style("top", h - 200 + "px");
        d3.select(node[i]).style("fill", "cyan");
      })
      .on("mouseout", (d, i, node) => {
        tooltip.style("opacity", 0);
        if (i % 2 === 0) {
          d3.select(node[i]).style("fill", evenBarColor);
        } else {
          d3.select(node[i]).style("fill", oddBarColor);
        }
      });

    // this.boi = this.svg
    //   .append("text")
    //   .attr("x", 30)
    //   .attr("y", 30)

  }


  render() {
    this.state.data !== undefined && this.draw();
    return (
      <div className="App">
      </div >
    )
  }
}
