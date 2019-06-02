import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import USAflag from './images/flags/USA.png';
import BaHflag from './images/flags/BaH.png';
import USAGDP from './Components/USA_GDP/USA_GDP'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "USA"
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

  render() {
    return (
      <div className="App">
        <div className="GDP-menu">
          <p>Select country:</p>
          <span className="USA" onClick={() => this.setState({ country: "USA" })}>
            <img src={USAflag} alt="USA flag" />
          </span>
          <span className="BaH" onClick={() => this.setState({ country: "BaH" })}>
            <img src={BaHflag} alt="BaH flag" />
          </span>
        </div>
        <p className="title">United States GDP</p>
        {this.state.data !== undefined && this.state.country === "USA"
          ? <USAGDP data={this.state.data} />
          : console.log("dasj")
        }
      </div >
    )
  }
}
