import React from 'react';
import '../../assets/css/index.scss';
import Home from './home'
import { Route, Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

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
            <Button> Search Restaurants </Button>
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