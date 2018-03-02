import React, { Component } from 'react';
import './App.css';
import update from 'immutability-helper'

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      sessions: []
    }

    this.addSession = this.addSession.bind(this);
    this.updateSession = this.updateSession.bind(this);
    this.removeSession = this.removeSession.bind(this);
  }

  addSession() {
    this.setState(prevState => ({
      sessions: [...prevState.sessions, { intensity: "", duration: "" }]
    }));
  }

  removeSession(index) {
    this.setState(prevState => update(prevState, {
      sessions: { $splice: [[index, 1]] }
    }));
  }

  updateSession(event, index) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => update(prevState, {
      sessions: { 
        [index]: {
          [name]: {$set: value}
        } 
      }
    }));
  }

  renderSession

  render() {
    return (
      <div className="container">
        <p>Start by telling us what a typical training week involves</p>
        {this.state.sessions.map((session, index) => {
          return (
            <div className="panel panel-default" key={index}>
              <div className="panel-heading">
                Session {index + 1}
                <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true" onClick={() => this.removeSession(index)}></span>
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <label className="sr-only" htmlFor="intensity">Intensity/sRPE (1-10)</label>
                  <input name="intensity" type="number" value={session.intensity} className="form-control" id="intensity" placeholder="Intensity/sRPE (1-10)" onChange={(event) => this.updateSession(event, index)} />
                </div>
                {' '}
                <div className="form-group">
                  <label className="sr-only" htmlFor="duration">Duration (mins)</label>
                  <input name="duration" type="number" value={session.duration} className="form-control" id="duration" placeholder="Duration (mins)" onChange={(event) => this.updateSession(event, index)} />
                </div>
              </div>
            </div>
          );
        })}
        <div className="row form-group">
          <div className="col-sm-12">
            <button className="btn btn-default" onClick={this.addSession}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add session
            </button>
            {this.state.sessions.length > 0 && 
              <button className="btn btn-primary pull-right">
                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Week complete
              </button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
