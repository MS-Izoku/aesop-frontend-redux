import React, { Component } from "react";
import { connect } from "react-redux";

import StoryShowCard from '../components/StoryShowCard'

import ProfileHeader from "../components/ProfileHeader";
class UserProfilePage extends Component {

    allStoryCards = () =>{
    }

    
  render() {
    return (
      <div className="container-fluid">
        <div className="row" id="page-top">
          <div className="col text-center">
            <ProfileHeader />
          </div>
        </div>
        <div className="row">
            <div className="col-lg-2" id="user-information">
                <p>{this.props.user.username}</p>
                <p>{this.props.user.email}</p>
            </div>
            <div className="col-lg-8" id="user-bio">
                {this.props.user.bio}
            </div>
            <div className="col-lg-2">
                Something here
            </div>
        </div>
        <div className="row" id="story-showcase">
            <div className="col-lg-2"/>
            <div className="col-lg-8">
                <div className="row">
                    Recent Stories
                </div>
                <div className="row">
                    All Stories
                    {this.allStoryCards()}
                </div>
            </div>
            <div className="col-lg-2" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    stories: state.stories
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePage);
