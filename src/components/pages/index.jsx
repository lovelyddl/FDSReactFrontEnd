import React from 'react'
import '../../assets/css/index.scss';
import background from '../../assets/img/home.jpg';

class Index extends React.Component {

  render() {
    return (
      <div>
        <div className="home-header">
          <img className="home-img" src={background} alt=""/>
        </div>
      </div>
    );
  }
}

export default Index