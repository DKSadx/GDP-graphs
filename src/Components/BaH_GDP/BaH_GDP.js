import * as d3 from 'd3';
import React, { Component } from 'react';
// import axios from 'axios';

export default class USAGDP extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    /*  --- Online data fetching ---
    axios.get('https://api.tradingeconomics.com/historical/country/bosnia%20and%20herzegovina/indicator/gdp?c=guest:guest&format=json')
      .then(res => {
        const data = res.data;
        this.setState({ data });
        console.log(data)
      })
    */
    //  Using local json data (for speed)
    const data = require('../../gdp/BaHGDPv2.json');
    this.setState({ data })
    window.addEventListener("resize", () => this.draw());
  }
  draw() {
    d3.select(".App").selectAll("svg").remove();    // Makes new svg replace old one(removes old one)
    d3.select(".App").selectAll(".tooltip").remove(); // Removes the hover tooltip on
    const h = document.documentElement.clientHeight * 0.69;
    const w = document.documentElement.clientWidth * 0.78;
    const padding = 30;
    const evenBarColor = "#0B132B";
    const oddBarColor = "#1C2541";
    // Scales the height of the bars from 0,max to 0,h
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.state.data.data, d => parseInt((d[1] / 1000000000).toFixed(2)) + 2)])
      .range([padding, h - padding]);
    // Reversed for the Y-axis
    const yScaleReverse = d3.scaleLinear()
      .domain([0, d3.max(this.state.data.data, d => parseInt((d[1] / 1000000000).toFixed(2)) + 1)])
      .range([h - padding, padding]);

    const xScale = d3.scaleLinear()
      .domain([0, this.state.data.data.length])
      .range([padding + 45, w - padding]);
    // Scales and writes the years on the x-axis
    const min = d3.min(this.state.data.data, d => d[0].split("-")[0])
    const max = d3.max(this.state.data.data, d => d[0].split("-")[0])
    const yearsScale = d3.scaleLinear()
      .domain([min, max])
      .range([padding + 45, w - padding]);

    // Tooltip when hovering over bars
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
      .attr("width", (d, i) => w / this.state.data.data.length - 4)
      .attr("height", d => yScale((d[1] / 1000000000).toFixed(2)) - padding)
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => h - yScale((d[1] / 1000000000).toFixed(2)))
      .each((d, i, node) => {       // Third arg is the node, node[i] targets the current bar
        i % 2 === 0
          ? d3.select(node[i]).style("fill", evenBarColor)
          : d3.select(node[i]).style("fill", oddBarColor);
      })
      .on("mouseover", (d, i, node) => {
        const date = d[0].split('-');
        tooltip.text(`Date: ${date[2]}.${date[1]}.${date[0]}, $${(d[1] / 1000000000).toFixed(2)} Billion`)
          .style("display", "inline")
          .style("left", (xScale(i) - ((w / 10) * 2.2)) + "px")
          .style("top", h - ((h / 10) * 3) + "px");
        d3.select(node[i]).style("fill", "cyan");
      })
      .on("mouseout", (d, i, node) => {
        tooltip.style("display", "none");
        if (i % 2 === 0) {
          d3.select(node[i]).style("fill", evenBarColor);
        } else {
          d3.select(node[i]).style("fill", oddBarColor);
        }
      });

    // Draws the X-axis, tickFormat formats the numbers to look like 0000 instead of 0,000
    const xAxis = d3.axisBottom(yearsScale).tickFormat(d3.format("d"))
    svg.append("g")
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis)
      .attr("class", "axes")

    // Draws the Y-axis
    const yAxis = d3.axisLeft(yScaleReverse)
    svg.append("g")
      .attr("transform", "translate(80, " + 0 + ")")
      .call(yAxis)
      .attr("class", "axes");

  }

  render() {
    this.state.data !== undefined && this.draw()
    return (<></>)
  }
}
