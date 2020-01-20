import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LogOutButton from "./LogOutButton";

const NavHeaderProfile = props => {
  return (
    <div className="bg-info text-center">
      <span>
        {props.user.username !== undefined ? (
          <span>
            {props.user.username}
            <LogOutButton />
          </span>
        ) : (
          <>
            <span
              onClick={() => {
                props.history.push("/login");
              }}
            >
              Log In
            </span>
            {" | "}
            <span
              onClick={() => {
                props.history.push("/signup");
              }}
            >
              Sign Up
            </span>
          </>
        )}
      </span>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.user.currentUser };
};

export default withRouter(connect(mapStateToProps)(NavHeaderProfile));
