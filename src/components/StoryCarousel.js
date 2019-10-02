import React, { Component } from "react";
import Carousel from "react-multi-carousel";
//import Carousel from "react-bootstrap/Carousel";
import "react-multi-carousel/lib/styles.css";
import { connect } from "react-redux";
import { getStories, postStory } from "../actions/storyActions";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { withRouter } from "react-router";

import ReactAliceCarousel from "react-alice-carousel";
import InfiniteCarousel from "react-leaf-carousel";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

class StoryCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [{ chapters: [] }]
    };
  }
  parseDate = dateStr => {
    const newDate = new Date(dateStr);
    return newDate.toLocaleDateString();
  };

  componentDidMount() {
    console.log(this.props.stories);
  }

  renderStoryCards = () => {
    return this.props.stories.map(story => {
      return (
        <div>
          <Card key={story.id + 125} className="px-2 pb-1 pt-1">
            <Card.Title className="text-center mt-1 mb-0">
              <h2>{story.title}</h2>
            </Card.Title>
            <hr />
            <Card.Text className="mt-0">
              {story.high_concept !== undefined && story.high_concept !== null
                ? story.high_concept.substring(0, 252) + "..."
                : ""}
            </Card.Text>
            <Card.Text className="text-center">
              Chapters: {story.chapters.length}
            </Card.Text>
            <Card.Text className="text-center">
              Last Update: {this.parseDate(story.updated_at)}
            </Card.Text>

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
        </div>
      );
    });
  };


  // onClick={() => {
  //   this.props.history.push(
  //     `/chaptereditor/${story.id}/${story.chapters[0].id}`
  //   );
  // }}


  testerRender = () => {
    return this.props.stories.map(story => {
      console.log(story);
      return (
        <div className="bg-danger">
          <Card>
          <p>{story.title}</p>
          <p>{story.pitch}</p>
          </Card>
        </div>
      );
    });
  };
  render() {
    // find a decent carousel to display the story information
    //console.log(this.props);
    return (
      <div className="container">
        {this.renderStoryCards()}
        <div className="text-center">
          <Button onClick={this.props.postStory}>New Story</Button>
        </div>

        

        
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
