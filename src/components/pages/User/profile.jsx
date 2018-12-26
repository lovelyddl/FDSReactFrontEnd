import React from 'react'

class PersonalSpace extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <h1>User Profile Page</h1>
      </div>
    );
  }
}

export default PersonalSpace