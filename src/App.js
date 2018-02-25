import React, { Component } from 'react';
import './App.css';

class App extends Component {

  entries = [
    {
      date: '25 Feb 2018',
      intensity: 8,
      duration: 20,
    }
  ]

  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Intensity (sRPE)</th>
              <th>Duration (minutes)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.entries.map(e => 
              (<tr>
                <td>{e.date}</td>
                <td>{e.intensity}</td>
                <td>{e.duration}</td>
                <td>{e.intensity * e.duration}</td>
              </tr>)
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
