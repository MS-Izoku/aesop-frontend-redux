import * as types from "../actions/actionTypes.js";
export default function chapterReducer(
  state = [
    { id: 0, title: "Cream Frieche!", body: "This is my body, it is default" }
  ],
  action
) {
  switch (action.type) {
    case types.GET_CHAPTERS:
      return action.chapters;
    case types.POST_CHAPTER:
      // I want to post a chapter to the currently selected story
      console.log(state.chapters);
      return [...state, action.chapter];
    case types.PATCH_CHAPTER:
      console.log(action.chapter)
      return state.map(chapter => {
        if (chapter.id === action.chapter.id) {
          let newState = state;
          return newState;
        } else return chapter;
      });
    //return state
    default:
      return state;
  }
}


