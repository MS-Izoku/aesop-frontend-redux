import React, { Component } from "react";

import NavHeader from '../containers/NavHeader'
import SignUpForm from '../components/SignUpForm'

class SignUp extends Component {
  render() {
    return (
      <div>
        <NavHeader/>
        <SignUpForm />
      </div>
    );
  }
}

export default SignUp;
