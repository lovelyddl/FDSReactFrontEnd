import React from 'react';
import '../../../assets/css/login.scss'
import { Link } from "react-router-dom";
import { Dropdown, Radio } from "semantic-ui-react";
import { addUser } from "../../../redux/actions"
import { connect } from "react-redux";
import { userLogin } from "../../../api/user";

const loginMethods = [
  { key: 'userName', icon: 'user', text: 'User Name', value: 'userName' },
  { key: 'phone', icon: 'phone', text: 'Phone Number', value: 'phone' },
  { key: 'email', icon: 'mail', text: 'Email', value: 'email' }
]

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        userId: "",
        password: "",
        logType: '',
        role: ''
      },
      loading: false,
      errors: {}
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  // input change will be updated in state
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      data: { ...this.state.data, [name]: value }
    }, () => {
      // console.log(this.state.data)
    })
  }

  // login method and user role will be updated in state
  handleSelectChange = (e, text) => {
    this.setState({
      data: { ...this.state.data, [text.name]: text.value }
    }, () => {
      // console.log(this.state.data)
    })
  }

  // post the log in request to the server
  handleLog = () => {
    if (this.state.data.logType === '') {
      alert('Please select the login method')
    } else if (this.state.data.role === '') {
      alert('Please select the login user role')
    } else {
      let res = userLogin(this.state.data.userId, this.state.data.password, this.state.data.logType, this.state.data.role);
      res.then((response) => {
        let data = response.data
        if (data.code === 0) {
          alert("Log in Successfully!!")
          this.props.addUser(data.userInfo);
          this.props.history.push('/');
        } else if (data.code === 1) {
          alert(data.error);
          this.setState({ data: {
            userId: "",
            password: "",
            logType: "",
            role: ""
          }});
        }
      }).catch(function (error) {
        alert("Database failed to connect");
      })
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div className="login-container">
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui image header">
              <div className="content">
                Log In Your Account
              </div>
            </h2>
            <form method="get" className="ui large form">
              <div className="ui stacked secondary  segment">
                <div className="field">
                  <div className="ui left input">
                    <Dropdown value={data.logType} onChange={this.handleSelectChange} 
                      options={loginMethods} className="icon" name="logType" button placeholder="Login Method">
                    </Dropdown>
                    <input value={data.userId} type="text" name="userId" placeholder={"Please input " + data.logType} onChange={this.handleInputChange}/> 
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input value={data.password} type="password" name="password" placeholder="Please input password" onChange={this.handleInputChange}/> 
                  </div>
                </div>
                <div className="field">
                  <div className="ui left">
                  <Radio label='Customer' name='role' value='customer'
                    checked={this.state.data.role === 'customer'}
                    onChange={this.handleSelectChange}/>
                  <Radio label='DeliveryMan' name='role' value='deliveryMan' 
                    checked={this.state.data.role === 'deliveryMan'}
                    onChange={this.handleSelectChange}/>
                  <Radio label='Manager' name='role' value='manager' 
                    checked={this.state.data.role === 'manager'}
                    onChange={this.handleSelectChange}/>
                  <Radio label='Admin' name='role' value='admin' 
                    checked={this.state.data.role === 'admin'}
                    onChange={this.handleSelectChange}/>
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