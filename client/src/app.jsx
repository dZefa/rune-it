import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Landing from './components/landingPage.jsx';

class App extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={() => (
          <Landing />)} />
      </Switch>
    )
  }
};

export default App;
