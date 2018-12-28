import React from 'react'
import '../../../assets/css/signup.scss'
import { Form, Button, Radio } from "semantic-ui-react";
import { signup, getUserDetail, editUser } from "../../../api/user"
import { withRouter } from "react-router";

const emailRegex = RegExp(
  /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
);

const phoneRegex = RegExp(
  /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s]?[\0-9]{3}[\s]?[0-9]{4}$/
);

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        userName: "",
        phone: "",
        email: "",
        password: "",
        checked: false,
        role: ''
      },
      isProfile: props.location.pathname === '/profile' ? true : false,
      userId: '',
      passType: 'password',
      errors: {}
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.location.pathname === '/profile') {
      this.queryUserDetail(this.props.userName, this.props.role)
    }
  }

  queryUserDetail = async (userName, role) => {
    try {
      let res = await getUserDetail(userName, role);
      if (res.data.code === 0) {
        let userInfo = res.data.userInfo;
        this.setState({
          data: {
            userName: userInfo.userName,
            phone: userInfo.phone,
            email: userInfo.email,
            password: userInfo.password,
            checked: true,
            role: role
          },
          userId: userInfo.userId
        }, () => {
          // console.log(this.state.data)
        })
      } else {
        console.log(res.data.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  formValid = () => {
    const { errors, data } = this.state;
    return Object.keys(errors).length === 0 && Object.values(data).every(val => { return val !== ""; }) && data.checked;
  }

  handleSubmit = e => {
    const { data } = this.state;
    e.preventDefault();
    if (this.formValid()) {
      let res = this.state.isProfile ? editUser(this.state.userId, data.userName, data.phone, data.email, data.password, data.role) : signup(data.userName, data.phone, data.email, data.password, data.role);
      res.then((response) => {
        let getValue = response.data
        if (getValue.code === 0) {
          console.log(`
            Successfully Submission:
            User Name: ${data.userName}
            Phone: ${data.phone}
            Email: ${data.email}
            Password: ${data.password}
            Role: ${data.role}
          `);
          if (this.state.isProfile) {
            alert("Edit sucessfully")
          } else {
            alert("Welcome to join us")
          }
          this.props.history.push('/');
        } else if (getValue.code === 1) {
          alert(getValue.error);
        }
      }).catch(function (error) {
        alert("Database failed to connect");
      })
    } else {
      console.log('Please enter correct required information');
    }
  }

  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let errorMessage = "";
    if (name === "userName" && value.length < 3) {
      errorMessage = "minimum 3 characters required";
    } else if (name === "phone" && !phoneRegex.test(value)) {
      errorMessage = "please enter a valid phone number";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "please enter a valid email address";
    } else if (name === "password" && value.length < 8) {
      errorMessage = "minimum 8 characters required";
    }
    if (errorMessage === "") {
      let newErrors = this.state.errors;
      delete newErrors[name];
      this.setState({ errors: newErrors });
    } else {
      this.setState({ errors: { ...this.state.errors, [name]: errorMessage} });
    }
    this.setState({ data: { ...this.state.data, [name]: value }});
  };

  onChangeCheckbox = (val, text) => {
    this.setState({ data: { ...this.state.data, checked: text.checked }});
  }

  handleSelectChange = (e, text) => {
    this.setState({
      data: { ...this.state.data, [text.name]: text.value }
    })
  }

  showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      passType: this.state.passType === 'text' ? 'password' : 'text'
    })  
  }

  render() {
    const { errors, data } = this.state;
    const hide = {display: "none"};
    const show = {display: "block"};
    let sumbitButtom = this.state.isProfile ? <Button primary type="submit">Edit</Button> : <Button primary type="submit">Join Us</Button>

    return (
    <div className="register-form clearfix">
      <Form size="big" onSubmit={this.handleSubmit}>
        <Form.Field required>
          <label htmlFor="userName">User Name</label>
          <input
            className={ errors.userName ? "errorBorder" : null }
            value={data.userName}
            onChange={this.onChange}
            type="text"
            name="userName"
            placeholder="please enter your userName"/>
          <span className={ errors.userName ? "errorMessage" : "hide" }>{errors.userName}</span>
        </Form.Field>
        <Form.Field required>
          <label htmlFor="phone">Phone</label>
          <input
            className={ errors.phone ? "errorBorder" : null }
            value={data.phone}
            onChange={this.onChange}
            type="tel"
            name="phone"
            placeholder="xxx-xxx-xxxx"/>
          <span className={ errors.phone ? "errorMessage" : "hide" }>{errors.phone}</span>
        </Form.Field>
        <Form.Field required>
          <label htmlFor="email">Email</label>
          <input
            className={errors.email ? "errorBorder" : null}
            value={data.email}
            onChange={this.onChange}
            type="email"
            name="email"
            placeholder="example@example.com"/>
          <span className={ errors.email ? "errorMessage" : "hide" }>{errors.email}</span>
        </Form.Field>
        <Form.Field required>
          <label htmlFor="password">Password</label>
          <input
            className={errors.password ? "errorBorder" : null}
            value={data.password}
            onChange={this.onChange}
            type={this.state.passType}
            name="password"
            placeholder="Make it secure"/>
          <span className="show-pass" onClick={this.showHide}>{this.state.passType === 'text' ? 'Hide' : 'Show'} </span>
            {/* <span className="password__strength" data-score={this.state.score} />  */}
          <span className={ errors.password ? "errorMessage" : "hide" }>{errors.password}</span>
        </Form.Field>
        <Form.Field required style={this.state.isProfile ? hide : show}>
          <label>User Role</label>
          <div className="ui left input">
          <Radio label='Customer' name='role' value='customer'
            checked={this.state.data.role === 'customer'}
            onChange={this.handleSelectChange}/>
          <Radio label='DeliveryMan' name='role' value='deliveryMan' 
            checked={this.state.data.role === 'deliveryMan'}
            onChange={this.handleSelectChange}/>
          </div>
        </Form.Field>
        <Form.Checkbox required style={this.state.isProfile ? hide : show}  className="join-check" onChange={this.onChangeCheckbox}  label='Join FDS. By joining I accept all terms and conditions.'/>
        <div className="submit-button">{sumbitButtom}</div>
      </Form>
    </div>
    );
  }

}

export default withRouter(SignUp)