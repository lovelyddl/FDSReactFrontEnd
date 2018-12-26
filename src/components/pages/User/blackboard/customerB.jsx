import React from 'react'

class CustomerB extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <h1> CustomerB </h1>
      </div>
    );
  }
}

export default CustomerB