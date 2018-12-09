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
        <div class="ui message">
          <div class="header">网站新功能 </div>
          <ul class="list">
            <li>您现在可以在博客页拥有封面照片</li>
            <li>写作的时候可以自动保存草稿</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.userInfo;
}

export default connect(mapStateToProps)(Index);