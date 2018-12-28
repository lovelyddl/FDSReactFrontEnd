import React from 'react'
import { withRouter } from "react-router";

class DeliveryManB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    // console.log(props)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <h1> DeliveryManB </h1>
      </div>
    );
  }
}

export default withRouter(DeliveryManB)