import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import axios from 'axios';

import Landing from './components/landingPage.jsx';

class App extends Component {
  constructor() {
    super();

    this.state = {
      champions: [],
    }
  }

  componentDidMount() {
    // const thisState = this;
    // axios.get(`${process.env.REST_SERVER_URL}:${process.env.REST_SERVER_PORT}/api/getChamps`)
    //   .then(res => {
    //     thisState.setState({
    //       champions: res.data.result,
    //     });
    //   })
    //   .catch(err => {
    //     console.log(`Error grabbing champions from REST server. Error: ${err}`);
    //   });
  }

  render() {
    const { champions } = this.state;

    return (
      <Switch>
        <Route exact path="/" component={() => (
          <Landing champions={champions} />)} />
      </Switch>
    )
  }
};

export default App;
