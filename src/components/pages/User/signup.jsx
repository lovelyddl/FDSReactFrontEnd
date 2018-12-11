import React from 'react'
import '../../../assets/css/register.scss'
import { Form, Button, Select } from "semantic-ui-react";

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];

const emailRegex = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const phoneRegex = RegExp(
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
);


const formValid = ({ errors, data, checked }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(errors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(data).forEach(val => {
        val === "" && (valid = false);
    });

    return valid && checked; //the form needs to be valid and the checkbox clicked
};

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
            errors: {
                userName: "",
                phone: "",
                email: "",
                password: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
        alert(`
          Successfully Submitting:
          User Name: ${this.state.data.userName}
          Phone: ${this.state.data.phone}
          Email: ${this.state.data.email}
          Password: ${this.state.data.password}
          `);
        } else {
            alert('Please enter all required information');
        }
    };

    onRegistration = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = { ...this.state.errors };

        switch (name) {
            case "userName":
                errors.userName =
                    value.length < 3 ? "minimum 3 characters required" : "";
                break;
            case "phone":
                errors.phone = phoneRegex.test(value)
                    ? ""
                    : "please enter a valid phone number";
                break;
            case "email":
                errors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                errors.password =
                    value.length < 8 ? "minimum 8 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({
                errors,
                data: { ...this.state.data, [name]: value }},
            () => console.log(this.state)
        );
    };

  render() {

    const { errors } = this.state;

    return (
    <div className="register-form clearfix">
     <Form size="big" onSubmit={this.handleSubmit}>
      <Form.Field required>
          <label htmlFor="userName">User Name</label>
          <input
            // className={ errors.userName.length > 0 ? "errorBorder" : null }
            className="errorBorder" //wtf??? why doesn't it work?????
            type="text"
            id="userName"
            name="userName"
            onChange={this.onRegistration}
            placeholder="please enter your userName"
          />
          {errors.userName.length > 0 && (
              <span className="errorMessage">{errors.userName}</span>
          )}
        </Form.Field>
        <Form.Field required>
          <label htmlFor="phone">Phone</label>
          <input
            className={ errors.phone.length > 0 ? "errorBorder" : null }
            type="tel"
            id="phone"
            name="phone"
            placeholder="xxx-xxx-xxxx"
            onChange={this.onRegistration}
          />
            {errors.phone.length > 0 && (
                <span className="errorMessage">{errors.phone}</span>
            )}
        </Form.Field>
        <Form.Field required>
          <label htmlFor="email">Email</label>
          <input
            className={errors.email.length > 0 ? "errorBorder" : null}
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            onChange={this.onRegistration}
          />
            {errors.email.length > 0 && (
                <span className="errorMessage">{errors.email}</span>
            )}
        </Form.Field>
        <Form.Field required>
          <label htmlFor="password">Password</label>
          <input
            className={errors.password.length > 0 ? "errorBorder" : null}
            type="password"
            id="password"
            name="password"
            placeholder="Make it secure"
            onChange={this.onRegistration}
          />
            {errors.password.length > 0 && (
                <span className="errorMessage">{errors.password}</span>
            )}
        </Form.Field>
        <Form.Field>
          <label htmlFor="gender">Gender</label>
          <Select placeholder='Select your gender' options={genderOptions} ></Select>
        </Form.Field>
        <Form.Checkbox onChecked={this.state.checked = true} //wtf is happening here?????
                       label='Join FDS. By joining I accept all terms and conditions.' required />
        <div className="submit-button">
          <Button primary type="submit">Join Us</Button>
        </div>
      </Form>
    </div>
    );
  }
}

export default SignUp