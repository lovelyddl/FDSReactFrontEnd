import React from 'react';

class Unauthorization extends React.Component {
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
      <div>
        <h1>Unauthorization</h1>
      </div>
    );
  }
}

export default Unauthorization;