import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from 'react-redux'
import StoryShowCard from "../components/StoryShowCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class StoryCarousel extends Component {
  createStoryCards = () => {
      if(this.props.stories.allStories.length !== undefined)
        return this.props.stories.allStories.map(story =>{
            return <StoryShowCard story={story}/>
        })
    else return <div>You have no stories</div>
  };
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="my-5 mx-5 card">
        <Slider {...settings}>
            {this.createStoryCards()}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return {
        stories: state.stories
    }
}
export default connect(mapStateToProps)(StoryCarousel);
