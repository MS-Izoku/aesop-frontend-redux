import * as types from "../actions/actionTypes.js";

export default function userReducer(
  state = {
    currentUser: {},
    currentStory: { chapters: [{ title: "Chapter Not Found" }] },
    currentChapter: { title: "Chapter Not Found" }
  },
  action
) {
  switch (action.type) {
    case types.LOGIN_USER:
      return { ...state, currentUser: action.userObj.user };
    case "LOG_OUT":
      return Object.assign(
        {},
        { currentUser: {}, currentStory: {}, currentChapter: {} }
      );
    case "POST_USER":
      return Object.assign({}, { ...state, currentUser: action.user });
    case "SET_CURRENT_STORY": // set here for persistence
      return Object.assign(
        {},
        {
          ...state,
          currentStory: {
            ...action.storyObj
          }
        }
      );
    case "SET_CURRENT_CHAPTER": // set here for persistence
      return Object.assign({}, { ...state, currentChapter: action.chapterObj });
    default:
      return state;
  }
}
