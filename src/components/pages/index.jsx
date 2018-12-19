import React from 'react';
import '../../assets/css/index.scss';
import Home from './home'
import { Route, Link } from "react-router-dom";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="index-style">
        <div className="search-col">
          <Link to="/rest/list">
            <button class="ui teal large basic button">Go To Search Restaurants</button>
          </Link>
        </div>
        <div className="index-content">
          <Route path="/" component={Home} />
        </div>
      </div>
    );
  }
}

export default Index;