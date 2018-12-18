import React from 'react';
import '../assets/css/layout.scss';
import { Route, Link } from "react-router-dom";
// import Index from './pages/index';
import About from '../components/pages/about';
import Blackboard from './pages/PersonalSpace/blackboard';
// import SignUp from '../components/pages/User/signup';
// import LogIn from '../components/pages/User/login';
import Profile from './pages/PersonalSpace/profile';
import { connect } from "react-redux";
import { addUser } from "../redux/actions"
import PropTypes from "prop-types";
import { checkLog, logout } from "../api/user";
import Loadable from 'react-loadable';
import Loading from './loading';

// loading the pages
let Index = Loadable({ loader: () => import('./pages/index'), loading: Loading })
let SignUp = Loadable({ loader: () => import('../components/pages/User/signup'), loading: Loading })
let LogIn = Loadable({ loader: () => import('../components/pages/User/login'), loading: Loading })
let restList = Loadable({ loader: () => import('../components/pages/Restaurants/list'), loading: Loading })

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
      password: "",
      role: ""
    });
    this.props.history.push('/')
  }

  render() {
    let log = null
    if (this.props.userInfo !== undefined && this.props.userInfo.userId !== "" && this.props.userInfo.password !== "") {
      log = <div onClick={this.logOut} className="item"><div className="ui button red">Log out</div></div>;
    } else {
      log = <div className="item"><Link to="/login" className="ui button" replace>Log in</Link></div>
    }
    return (
        <div className="layout-style">
          <div className="header">
            <div className="ui menu inverted fixed">
                <div className="item title-word">
                  <Link to="/" replace>Food Delivery System</Link>
                </div>
                <div className="container select-menu">
                  <Link to="/about" className="item" replace>About Us</Link>
                  <Link to="/blackboard" className="item" replace>Blackboard</Link>
                  <Link to="/Profile" className="item" replace>Profile</Link>
                </div>
              <div className="ui right menu inverted"> 
                {log}
                <div className="item">
                  <Link to="/signup" className="ui primary button" replace>Sign Up</Link>
                </div>
              </div>
            </div>    
          </div>
          <div className="main">
            <Route path="/" exact component={Index} />
            <Route path="/about" component={About} />
            <Route path="/blackboard" component={Blackboard} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/profile" component={Profile} />
            <Route path="/rest/list" component={restList} />
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