import React, { Component } from "react";
import { connect } from "react-redux";

import StoryShowCard from "../components/StoryShowCard";

class HomeCardContainer extends Component {
  createStoryCards = () => {
    return this.props.stories.allStories.map(story => {
      return <StoryShowCard story={story} key={story.id + 1252}/>;
    });
  };

  render() {
    return <div className="container-fluid">
        {this.createStoryCards()}
    </div>;
  }
}

const mapStateToProps = state => {
  return { stories: state.stories };
};

export default connect(mapStateToProps)(HomeCardContainer);
