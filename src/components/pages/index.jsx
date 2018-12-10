import React from 'react'
import '../../assets/css/index.scss';
import background from '../../assets/img/home.jpg';
import { connect } from "react-redux";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return (
      <div>
        <div className="home-header">
          <img className="home-img" src={background} alt=""/>
        </div>
<<<<<<< HEAD
        <div class="ui message">
          <div class="header">网站新功能 </div>
          <div class="ui list">
=======
        <div className="ui message">
          <div className="header">网站新功能 </div>
          <ul className="list">
>>>>>>> a5c77e6819ad906e0ab7cc0a6ecce391f0c332f1
            <li>您现在可以在博客页拥有封面照片</li>
            <li>写作的时候可以自动保存草稿</li>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.userInfo;
}

export default connect(mapStateToProps)(Index);