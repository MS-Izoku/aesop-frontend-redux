import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import NavHeader from "../containers/NavHeader";

import LoginForm from "../components/LoginForm";

class LoginPage extends Component {
  componentDidMount() {
    if (localStorage.token) {
      console.log("TOKEN FOUND, REDIRECTING TO HOME PAGE");
      this.props.history.push("/home");
    }
  }

  componentDidUpdate() {
    if (localStorage.token) {
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <div>
        <NavHeader />
        <Switch>
          <div className="row">
            <div className="col" />
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <LoginForm />
            </div>
            <div className="col" />
          </div>
        </Switch>
      </div>
    );
  }
}

export default withRouter(LoginPage);
