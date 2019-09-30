import * as types from "../actions/actionTypes.js";

export default function(
  state = [{ title: "Story Not Found", chapters: [{ id: 0, title: "N/A" }] }],
  action
) {
  switch (action.type) {
    case types.GET_STORIES:
      return action.stories;
    case types.POST_STORY:
      console.log('POSTING NEW STORY , REDUCER <<<<' , action.story)
      return [...state, action.story];
    case types.PATCH_STORY:
      // get the index of the changed item in the action
      return state.map(story =>{
        if(story.id === action.story.id){
          return action.story
        }
        else return story
      })
    case types.DELETE_STORY:
      return state.filter(story =>{
        return story.id !== action.id
      })
    default:
      return state;
  }
}
