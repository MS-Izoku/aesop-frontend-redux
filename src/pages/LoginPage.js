import React, { Component } from "react";
import { connect } from "react-redux";
import NavHeader from "../containers/NavHeader.js";
import LoginForm from '../components/LoginForm'
import PageFooter from "../components/PageFooter.js";

class LoginPage extends Component {
  handleChange = event => {
    
  };

  render() {
    return (
      <div>
        <NavHeader />
        <LoginForm/>
        <PageFooter/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(LoginPage);
