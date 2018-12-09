import React from 'react';
import '../../../assets/css/login.scss'
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { addUser } from "../../../redux/actions"
import { connect } from "react-redux";

const loginMethods = [
  { key: 'userName', icon: 'user', text: 'User Name', value: 'userName' },
  { key: 'phone', icon: 'phone', text: 'Phone Number', value: 'phone' },
  { key: 'email', icon: 'mail', text: 'Email', value: 'email' },
]

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        userId: "",
        password: ""
      },
      loading: false,
      errors: {}
    };
  }

  // 同步改变输入和state中对应的属性
  // text using this one onChange method
  onChange = e => {
    this.setState({
      // ...this.state.data : save all data exits
      // later : something we really want to change
      // e.target : contians all form information
      data: { ...this.state.data, [e.target.name]: e.target.value } 
    });
  }


  handleLog = () => {
    this.props.addUser(this.state.data);
    this.setState({ data: {
      userId: "",
      password: ""
    }});
    this.props.history.push('/');
  }

  render() {
    const { data } = this.state;
    return (
      <div className="login-container">
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui image header">
              <div className="content">
                Log-in to your account
              </div>
            </h2>
            <form method="get" className="ui large form">
              <div className="ui stacked secondary  segment">
                <div className="field">
                  <div className="ui left input">
                    <Dropdown options={loginMethods} className="icon" button placeholder="Login Method"></Dropdown>
                    <input value={data.userId} type="text" name="userId" onChange={this.onChange}/> 
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input value={data.password} type="password" name="password" placeholder="Please input password" onChange={this.onChange}/> 
                  </div>
                </div>
                <div onClick={this.handleLog} className="ui fluid large teal submit button">Login</div>
              </div>
              <div className="ui error message"></div>
            </form>
            <div className="ui message">New to us ? <Link to="/signup">  Register  </Link>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addUser }
)(LogIn);