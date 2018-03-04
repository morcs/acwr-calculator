// @flow
import React, { Component } from 'react';
import update from 'immutability-helper'
import { Week, Session } from '../Model'

type Props = {}

type State = {};

class App extends Component<Props, State> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="container"></div>
    );
  }
}

export default App;
