import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postUser } from '../actions/userActions'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      username_error: null,
      password_error: null,
      email_error: null,
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    console.log("submitting")
    let validPassword = false;
    let { password, password_confirmation } = this.state;
    //#region password character check
    const specialChars = /\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\-|\_|\=/y;
    if (this.state.password.length > 8 && this.state.password.length < 20) {
      if (this.state.password.match(/\d/y) !== null) {
        if (this.state.password.match(specialChars) !== null) {
          if (
            this.state.password.match(/[A-Z]/y) !== null &&
            this.state.password.match(/[a-z]/y) !== null
          ) {
            validPassword = true;
            this.setState({ password_error: null });
          } else
            this.setState({
              password_error:
                "Your password needs at least 1 lowercase and 1 uppercase letter"
            });
        } else
          this.setState({
            password_error:
              "You password needs to include at least one special character (ex: ! @ # $ % ^ & * ( ) + - )"
          });
      } else
        this.setState({
          password_error:
            "Your password needs at least one number / numerical character"
        });
    }
    if(password == "" || password == null) this.setState({password_error: "Password cannot be blank"})
    console.log(this.state.password_error , validPassword)
    console.log(this.state.password.match(/[A-Z]/))
    if(!validPassword) console.log("invalid password" , password)
    //#endregion
    if (validPassword && password == password_confirmation) {
      const configuredUserObj = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,

      }

      console.log("valid submission")
      this.props.postUser(configuredUserObj)
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  errorSpan = error => {
    return <span className="form-error-text">{error}</span>;
  };

  render() {
    return (
      <div className="container-fluid">
        <h2 className="text-center">Sign Up</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Username..."
              onChange={this.handleChange}
            />
            {this.state.username_error !== null
              ? this.errorSpan(this.state.username_error)
              : null}

            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Email..."
              onChange={this.handlChange}
            />
            {this.state.username_error !== null
              ? this.errorSpan(this.state.email_error)
              : null}
          </Form.Group>

          <Form.Group controlId="password-field">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />

            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              name="password_confirmation"
              type="password"
              placeholder="Password Confirmation..."
              onChange={this.handleChange}
            />
            <div>
              {this.state.password_error !== null ? this.errorSpan(this.state.password_error) : null}
              Passwords require at least: 1 uppercase and lowercase letter, 1
              numerical digit, and 1 special character
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postUser: userObj => dispatch(postUser(userObj))
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
);
