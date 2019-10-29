import React from "react";
import { connect } from "react-redux";
import LogOutButton from "./LogOutButton";

const NavHeaderProfile = props => {
  return (
    <div className="bg-info text-center">
      <span>
        {props.user.username !== undefined ? (
          <span>
            {props.user.username}<LogOutButton />
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

export default connect(mapStateToProps)(NavHeaderProfile);
