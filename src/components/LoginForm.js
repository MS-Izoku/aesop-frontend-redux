import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { postUser } from "../actions/userActions";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      passwordConfirmation: "",
      email: ""
    };
  }
  handlechange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // signUpUser = input => {
  //   if (this.state.password === this.state.passwordConfirmation) {
  //     fetch(`http://localhost:3000/users/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json"
  //       },
  //       body: JSON.stringify({
  //         username: input.username,
  //         password: input.password,
  //         email: input.email
  //       })
  //     });
  //   }
  // };

  signUpUser = event => {
    event.preventDefault();
    const userObj = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    this.props.postUser(userObj);
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.signUpUser}>
          <Form.Group controlId="loginForm">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={this.handleChange}
              placeholder="Username"
            />
            <Form.Label>Email address</Form.Label>

            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="passwordConfirmation"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {  };
};
export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
