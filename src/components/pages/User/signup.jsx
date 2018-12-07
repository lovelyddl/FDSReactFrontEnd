import React from 'react'
import '../../../assets/css/register.scss'
import { Form, Button, Select } from "semantic-ui-react";

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class SignUp extends React.Component {
  render() {
    return (
    <div className="register-form clearfix">
     <Form size="big">
      <Form.Field>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
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
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it secure"
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="gender">Gender</label>
          <Select placeholder='Select your gender' options={genderOptions} ></Select>
        </Form.Field>
        <div  className="submit-button">
          <Button primary>Join Us</Button>
        </div>
      </Form>
    </div>
    );
  }
}

export default SignUp