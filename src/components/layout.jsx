import React from 'react';
import '../assets/css/layout.scss';
import { Route, Link } from "react-router-dom";
import Index from '../components/pages/index';
import About from '../components/pages/about';
import Blackboard from '../components/pages/blackboard';
import SignUp from '../components/pages/User/signup';
import LogIn from '../components/pages/User/login';
import PersonalSpace from '../components/pages/PersonalSpace/index';
import { Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";
import { addUser } from "../redux/actions"
import PropTypes from "prop-types";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchOptions: [
        {
          key: "restName",
          value: "restName",
          text: 'restaurants name'
        },
        {
          key: "restAddr",
          value: "restAddr",
          text: 'restaurants address'
        },
        {
          key: "zipcode",
          value: "zipcode",
          text: 'city zipcode'
        },
        {
          key: "restType",
          value: "restType",
          text: 'restaurants type'
        }
      ],
      searchQuery: []
    }
  }

  handleChange = (val, text) => {
    this.setState({
      searchQuery: text.value
    }, () => {
      // 此时调用的是及时更新后的state
      console.log(this.state.searchQuery);
    }) 
  }

  logOut = () => {
    this.props.addUser({
      userId: "",
      password: ""
    });
    this.props.history.push('/')
  }

  render() {
    const { searchOptions } = this.state;
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
              <div className="ui left menu  inverted select-menu">
              <div className="item title-word">
                Food Delivery System
              </div>
              </div>
              <div className="ui right menu inverted">
                {log}
                <div className="item">
                  <Link to="/signup" className="ui primary button">Sign Up</Link>
                </div>
              </div>
            </div>    
          </div>
          <div className="sub-header">
            <div className="ui menu">
              <div className="container select-menu">
                <Link to="/" className="item">Home</Link>
                <Link to="/about" className="item">About Us</Link>
                <Link to="/blackboard" className="item">Blackboard</Link>
                <Link to="/personalSpace" className="item">Your Space</Link>
              </div>
              <div className="search-col">
                <i aria-hidden="true" className="search icon search-icon" />
                <Dropdown onChange={this.handleChange} options={searchOptions} className="search-input"  fluid multiple search selection placeholder="Search ..." ></Dropdown>
              </div>
            </div>  
          </div>
          <div className="main">
            <Route path="/" exact component={Index} />
            <Route path="/about" component={About} />
            <Route path="/blackboard" component={Blackboard} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/personalSpace" component={PersonalSpace} />
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