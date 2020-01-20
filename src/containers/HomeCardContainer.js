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
        {this.props.stories.allStories.length > 0 ? this.createStoryCards(): null}
    </div>;
  }
}

const mapStateToProps = state => {
  return { stories: state.stories };
};

export default connect(mapStateToProps)(HomeCardContainer);
