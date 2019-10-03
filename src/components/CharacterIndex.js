import React, { Component } from "react";
//import Carousel from "react-multi-carousel";
import Carousel from "react-bootstrap/Carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { getCharacters } from "../actions/characterActions";
import { getStories } from "../actions/storyActions";
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";

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
    this.props.getCharacters(this.props.match.params.story_id);
    // this.props.stories.map(story => {
    //   this.props.getCharacters(story.id);
    // });
  }

  createCharacterCard = characterObj => {
    return (
      // <Card key={characterObj.id}>
      //   <Image rounded fluid alt="character-pic" src={characterObj.img_url} />
      //   <Card.Title>{characterObj.name}</Card.Title>
      //   <Card.Text>
      //     {characterObj.biography !== null
      //       ? characterObj.biography.substring(0, 50)
      //       : "No Bio Found"}
      //   </Card.Text>
      //   <Button>
      //     <Nav.Link href={`/cm/${characterObj.story_id}/${characterObj.id}`}>
      //       Go To
      //     </Nav.Link>
      //   </Button>
      // </Card>

      <Carousel.Item>
        <div className="text-center">
          <Image src={characterObj.img_url} rounded className="" />
          <h2>{characterObj.name}</h2>
          <div className="container-fluid">
            <p> {characterObj.biography !== null
             ? characterObj.biography.substring(0, 50)
             : "No Bio Found"}</p>
            <Button href={`/cm/${characterObj.story_id}/${characterObj.id}`}>Charcter Page</Button>
          </div>
        </div>
      </Carousel.Item>
    );
  };

  createAllCharacterCards = () => {
    if (this.props.characters.length > 0) {
      return this.props.characters
        .sort((a, b) => {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          else return 0;
        })
        .map(char => {
          return this.createCharacterCard(char);
        });
    } else
      return (
        <Carousel.Item>
          <h2 className="text-center">No Characters Found</h2>
          <p className="text-center">Make Them Here</p>
          <div className="text-center">
            <Button>Create Character</Button>
          </div>
        </Carousel.Item>
      );
  };

  render() {
    return (
   
        <Carousel
          className="grey-dark"
          indicators={false}
          controls={this.props.characters.length > 1 ? true : false}
        >
          {this.createAllCharacterCards()}
        </Carousel>
   
    );
  }
}

const mapStateToProps = state => {
  return { stories: state.stories, characters: state.characters };
};

const mapDispatchToProps = dispatch => {
  return {
    getStories: () => dispatch(getStories()),
    getCharacters: storyID => dispatch(getCharacters(storyID))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CharacterIndex)
);
