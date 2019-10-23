import React from "react";
import { connect } from "react-redux";
import NavHeader from "../containers/NavHeader";
import LogOutButton from "./LogOutButton";


const NavHeaderProfile = props => {

  return (
    <div className="bg-info text-center">
      <span>
        <p className="p-0">{props.user.username !== undefined ? props.user.username : "Log In"}</p>
        <LogOutButton/>
      </span>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.user.currentUser };
};

export default connect(mapStateToProps )(NavHeaderProfile);
