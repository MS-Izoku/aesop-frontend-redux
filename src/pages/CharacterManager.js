import React, { Component } from "react";
import {
  setCurrentCharacterDispatch,
  updateCurrentCharacterDispatch
} from "../actions/userActions";
import { patchCharacter } from "../actions/characterActions";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import RichTextArea from "../components/RichTextArea";
import Form from "react-bootstrap/Form";
import NumericInput from "react-numeric-input";
import DomPurify from "dompurify";

class CharacterManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: {
        appearance: props.character.appearance,
        biography: props.character.biography,
        height: props.character.height,
        img_url: props.character.img_url,
        name: props.character.name,
        personality: props.character.personality,
        weight: props.character.weight
      },
      editors: {
        nameEditor: false,
        appearanceEditor: false,
        biographyEditor: false,
        imgEditor: false,
        personalityEditor: false
      }
    };
  }

  componentDidUpdate(prevState , prevProps){
    if(prevProps.character.id === 0 || prevProps.character.id === undefined)
      if(this.props.character.id !== 0 && this.props.character.id !== undefined)
        this.setState({character: this.props.character})
  }

  //#region Event Handlers
  activateEditor = editor => {
    this.setState({
      editors: { ...this.state.editors, [editor]: !this.state.editors[editor] }
    });
  };

  // save the character form in its current state
  onFieldChange = event => {
    this.setState({
      character: {
        ...this.state.character,
        [event.target.name]: event.target.value
      }
    });
  };

  // sanitizes the rich text from CKEditor
  // Prevents XSS
  sanitizeText = richText => {
    return { __html: DomPurify.sanitize(richText) };
  };

  handleHeightChange = val => {
    this.setState({ character: { ...this.state.character, height: val } });
  };

  handleWeightChange = val => {
    this.setState({ character: { ...this.state.character, weight: val } });
  };

  onRichTextEditorChange = (key, data) => {
    this.setState({ character: { ...this.state.character, [key]: data } });
  };

  handleSubmit = event => {
    event.preventDefault();
    const configuredCharacterObj = {
      ...this.state.character,
      id: this.props.character.id,
      story_id: this.props.character.story_id
    };
    this.props.patchCharacter(configuredCharacterObj);
  };
  //#endregion

  //#region NumericInput Formatting
  weightFormat = num => num + " kg/lbs";
  heightFormat = num => num + " cm/in";
  //#endregion

  //#region JSX components
  activateEditorButton = editorName => {
    return (
      <span
        className="h6 text-right text-primary"
        onClick={() => {
          this.activateEditor(editorName);
        }}
      >
        Edit
      </span>
    );
  };
  //#endregion

  render() {
    return (
      <div className="container-fluid">
        <div className="row pb-4">
          <div className="col" />
          <div className="col text-center">
            {this.state.editors.nameEditor ? (
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Control
                    className="text-center input-lg"
                    type="text"
                    name="name"
                    value={this.state.character.name}
                    onChange={this.onFieldChange}
                  />
                  <Button type="submit">Submit</Button>
                </Form.Group>
                {this.activateEditorButton("nameEditor")}
              </Form>
            ) : (
              <span className="bg-info">
                <h2>{this.state.character.name}</h2>
                {this.activateEditorButton("nameEditor")}
              </span>
            )}
          </div>
          <div className="col" />
        </div>
        <div className="row pb-4">
          <div className="col" /> {/* Characer Biography */}
          <div className="col-lg-9">
            <span>
              <h3>Biography {this.activateEditorButton("biographyEditor")}</h3>
            </span>
            <hr />
            {this.state.editors.biographyEditor ? (
              <Form onSubmit={this.handleSubmit}>
                <RichTextArea
                  stateKey="biography"
                  changeHandler={this.onRichTextEditorChange}
                  body={
                    this.state.character.biography
                      ? this.state.character.biography
                      : "No Text Found"
                  }
                />
                <Button type="submit">Submit</Button>
              </Form>
            ) : (
              <div
                dangerouslySetInnerHTML={this.sanitizeText(
                  this.state.character.biography
                )}
              />
            )}
          </div>
          <div className="col" />
        </div>

        <div className="row pb-4">
          <div className="col" /> {/* Characer Personality */}
          <div className="col-lg-9">
            <span>
              <h3>
                Personality {this.activateEditorButton("personalityEditor")}
              </h3>
            </span>
            <hr />
            {this.state.editors.personalityEditor ? (
              <Form onSubmit={this.handleSubmit}>
                <RichTextArea
                  stateKey={"personality"}
                  body={
                    this.state.character.personality
                      ? this.state.character.personality
                      : "No Text Foud"
                  }
                  changeHandler={this.onRichTextEditorChange}
                />
                <Button type="submit">Submit</Button>
              </Form>
            ) : (
              <div
                dangerouslySetInnerHTML={this.sanitizeText(
                  this.state.character.personality
                )}
              />
            )}
          </div>
          <div className="col" />
        </div>

        <div className="row">
          <div className="col" />
          <div className="col-lg-9">
            {/* Character Appearance */}
            <span>
              <h3>
                Appearance {this.activateEditorButton("appearanceEditor")}
              </h3>
            </span>
            <hr />
            {this.state.editors.appearanceEditor ? (
              <Form onSubmit={this.handleSubmit}>
                <RichTextArea
                  stateKey={"appearance"}
                  body={
                    this.state.character.appearance
                      ? this.state.character.appearance
                      : "No Text Found"
                  }
                  changeHandler={this.onRichTextEditorChange}
                />
                <Form.Group>
                  <Form.Label>Weight</Form.Label>
                  <NumericInput
                    format={this.weightFormat}
                    value={this.state.character.weight}
                    strict={true}
                    name="weight"
                    onChange={this.handleWeightChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Height</Form.Label>
                  <NumericInput
                    format={this.heightFormat}
                    value={this.state.character.height}
                    strict={true}
                    name="height"
                    onChange={this.handleHeightChange}
                  />
                  <Button type="submit">Save</Button>
                </Form.Group>
              </Form>
            ) : (
              <>
                <div
                  dangerouslySetInnerHTML={this.sanitizeText(
                    this.state.character.appearance
                  )}
                />
                <p>Height: {this.state.character.height}</p>
                <p>Weight: {this.state.character.weight}</p>
              </>
            )}
          </div>
          <div className="col" />
        </div>

        <div className="row">
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    story: state.user.currentStory,
    character: state.user.currentCharacter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentCharacterDispatch: characterObj =>
      dispatch(setCurrentCharacterDispatch(characterObj)),
    updateCurrentCharacterDispatch: characterObj =>
      dispatch(updateCurrentCharacterDispatch(characterObj)),
    patchCharacter: characterObj => dispatch(patchCharacter(characterObj, true))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterManager);
