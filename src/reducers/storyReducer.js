import * as types from "../actions/actionTypes.js";

export default function(
  state = {
    allStories: [
      { title: "Story Not Found", chapters: [{ id: 0, title: "N/A" }] }
    ]
  },
  action
) {
  switch (action.type) {
    case types.GET_STORIES:
      return Object.assign({}, { ...state, allStories: action.stories });
    case types.POST_STORY:
      return Object.assign(
        {},
        { ...state, allStories: [...state.allStories, action.story] }
      );
    case types.PATCH_STORY:
      return Object.assign(
        {},
        {
          ...state,
          allStories: state.allStories.map(story => {
            if (story.id === action.story.id) return action.story;
            else return story;
          })
        }
      );
    case types.DELETE_STORY:
      return Object.assign(
        {},
        {
          ...state,
          allStories: state.allStories.filter(story => {
            return story.id !== action.id;
          })
        }
      );
    // return state.filter(story => {
    //   return story.id !== action.id;
    // });

    default:
      return state;
  }
}
