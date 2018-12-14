import React from 'react'

class AboutPage extends React.Component {

  // constructor(props) {
  //   super(props)
  //   // console.log(this.props.history.location.pathname)
  // }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <h1>About Us</h1>
      </div>
    );
  }
}

export default AboutPage