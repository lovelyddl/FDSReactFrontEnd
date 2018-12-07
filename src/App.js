import React, { Component } from 'react';
import { HashRouter  as Router, Route } from "react-router-dom";

import './assets/css/App.css';
import Layout from './components/layout'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" component={Layout} />
        </Router>
      </div>
    );
  }
}

export default App;
