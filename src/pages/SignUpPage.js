import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SignUpPage extends Component {
  render() {
    return <div className="container-fluid">Sign Up</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return;
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUpPage)
);
