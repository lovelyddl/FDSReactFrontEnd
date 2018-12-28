import React from 'react';
import '../assets/css/layout.scss';
import { Route, Link, Redirect } from "react-router-dom";
import Loadable from 'react-loadable';
import PropTypes from "prop-types";
// import pages
import About from '../components/pages/about';
// import Blackboard from './pages/User/blackboard';
import CustomerB from '../components/pages/User/blackboard/customerB'
import DeliveryManB from '../components/pages/User/blackboard/deliveryManB'
import ManagerB from '../components/pages/User/blackboard/managerB'
import AdminB from '../components/pages/User/blackboard/adminB'
// import Profile from './pages/User/profile';
import Cart from './pages/User/cart';
import Loading from './loading';
import Unauthorization from './unauthorization';
import RestDetail from './pages/Restaurants/restDetail';
// import functions
import { connect } from "react-redux";
import { addUser } from "../redux/actions"
import { checkLog, logout } from "../api/user";
import { checkPermission } from '../shared/utils/permission';

// loading the pages
let Index = Loadable({ loader: () => import('./pages/index'), loading: Loading })
let SignUp = Loadable({ loader: () => import('../components/pages/User/signup'), loading: Loading })
let LogIn = Loadable({ loader: () => import('../components/pages/User/login'), loading: Loading })
let RestList = Loadable({ loader: () => import('./pages/Restaurants/restList'), loading: Loading })

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
      userName: "",
      password: "",
      role: ""
    });
    if (this.props.location.pathname !== '/') {
      this.props.history.push('/')
    }
  }

  renderBlackboard = () => {
    const { userInfo } = this.props;
    if (checkPermission(userInfo).isLog) {
      let checkRole = {
        customer: <CustomerB/>,
        deliveryMan: <DeliveryManB/>,
        manager: <ManagerB/>,
        admin: <AdminB/>
      }
      return checkRole[userInfo.role];
    } else {
      return <Unauthorization/>;
    }
  }

  render() {
    const { userInfo } = this.props;
    let bb = checkPermission(userInfo).isLog ? <div className="item"><Link to={`/blackboard/${userInfo.role}`} replace>Blackboard</Link></div> : null;
    let profile = checkPermission(userInfo).isLog ? <div className="item"><Link to="/profile" replace><i className="user circle icon"></i> <div className="user-icon-word"> {userInfo.userName}</div></Link></div> : null;
    let cart = checkPermission(userInfo).isCustomer ? <div className="item"><Link to="/cart" replace><i className="shopping cart icon"></i></Link></div> : null;
    let log = checkPermission(userInfo).isLog ? <div className="item"><div onClick={this.logOut} className="ui button red">Log out</div></div> : <div className="item"><Link to="/login" className="ui button" replace>Log in</Link></div>;
    let sign = checkPermission(userInfo).isLog ? null : <div className="item"><Link to="/signup" className="ui primary button" replace>Sign Up</Link></div>;

    let permissionContent = <div className="ui right menu inverted">{bb}{profile}{cart}{log}{sign}</div>;

    return (
        <div className="layout-style">
          <div className="header">
            <div className="ui menu inverted fixed">
                <div className="item title-word">
                  <Link to="/" replace><i className="yen sign icon"></i><i className="dollar sign icon"></i>Food Delivery System</Link>
                </div>
                <div className="container select-menu">
                  <Link to="/about" className="item" replace>About Us</Link>
                </div>
                {permissionContent}
            </div>    
          </div>
          <div className="main">
            <Route path="/" exact component={Index} />
            <Route path="/about" component={About} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            {/* <Route path="/rest" exact render={() => { return <Redirect to="/rest/list/"/> }}/> */}
            <Route path="/rest/list" exact component={RestList} />
            <Route path="/rest/detail" exact component={RestDetail} />
            <Route path="/unauthorization" component={Unauthorization} />
            <Route path="/cart" render={() => (checkPermission(userInfo).isCustomer ? (<Cart/>) : (<Redirect to="/unauthorization"/>)) }/>
            <Route exact path="/blackboard" render={() => ( checkPermission(userInfo).isLog ? (<Redirect to={`/blackboard/${userInfo.role}`}/>) : (<Redirect to="/unauthorization"/>))}/>
            <Route path={`/blackboard/${userInfo.role}`} render={this.renderBlackboard} />
            <Route path="/profile" render={() => (checkPermission(userInfo).isLog ? (<SignUp userName={userInfo.userName} role={userInfo.role}/>) : (<Redirect to="/unauthorization"/>)) } />
          </div>
        </div>
    );
  }

}

Layout.propTypes = {
  userInfo: PropTypes.shape({
    userName: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string
  }),
  addUser: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return state.userInfo;
}

export default connect(mapStateToProps, {addUser})(Layout);