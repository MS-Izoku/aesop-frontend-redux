import React, { Component } from "react";
//import Carousel from "react-multi-carousel";
import Carousel from "react-bootstrap/Carousel";
import "react-multi-carousel/lib/styles.css";
import { connect } from "react-redux";
import { getStories, postStory } from "../actions/storyActions";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { withRouter } from "react-router";

//import ReactAliceCarousel from "react-alice-carousel";
//import InfiniteCarousel from "react-leaf-carousel";

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
    let index = 0
    return this.props.stories.map(story => {
      ++index;
      return (
        <Carousel.Item>
          <div className="container">
            <h2 className="text-center eggshell-text">{story.title}</h2>
            <div className="text-center m-0 eggshell-text">
              {story.pitch}
            </div>
            <hr className="eggshell"/>
            <div className="text-center">
              <Button
              bsPrefix="btn custom-btn red-3"
                onClick={() => {
                  this.props.history.push(`/stories/${story.id}`);
                }}
              >
                <span className="eggshell-text">Story Editor</span>
              </Button>
              <Button
                bsPrefix="btn custom-btn red-3"
                onClick={() => {
                  this.props.history.push(
                    `/chaptereditor/${story.id}/${story.chapters[0].id}`
                  );
                }}
              >
                <span className="eggshell-text">Chapter Editor</span>
              </Button>
            </div>
          </div>
        </Carousel.Item>
      );
    });
  };
  
  render() {
    return (
        <Carousel className="main-dark container-fluid" indicators={false} controls={true}>
          {this.renderStoryCards()}
          <Carousel.Item className="text-center">
            <hr/>
            <Button 
            bsPrefix="custom-btn w-75 red-3"
            onClick={()=>{this.props.postStory()}}>New Story</Button>
          </Carousel.Item>
        </Carousel>
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
