// @flow
import React from 'react';
import { Session } from '../Model'

type Props = {
    session: Session,
    index: number,
    removeSession: number => void,
    updateSession: (SyntheticInputEvent<>, number) => void
}

const undefinedToEmpty = (value: any) => {
  return !value && value !== 0 ? '' : value;
}

const SessionForm = ({ session, index, removeSession, updateSession }: Props) => {
    return (
      <div className="panel panel-default" key={index}>
        <div className="panel-heading">
          Session {index + 1}
          <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true" onClick={() => removeSession(index)}></span>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <label htmlFor="intensity">Intensity/sRPE (1-10)</label>
            <select name="intensity" value={session.intensity} className="form-control" id="intensity" onChange={(event) => updateSession(event, index)}>
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
            <input name="duration" type="number" value={undefinedToEmpty(session.duration)} className="form-control" id="duration" placeholder="Duration (mins)" onChange={(event) => updateSession(event, index)} required />
          </div>
        </div>
      </div>
      );
  }

export default SessionForm;
