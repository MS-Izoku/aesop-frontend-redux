import React, { Component } from "react";
//import Carousel from "react-multi-carousel";
import Carousel from "react-bootstrap/Carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { getCharacters, postCharacter } from "../actions/characterActions";
import { getStories } from "../actions/storyActions";
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";

const responsive = {
  superLargeDesktop: {
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
  }

  createCharacterCard = characterObj => {
    return (
      <Carousel.Item key={characterObj.id}>
        <div className="text-center">
          <Image src={characterObj.img_url} rounded className="pb-3" />
          
          <h2 className="eggshell-text">{characterObj.name}</h2>
          <hr className="eggshell"/>
          <div className="container-fluid">
            <p className="eggshell-text">
              {characterObj.biography !== null &&
              characterObj.biography !== undefined
                ? characterObj.biography.substring(0, 50)
                : "No Bio Found"}
            </p>
            <Button
              bsPrefix="btn custom-btn red-3 eggshell-text"
              href={`/cm/${characterObj.story_id}/${characterObj.id}`}
            >
              Character Page
            </Button>
          </div>
        </div>
      </Carousel.Item>
    );
  };

  tempCharacter = {
    name: "Character Name",
    height: 0,
    weight: 0,
    biography: "Biography Goes Here",
    personality: "",
    appearance: "",
    img_url: "",
    story_id: this.props.match.params.story_id
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
        <Carousel.Item key={0}>
          <h2 className="text-center eggshell-text">No Characters Found</h2>
          <p className="text-center eggshell-text">Make Them Here</p>
          <div className="text-center">
            <Button
              bsPrefix="btn custom-btn red-3 eggshell-text"
              onClick={() => {
                this.props.postCharacter(
                  this.tempCharacter,
                  this.props.match.params.story_id
                );
              }}
            >
              Create Character
            </Button>
          </div>
        </Carousel.Item>
      );
  };

  render() {
    return (
      <Carousel
        className="grey-dark mt-0"
        indicators={false}
        controls={this.props.characters.length > 0 ? true : false}
      >
        {this.createAllCharacterCards()}
        <Carousel.Item key={0}>
          <h2 className="text-center eggshell-text">Create a Character</h2>
          <hr className="eggshell" />
          <p className="text-center eggshell-text">...</p>
          <div className="text-center">
            <Button
              bsPrefix="btn custom-btn red-3 eggshell-text"
              onClick={() => {
                this.props.postCharacter(
                  this.tempCharacter,
                  this.props.match.params.story_id
                );
              }}
            >
              Create Character
            </Button>
          </div>
        </Carousel.Item>
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
    getCharacters: storyID => dispatch(getCharacters(storyID)),
    postCharacter: (charObj, storyID) =>
      dispatch(postCharacter(charObj, storyID))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CharacterIndex)
);
