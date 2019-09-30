import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { connect } from "react-redux";
import { getStories, postStory } from "../actions/storyActions";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { withRouter } from "react-router";

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
      //console.log(story.chapters, story);
      return (
        <Card key={story.id}>
          <Card.Title>{story.title}</Card.Title>
          <Card.Text>{story.high_concept}</Card.Text>
          <Card.Text>Chapters: {story.chapters.length}</Card.Text>
          <Card.Text>Last Update: {this.parseDate(story.updated_at)}</Card.Text>

          <Button
            onClick={() => {
              this.props.history.push(`/stories/${story.id}`);
            }}
          >
            Story Editor
          </Button>
          <Button
            onClick={() => {
              this.props.history.push(
                `/chaptereditor/${story.id}/${story.chapters[0].id}`
              );
            }}
          >
            Chapter Editor
          </Button>
        </Card>
      );
    });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          //autoPlay={this.props.deviceType !== "mobile" ? true : false}
          //autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .05"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {this.renderStoryCards()}
        </Carousel>
        <Button onClick={this.props.postStory}>New Story</Button>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StoryCarousel)
);
