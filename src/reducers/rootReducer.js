import { combineReducers } from "redux";
import chapterReducer from "./chapterReducer.js";
import storyReducer from "./storyReducer.js";
import userReducer from "./userReducer.js";
import characterReducer from './characterReducer.js'
import footnoteReducer from './footnoteReducer.js'

const rootReducer = combineReducers({
  user: userReducer,
  stories: storyReducer,
  chapters: chapterReducer,
  characters: characterReducer,
  footnotes: footnoteReducer
});

export default rootReducer;
