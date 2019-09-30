import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { getCharacters } from "../actions/characterActions";
import { getStories } from "../actions/storyActions";
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

// boilerplate from the github page, required for user
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

class CharacterIndex extends Component {
  componentDidMount() {
    this.props.getStories();
    this.props.stories.map(story => {
      this.props.getCharacters(story.id);
    });
  }

  createCharacterCard = characterObj => {
    return (
      <Card key={characterObj.id}>
        <Image rounded fluid alt="character-pic" src={characterObj.img_url} />
        <Card.Title>{characterObj.name}</Card.Title>
        <Card.Text>
          {characterObj.biography !== null
            ? characterObj.biography.substring(0, 50)
            : "No Bio Found"}
        </Card.Text>
        <Button>
          <Nav.Link href="cm">Go To</Nav.Link>
        </Button>
      </Card>
    );
  };

  createAllCharacterCards = () => {
    return this.props.characters.map(char => {
      console.log(char);
      return this.createCharacterCard(char);
    });
  };

  render() {
    return (
      <div className="container-fluid">
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
          customTransition="all .005"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {this.createAllCharacterCards()}
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { stories: state.stories, characters: state.characters };
};

const mapDispatchToProps = dispatch => {
  return {
    getStories: () => dispatch(getStories()),
    getCharacters: storyID => dispatch(getCharacters(storyID)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterIndex);
