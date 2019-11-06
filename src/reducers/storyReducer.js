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
            if (story.id === action.story.id)
              return Object.assign(
                {},
                { ...action.story, chapters: story.chapters }
              );
            else return story;
          })
        }
      );
    case "DELETE_STORY":
      return Object.assign(
        {},
        {
          ...state,
          allStories: state.allStories.filter(story => {
            return story.id !== action.story.id;
          })
        }
      );
    case "REMOVE_CHAPTER":
      return Object.assign(
        {},
        {
          ...state,
          allStories: state.allStories.map(story => {
            if (story.id !== action.chapterObj.story_id) return story;
            else {
              return Object.assign(
                {},
                {
                  ...story,
                  chapters: story.chapters.filter(chapter => {
                    return chapter.id !== action.chapterObj.id;
                  })
                }
              );
            }
          })
        }
      );
    case "SET_CHARACTER_IN_STORY":
      return Object.assign(
        {},
        {
          ...state,
          allStories: state.allStories.map(story => {
            if (story.id === action.characterObj.story_id) {
              return story.characters.map(character => {
                if (character.id === action.characterObj.id)
                  return action.characterObj;
                else return character;
              });
            } else return story;
          })
        }
      );
    case "ADD_CHAPTER":
      return Object.assign(
        {},
        {
          ...state,
          allStories: state.allStories.map(story => {
            if (story.id === action.chapterObj.story_id) {
              return Object.assign(
                {},
                { ...story, chapters: [...story.chapters, action.chapterObj] }
              );
            } else return story;
          })
        }
      );
    default:
      return state;
  }
}
