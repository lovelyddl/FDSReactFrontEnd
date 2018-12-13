import React from 'react'
import '../../../assets/css/signup.scss'
import { Form, Button } from "semantic-ui-react";
import { signup } from "../../../api/user"

// const genderOptions = [
//   { key: 'm', text: 'Male', value: 'male' },
//   { key: 'f', text: 'Female', value: 'female' },
// ];

const emailRegex = RegExp(
  /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
);

const phoneRegex = RegExp(
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
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
        checked: false
      },
      errors: {}
    };
  }

  formValid = () => {
    const { errors, data } = this.state;
    return Object.keys(errors).length === 0 && Object.values(data).every(val => { return val !== ""; }) && data.checked;
  }

  handleSubmit = e => {
    const { data } = this.state;
    e.preventDefault();
    if (this.formValid()) {
      let res = signup(data.userName, data.phone, data.email, data.password);
      res.then((response) => {
        let data = response.data
        if (data.code === 0) {
          console.log(`
            Successfully Submitting:
            User Name: ${data.userName}
            Phone: ${data.phone}
            Email: ${data.email}
            Password: ${data.password}
          `);
          alert("Welcome to join us")
          this.props.history.push('/');
        } else if (data.code === 1) {
          alert(data.error);
        }
      }).catch(function (error) {
        alert("Database failed to connect");
      })
    } else {
      console.log('Please enter correct required information');
    }
  };

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

  render() {
    const { errors, data } = this.state;
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
            type="password"
            name="password"
            placeholder="Make it secure"/>
          <span className={ errors.password ? "errorMessage" : "hide" }>{errors.password}</span>
        </Form.Field>
        <Form.Checkbox onChange={this.onChangeCheckbox} required label='Join FDS. By joining I accept all terms and conditions.' />
        <div className="submit-button">
          <Button primary type="submit">Join Us</Button>
        </div>
      </Form>
    </div>
    );
  }

}

export default SignUp