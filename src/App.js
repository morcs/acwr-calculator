import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'material-ui/Slider'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <DatePicker />
        <Slider />
        <TimePicker format="24hr" />
      </MuiThemeProvider>
    );
  }
}

export default App;
