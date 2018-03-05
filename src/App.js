// @flow
import React, { Component } from 'react';
import './App.css';
import update from 'immutability-helper';
import { Week, Session } from './Model';
import SessionForm from './components/SessionForm';

type Props = { }

type AppState =
  'Initial' | 'Main'

type State = { 
  app: AppState,
  sessions: Array<Session>,
  weeks: Array<Week>,
  thisWeek: ?Week
};

class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    
    this.state = { 
      app: 'Initial',
      sessions: [],
      weeks: [],
      thisWeek: null
    }

    this.addSession = this.addSession.bind(this);
    this.updateSession = this.updateSession.bind(this);
    this.removeSession = this.removeSession.bind(this);
    this.generate4Weeks = this.generate4Weeks.bind(this);
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

  removeSessionFromThisWeek = (index: number) => {
    this.setState(prevState => update(prevState, {
      thisWeek: { sessions : { $splice: [[index, 1]] } }
    }));
  }

  updateSessionFromThisWeek = (event: SyntheticInputEvent<>, index: number) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => update(prevState, {
      thisWeek : {
        sessions: { 
          [index]: {
            [name]: {$set: value}
          } 
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

    const thisWeek = {
      sessions
    }

    this.setState(prevState => update(prevState, {
      app: { $set: 'Main' },
      weeks: { $set: weeks },
      thisWeek: { $set: thisWeek }
    }));
  }

  pluralize = (unitName: string, count: number) => {
    return count === 1 
      ? `${count} ${unitName}`
      : `${count} ${unitName}s`
  }

  getWeekTotal = (week: Week) => {
    return week.sessions.map(this.getSessionTotal).reduce((acc, val) => acc + val);
  }
  
  getSessionTotal = (session: Session) => {
    if(session.duration != null)
    {
      return session.intensity * session.duration;
    }
  }

  render() {
    return (
      <div className="container">
      { this.state.app === 'Initial' 
        ? (
          <div>
            <p>Start by telling us what a typical training week involves</p>
            <form onSubmit={e => this.generate4Weeks(e, this.state.sessions)}>
            {this.state.sessions.map((session, index) => (
              <SessionForm key={index} session={session} index={index} removeSession={this.removeSession} updateSession={this.updateSession} />              
            ))}
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
          <div>
            {this.state.weeks.map((week, i) => (
              <div key={i}>
                <h3>{this.pluralize("week", this.state.weeks.length - i)} ago <span className="bg-success pull-right">{this.getWeekTotal(week)}</span></h3>
              </div>
            ))}
            <h3>This week <span className="bg-success pull-right">{this.getWeekTotal(this.state.thisWeek)}</span></h3>

            {this.state.thisWeek != null &&
              this.state.thisWeek.sessions.map((session, index) => (
                <SessionForm session={session} key={index} index={index} removeSession={this.removeSessionFromThisWeek} updateSession={this.updateSessionFromThisWeek} />
              ))}
            
          </div>
        )}
        </div>);
  }
}

export default App;
