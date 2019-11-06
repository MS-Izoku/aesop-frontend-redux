import React, { Component } from "react";
import "./App.css";

import NavHeader from "./containers/NavHeader.js";
import PageFooter from "./components/PageFooter";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getUserProfile } from "./actions/userActions";
import {getStories} from './actions/storyActions'

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import StoryManager from "./pages/StoryManager";
import ChapterEditorPage from "./pages/ChapterEditorPage";
import CharacterManager from "./pages/CharacterManager";
import UserProfilePage from "./pages/UserProfilePage";

class App extends Component {
  async componentDidMount() {
    await this.props.getUserProfile();
    this.props.getStories(this.props.user.id);
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
        <Route
          exact
          path="/profile"
          store={this.props.store}
          component={UserProfilePage}
        />

        {/* <PageFooter /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: () => dispatch(getUserProfile()),
    getStories: userID => dispatch(getStories(userID))
  };
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
