import React, { Component } from "react";
import "./App.css";

import NavHeader from "./containers/NavHeader.js";
import PageFooter from "./components/PageFooter";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getUserProfile, setCurrentStoryDispatch } from "./actions/userActions";
import { getStories } from "./actions/storyActions";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import StoryManager from "./pages/StoryManager";
import ChapterEditorPage from "./pages/ChapterEditorPage";
import CharacterManager from "./pages/CharacterManager";
import SignUpPage from "./pages/SignUpPage";

class App extends Component {
  async componentDidMount() {
    if (localStorage.token) {
      await this.props.getUserProfile();
      if (this.props.user.currentUser.id !== 0)
        await this.props.getStories(this.props.user.currentUser.id);
    }
  }

  componentWillUnmount(){
    
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user.currentUser.id === undefined &&
      this.props.user.currentUser.id !== undefined
    )
      this.props.getStories(this.props.user.currentUser.id);
  }

  render() {
    return (
      <div className="App grey-light">
        <NavHeader />

        <Route
          exact
          path="/login"
          component={LoginPage}
          store={this.props.store}
        />
        <Route
          exact
          path="/signup"
          component={SignUpPage}
          store={this.props.store}
        />
        <Route
          exact
          path="/home"
          component={HomePage}
          store={this.props.store}
        />
        <Route
          exact
          path="/storymanager"
          store={this.props.store}
          component={StoryManager}
        />
        <Route
          exact
          path="/chaptereditor"
          store={this.props.store}
          component={ChapterEditorPage}
        />
        <Route
          exact
          path="/charactermanager"
          store={this.props.store}
          component={CharacterManager}
        />

        {/* <PageFooter /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: () => dispatch(getUserProfile()),
    getStories: userID => dispatch(getStories(userID, true)),
    setCurrentStoryDispatch: storyObj =>
      dispatch(setCurrentStoryDispatch(storyObj))
  };
};

const mapStateToProps = state => {
  return { user: state.user, stories: state.stories };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
