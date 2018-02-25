import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      date: new Date(),
      intensity: null,
      duration: null,
      entries: []
    }

    this.addEntry = this.addEntry.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  addEntry() {
    this.setState(prevState => ({
      entries: [...prevState.entries, { date: this.state.date, intensity: this.state.intensity, duration: this.state.duration }]
    }));
  }

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
            {this.state.entries.map(e => 
              (<tr>
                <td>{e.date}</td>
                <td>{e.intensity}</td>
                <td>{e.duration}</td>
                <td>{e.intensity * e.duration}</td>
              </tr>)
            )}
            <tr>
              <td><input name="date" type="date" className="form-control" value={this.state.date} onChange={this.handleInputChange} /></td>
              <td><input name="intensity" type="number" className="form-control" value={this.state.intensity} onChange={this.handleInputChange} /></td>
              <td><input name="duration" type="number" className="form-control" value={this.state.duration} onChange={this.handleInputChange} /></td>
              <td><input type="submit" value="Add" className="btn btn-primary" onClick={this.addEntry} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
