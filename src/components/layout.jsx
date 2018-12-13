import React from 'react';
import '../assets/css/layout.scss';
import { Route, Link } from "react-router-dom";
import Home from './pages/home';
import About from '../components/pages/about';
import Blackboard from './pages/PersonalSpace/blackboard';
import SignUp from '../components/pages/User/signup';
import LogIn from '../components/pages/User/login';
import Profile from './pages/PersonalSpace/profile';
import { connect } from "react-redux";
import { addUser } from "../redux/actions"
import PropTypes from "prop-types";
import { checkLog, logout } from "../api/user";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //searchQuery: []
    }
  }

  componentDidMount() {
    // refresh to check if log
    let res = checkLog();
    res.then((response) => {
      let data = response.data
      if (data.code === 1) {
        console.log(data.error);
      } else if (data.code === 0) {
        this.props.addUser(data.userInfo);
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  // handleChange = (val, text) => {
  //   this.setState({
  //     searchQuery: text.value
  //   }, () => {
  //     // 此时调用的是及时更新后的state
  //     console.log(this.state.searchQuery);
  //   })
  // }

  logOut = () => {
    let res = logout()
    res.then((response) => {
      let data = response.data
      if (data.code === 0) {
        console.log('log out successfully')
      } 
    }).catch(function (error) {
      console.log('failed to log out')
    })
    this.props.addUser({
      userId: "",
      password: ""
    });
    this.props.history.push('/')
  }

  render() {
    let log = null
    if (this.props.userInfo !== undefined && this.props.userInfo.userId !== "" && this.props.userInfo.password !== "") {
      log = <div onClick={this.logOut} className="item"><div className="ui button red">Log out</div></div>;
    } else {
      log = <div className="item"><Link to="/login" className="ui button">Log in</Link></div>
    }
    return (
        <div className="layout-style">
          <div className="header">
            <div className="ui menu inverted">
                {/*如果在这上面的classname里加fixed的话，header能fixed，但每一页下面的内容都会往上窜*/}
              <div className="ui left menu  inverted select-menu">
              <div className="item title-word">
                <Link to="/">Food Delivery System</Link>
              </div>
              </div>
                <div className="container select-menu">
                    <Link to="/about" className="item">About Us</Link>
                    <Link to="/blackboard" className="item">Blackboard</Link>
                    <Link to="/Profile" className="item">Profile</Link>
                </div>
              <div className="ui right menu inverted">
                {log}
                <div className="item">
                  <Link to="/signup" className="ui primary button">Sign Up</Link>
                </div>
              </div>
            </div>    
          </div>
          {/*<div className="sub-header">*/}
            {/*<div className="ui menu">*/}
              {/*<div className="container select-menu">*/}
                {/*<Link to="/" className="item">Home</Link>*/}
                {/*<Link to="/about" className="item">About Us</Link>*/}
                {/*<Link to="/blackboard" className="item">Blackboard</Link>*/}
                {/*<Link to="/profile" className="item">Your Space</Link>*/}
              {/*</div>*/}
            {/*</div>  */}
          {/*</div>*/}
          <div className="main">
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/blackboard" component={Blackboard} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/profile" component={Profile} />
          </div>
        </div>
    );
  }

}

Layout.propTypes = {
  userInfo: PropTypes.shape({
    userId: PropTypes.string,
    password: PropTypes.string
  }),
  addUser: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return state.userInfo;
}

export default connect(mapStateToProps, {addUser})(Layout);