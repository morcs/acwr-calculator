import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
            <tr>
              <td>25 Feb 2018</td>
              <td>8</td>
              <td>20</td>
              <td>160</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
