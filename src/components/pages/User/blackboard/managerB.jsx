import React from 'react'
import { withRouter } from "react-router";

class ManagerB extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <h1> ManagerB </h1>
      </div>
    );
  }
}

export default withRouter(ManagerB)