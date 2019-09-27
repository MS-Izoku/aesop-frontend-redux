import * as types from "../actions/actionTypes.js";

export default function(
  state = [{ title: "Chapter Not Found", chapters: [{ id: 0, title: "N/A" }] }],
  action
) {
  switch (action.type) {
    case types.GET_STORIES:
      return action.stories;
    case types.POST_STORY:
      return [...state.stories, action.story];
    case types.PATCH_STORY:
      // get the index of the changed item in the action
      return state.stories.map((story, index) => {
        if (index !== action.index) return story;
        else {
          // should i make a newstate here?
          state.stories[index] = action.story;
          return state;
        }
      });

    case types.DELETE_STORY:
      return state.filter(story =>{
        return story.id !== action.id
      })
    default:
      return state;
  }
}
