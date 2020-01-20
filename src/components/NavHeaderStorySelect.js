import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getStories } from "../actions/storyActions";
import Button from "react-bootstrap/Button";

class NavHeaderStorySelect extends Component {
  getStoriesForSelect = () => {
    return this.props.stories.map(story => {
      return (
        <NavDropdown.Item key={story.id === undefined ? 0 : story.id} href={`/stories/${story.id}`}>
          {story.title}
        </NavDropdown.Item>
      );
    });
  };

  componentDidMount() {
    this.props.getStories();
  }

  render() {
    return (
      <div>
        <NavDropdown title="Story Select" id="basic-nav-dropdown">
          {this.getStoriesForSelect()}
        </NavDropdown>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStories: () => dispatch(getStories())
  };
};

const mapStateToProps = state => {
  return { stories: state.stories };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavHeaderStorySelect);
//export default NavHeaderStorySelect;
