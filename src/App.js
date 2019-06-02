import React, { Component } from 'react';
import './App.scss';
import USAflag from './images/flags/USA.png';
import BaHflag from './images/flags/BaH.png';
import USAGDP from './Components/USA_GDP/USA_GDP';
import BaHGDP from './Components/BaH_GDP/BaH_GDP';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "BaH"
    };
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
        {this.state.country === "USA"
          ? <><p className="title">United States GDP</p><USAGDP /></>
          : <><p className="title">Bosnia-Herzegovina GDP</p><BaHGDP /></>
        }
      </div >
    )
  }
}
