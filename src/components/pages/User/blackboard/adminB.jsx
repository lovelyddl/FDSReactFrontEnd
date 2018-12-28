import React from 'react'
import { withRouter } from "react-router";

class AdminB extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <h1> AdminB </h1>
      </div>
    );
  }
}

export default withRouter(AdminB)