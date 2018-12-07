import React from 'react'
import '../../assets/css/index.scss';
import background from '../../assets/img/home.jpg';
import { connect } from "react-redux";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: props.userInfo
    };
    console.log(props.userInfo)
  }

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

const mapStateToProps = (state) => {
  return {
    userInfo: state
  }
}

export default connect(mapStateToProps)(Index);