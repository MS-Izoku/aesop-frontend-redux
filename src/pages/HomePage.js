import React, { Component } from "react";
import { connect } from "react-redux";

import HomeCardContainer from "../containers/HomeCardContainer";

import CreateStoryButton from "../components/CreateStoryButton";

class HomePage extends Component {
  render() {
    return (
      <div>
        <CreateStoryButton />
        <HomeCardContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user, stories: state.stories };
};

export default connect(mapStateToProps)(HomePage);
