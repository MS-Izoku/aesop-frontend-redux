import React, { Component } from "react";
import { connect } from "react-redux";
import NavHeader from "../containers/NavHeader.js";
import LoginForm from '../components/LoginForm'

class LoginPage extends Component {
  handleChange = event => {
    console.log(event.target.value);
  };

  render() {
    return (
      <div>
        <NavHeader />
        <LoginForm/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(LoginPage);
