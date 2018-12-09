import React from 'react'
import '../../../assets/css/register.scss'
import { Form, Button, Select } from "semantic-ui-react";

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

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
            errors: {}
        };
    }

  render() {

    return (
    <div className="register-form clearfix">
     <Form size="big">
      <Form.Field required>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={this.state.data.userName}
            onChange={this.onRegistration}
            placeholder="please input your userName"
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="please input your phone number"
            value={this.state.data.phone}
            onChange={this.onRegistration}
          />
        </Form.Field>
        <Form.Field required>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={this.state.data.email}
            onChange={this.onRegistration}
          />
        </Form.Field>
        <Form.Field required>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it secure"
            value={this.state.data.password}
            onChange={this.onRegistration}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="gender">Gender</label>
          <Select placeholder='Select your gender' options={genderOptions} ></Select>
        </Form.Field>
        <Form.Checkbox label='Join FDS. By joining I accept all terms and conditions.' required />
        <div className="submit-button">
          <Button primary>Join Us</Button>
        </div>
      </Form>
    </div>
    );
  }
}

export default SignUp