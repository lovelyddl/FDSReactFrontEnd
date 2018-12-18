import React from 'react';
import '../../assets/css/home.scss';
import background from '../../assets/img/home.jpg';

class Home extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="home-page">
        <img className="home-img" src={background} alt=""/>
      </div>
    );
  }
}

export default Home