import * as types from "../actions/actionTypes.js";
export default function chapterReducer(
  state = [{ id: 0, title: "Cream Frieche!" , body: 'This is my body, it is default' }],
  action
) {
  switch (action.type) {
    case types.GET_CHAPTERS:
      // I want to get all of the chapters in the current story
      //console.log(state);
      return action.chapters;
    case types.POST_CHAPTER:
      // I want to post a chapter to the currently selected story
      console.log(state.chapters)
      return [...state, action.chapter];
    default:
      return state;
  }
}
