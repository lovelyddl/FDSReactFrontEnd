import React from 'react'

class Blackboard extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <h1> Blackboard Page </h1>
        <h1> My Task or My Order </h1>
      </div>
    );
  }
}

export default Blackboard