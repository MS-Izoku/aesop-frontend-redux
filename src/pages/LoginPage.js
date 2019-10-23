import React, { Component } from "react";
import {Switch , Route , withRouter} from 'react-router-dom'
import NavHeader from '../containers/NavHeader'

import LoginForm from '../components/LoginForm'

class LoginPage extends Component {
  
  componentDidMount(){
    if(localStorage.token){
      console.log("TOKEN FOUND, REDIRECTING TO HOME PAGE")
      this.props.history.push("/home")
    }
  }

  componentDidUpdate(){
    if(localStorage.token){
      this.props.history.push("/home")
    }
  }

  render() {
    return (
      <div>
          <NavHeader />
          <Switch>
          <LoginForm/>
          </Switch>
      </div>
    );
  }
}

export default withRouter(LoginPage)
