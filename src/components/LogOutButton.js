import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { logOut } from "../actions/userActions";

const LogOutButton = props => {
  return (
    <Button className="btn-sm"
      onClick={() => {
        props.logOut();
        props.history.push("/login");
      }}
    >
      Log Out
    </Button>
  );
};

const mapDispatchToProps = dispatch => {
  return { logOut: () => dispatch(logOut()) };
};

export default withRouter(connect(null , mapDispatchToProps)(LogOutButton));
