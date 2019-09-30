import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { connect } from "react-redux";
import { getStories, postStory } from "../actions/storyActions";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class StoryCarousel extends Component {
  parseDate = dateStr => {
    const newDate = new Date(dateStr);
    return newDate.toLocaleDateString();
  };
  renderStoryCards = () => {
    return this.props.stories.map(story => {
      console.log(story);
      const firstChapter = story.chapters.sort((a, b) => {
        return a.chapter_index - b.chapter_index;
      })[0];
      console.log(story.id)
      return (
        <Card key={story.id}>
          <Card.Title>{story.title}</Card.Title>
          <Card.Text>{story.high_concept}</Card.Text>
          <Card.Text>Chapters: {story.chapters.length}</Card.Text>
          <Card.Text>Last Update: {this.parseDate(story.updated_at)}</Card.Text>
          <Button>
            <Nav.Link href={`/chaptereditor/${story.id}/${firstChapter.id}`}>
              Chapter Editor
            </Nav.Link>
          </Button>
        </Card>
      );
    });
  };
  render() {
    return (
      <div>
        <Carousel responsive={responsive}>{this.renderStoryCards()}</Carousel>
        <Button>
          <Nav onClick={this.props.postStory}>New Story</Nav>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { stories: state.stories };
};

const mapDispatchToProps = dispatch => {
  return {
    getStories: () => dispatch(getStories()),
    postStory: () => dispatch(postStory())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryCarousel);
