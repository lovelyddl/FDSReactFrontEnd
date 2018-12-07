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

class Layout extends React.Component {
  state = {
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

  handleChange = (val, text) => {
    this.setState({
      searchQuery: text.value
    }, () => {
      // 此时调用的是及时更新后的state
      console.log(this.state.searchQuery)
    }) 
  }

  render() {
    const { searchOptions } = this.state
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
                <div className="item">
                  <Link to="/login" className="ui button">Log in</Link>
                </div>
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

export default Layout;