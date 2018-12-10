import React, { Component } from 'react';
import { HashRouter  as Router, Route } from "react-router-dom";

import './assets/css/App.css';
import Layout from './components/layout'
import Promise from 'promise-polyfill';

// To add to window  解决promise 在ie中未定义的问题
if (!window.Promise) {
 window.Promise = Promise;
}

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
