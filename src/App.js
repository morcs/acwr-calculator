// @flow
import React, { Component } from 'react';
import './App.css';
import update from 'immutability-helper'

type AppState =
  'Initial' | 'Main'

type Props = { }

type Session = {
  intensity: number,
  duration: ?number
}

type Week = {
  sessions: Array<Session>
}

type State = { 
  app: AppState,
  sessions: Array<Session>,
  weeks: Array<Week>
};

class App extends Component<Props, State> {

  constructor(props: any) {
    super(props);
    
    this.state = { 
      app: 'Initial',
      sessions: [],
      weeks: []
    }

    this.addSession = this.addSession.bind(this);
    this.updateSession = this.updateSession.bind(this);
    this.removeSession = this.removeSession.bind(this);
    this.undefinedToEmpty = this.undefinedToEmpty.bind(this);
    this.generate4Weeks = this.generate4Weeks.bind(this);
    this.renderSessionForm = this.renderSessionForm.bind(this);
  }

  addSession = () => {
    this.setState(prevState => ({
      sessions: [...prevState.sessions, { intensity: 7, duration: undefined }]
    }));
  }

  removeSession = (index: number) => {
    this.setState(prevState => update(prevState, {
      sessions: { $splice: [[index, 1]] }
    }));
  }

  updateSession = (event: SyntheticInputEvent<>, index: number) => {
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

  generate4Weeks = (e: SyntheticEvent<>, sessions: Array<Session>) => {
    e.preventDefault();

    const iterations = [1,2,3,4];

    const weeks = iterations.map(() => ({
      sessions
    }));

    this.setState(prevState => update(prevState, {
      app: { $set: 'Main' },
      weeks: { $set: weeks }
    }));
  }

  getSessionTotal(session: Session) {
    if(session.duration != null)
    {
      return session.intensity * session.duration;
    }
  }

  getWeekTotal(week: Week) {
    return week.sessions.map(this.getSessionTotal).reduce((acc, val) => acc + val);
  }

  undefinedToEmpty = (value: any) => {
    return !value && value !== 0 ? '' : value;
  }

  renderSessionForm = (session: Session, index: number) => (
    <div className="panel panel-default" key={index}>
      <div className="panel-heading">
        Session {index + 1}
        <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true" onClick={() => this.removeSession(index)}></span>
      </div>
      <div className="panel-body">
        <div className="form-group">
          <label htmlFor="intensity">Intensity/sRPE (1-10)</label>
          <select name="intensity" value={session.intensity} className="form-control" id="intensity" onChange={(event) => this.updateSession(event, index)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>
        {' '}
        <div className="form-group">
          <label htmlFor="duration">Duration (mins)</label>
          <input name="duration" type="number" value={this.undefinedToEmpty(session.duration)} className="form-control" id="duration" placeholder="Duration (mins)" onChange={(event) => this.updateSession(event, index)} required />
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div className="container">
      { this.state.app === 'Initial' 
        ? (
          <div>
            <p>Start by telling us what a typical training week involves</p>
            <form onSubmit={e => this.generate4Weeks(e, this.state.sessions)}>
            {this.state.sessions.map((session, index) => this.renderSessionForm(session,index))}
            <div className="row form-group">
              <div className="col-sm-12">
                <button type="button" className="btn btn-default" onClick={this.addSession}>
                  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add session
                </button>
                {this.state.sessions.length > 0 && 
                  <button className="btn btn-primary pull-right">
                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Week complete
                  </button>
                }
              </div>
            </div>
            </form>
          </div>
        )
        : (
          <div>{this.state.weeks.map((week, i) => (
            <div key={i}>
              <h3>{this.state.weeks.length - i} weeks ago ({this.getWeekTotal(week)})</h3>
            </div>
          ))}</div>
        )}
        </div>);
  }
}

export default App;
