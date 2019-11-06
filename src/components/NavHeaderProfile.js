import React from "react";
import { connect } from "react-redux";
import LogOutButton from "./LogOutButton";
import { withRouter } from "react-router-dom";
const NavHeaderProfile = props => {
  return (
    <div className="bg-info text-center">
      <span>
        {props.user.username !== undefined ? (
          <span>
            <span
              onClick={() => {
                props.history.push("/profile");
              }}
            >
              {props.user.username}
            </span>
            <LogOutButton />
          </span>
        ) : (
          "Log In"
        )}
      </span>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.user.currentUser };
};

export default withRouter(connect(mapStateToProps)(NavHeaderProfile));
