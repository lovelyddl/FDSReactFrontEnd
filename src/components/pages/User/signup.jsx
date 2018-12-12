import React from 'react'
import '../../../assets/css/register.scss'
import { Form, Button } from "semantic-ui-react";

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

const formValid = (state) => {
  const { errors, data } = state;
  return Object.keys(errors).length === 0 && Object.values(data).every(val => { return val !== ""; });
}

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        userName: "",
        phone: "",
        email: "",
        password: ""
      },
      checked: false,
      errors: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
    console.log(`
      Successfully Submitting:
      User Name: ${this.state.data.userName}
      Phone: ${this.state.data.phone}
      Email: ${this.state.data.email}
      Password: ${this.state.data.password}
      `);
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
      errorMessage = "invalid email address";
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
        <Form.Checkbox required label='Join FDS. By joining I accept all terms and conditions.' />
        <div className="submit-button">
          <Button primary type="submit">Join Us</Button>
        </div>
      </Form>
    </div>
    );
  }

}

export default SignUp