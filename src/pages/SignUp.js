import React, { Component } from "react";

import NavHeader from '../containers/NavHeader'
import SignUpForm from '../components/SignUpForm'
import PageFooter from "../components/PageFooter";

class SignUp extends Component {
  render() {
    return (
      <div>
        <NavHeader/>
        <SignUpForm />
        <PageFooter/>
      </div>
    );
  }
}

export default SignUp;
