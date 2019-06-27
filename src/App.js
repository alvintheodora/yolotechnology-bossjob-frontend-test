import React, { Component } from 'react';
import './App.css';
import Header from './shared/components/Header'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Job from './components/Job';

class App extends Component {
  
  render() {  
    return (
      <div className="App">
        <div className="App-Wrapper">
          <Header />

          <Router>
            <Switch>
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={Job} />
            </Switch>
          </Router>
               
        </div>
      </div>
    );
  }
}

export default App;
