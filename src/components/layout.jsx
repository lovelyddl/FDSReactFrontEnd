import React from 'react';
import '../assets/css/layout.scss';
import { Route, Link, Redirect } from "react-router-dom";
import Loadable from 'react-loadable';
import PropTypes from "prop-types";
// import pages
import About from '../components/pages/about';
import Blackboard from './pages/PersonalSpace/blackboard';
import Profile from './pages/PersonalSpace/profile';
import Cart from './pages/PersonalSpace/cart';
import Loading from './loading';
import Unauthorization from './unauthorization';
// import functions
import { connect } from "react-redux";
import { addUser } from "../redux/actions"
import { checkLog, logout } from "../api/user";
import { checkPermission } from '../shared/utils/permission';


// loading the pages
let Index = Loadable({ loader: () => import('./pages/index'), loading: Loading })
let SignUp = Loadable({ loader: () => import('../components/pages/User/signup'), loading: Loading })
let LogIn = Loadable({ loader: () => import('../components/pages/User/login'), loading: Loading })
let restList = Loadable({ loader: () => import('./pages/Restaurants/RestList'), loading: Loading })

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
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
    if (this.props.location.pathname !== '/') {
      this.props.history.push('/')
    }
  }

  render() {
    const { userInfo } = this.props;
    let cart = checkPermission(userInfo).isCustomer ? <div className="item"><Link to="/cart" replace><i className="shopping cart icon"></i></Link></div> : null;
    let log = checkPermission(userInfo).isLog ? <div className="item"><div onClick={this.logOut} className="ui button red">Log out</div></div> : <div className="item"><Link to="/login" className="ui button" replace>Log in</Link></div>;
    let sign = checkPermission(userInfo).isLog ? null : <div className="item"><Link to="/signup" className="ui primary button" replace>Sign Up</Link></div>;

    return (
        <div className="layout-style">
          <div className="header">
            <div className="ui menu inverted fixed">
                <div className="item title-word">
                  <Link to="/" replace><i className="yen sign icon"></i><i className="dollar sign icon"></i>Food Delivery System</Link>
                </div>
                <div className="container select-menu">
                  <Link to="/about" className="item" replace>About Us</Link>
                  <Link to="/blackboard" className="item" replace>Blackboard</Link>
                  <Link to="/Profile" className="item" replace>Profile</Link>
                </div>
              <div className="ui right menu inverted">
                {cart}
                {log}
                {sign}
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
            <Route path="/cart" render={() => (checkPermission(userInfo).isCustomer ? (<Redirect to={Cart}/>) : (<Unauthorization/>)) }/>
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