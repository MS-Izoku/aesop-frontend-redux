import * as types from "../actions/actionTypes.js";

export default function userReducer(
  state = { currentUser: {username: 'Log In'}},
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
    case "SET_CURRENT_STORY":
      return Object.assign(
        {},
        {
          ...state,
          currentUser: {
            ...state.currentUser,
            current_story_id: action.storyObj.id
          },
          currentStory: {
            ...action.storyObj
          }
        }
      );
    case "SET_CURRENT_CHAPTER":
      return Object.assign(
        {},
        {
          ...state,
          currentChapter: action.chapterObj,
          currentUser: {
            ...state.currentUser,
            current_chapter_id: action.chapterObj.id
          }
        }
      );
    case "REMOVE_CHAPTER":
      return Object.assign(
        {},
        {
          ...state,
          currentStory: {
            ...state.currentStory,
            chapters: state.currentStory.chapters.filter(chapter => {
              return chapter.id !== action.chapterObj.id;
            })
          }
        }
      );
    case "UPDATE_CHAPTER":
      return Object.assign(
        {},
        {
          ...state,
          currentStory: {
            ...state.currentStory,
            chapters: state.currentStory.chapters.map(chapter => {
              if (chapter.id === action.chapterObj.id) return action.chapterObj;
              else return chapter;
            })
          }
        }
      );
    case "SET_CURRENT_CHARACTER":
      return Object.assign(
        {},
        {
          ...state,
          currentCharacter: action.characterObj
        }
      );
    case "SET_CURRENT_CHARACTER_ON_LOGIN":
      const target = action.characterObj
        .filter(story => story.id === state.currentUser.current_story_id)[0]
        .characters.filter(
          character => character.id === state.currentUser.current_character_id
        )[0];
      if (target === undefined) return state;
      return Object.assign(
        {},
        {
          ...state,
          currentCharacter: action.characterObj
            .filter(story => story.id === state.currentUser.current_story_id)[0]
            .characters.filter(
              character =>
                character.id === state.currentUser.current_character_id
            )[0]
        }
      );
    case "UPDATE_CURRENT_CHARACTER":
      return Object.assign(
        {},
        {
          ...state,
          currentStory: {
            ...state.currentStory,
            characters: state.currentStory.characters.map(character => {
              if (character.id === action.characterObj.id)
                return action.characterObj;
              else return character;
            })
          },
          currentCharacter: action.characterObj
        }
      );
    case "REMOVE_CHARACTER_FROM_CURRENT_STORY":
      return Object.assign(
        {},
        {
          ...state,
          currentStory: {
            ...state.currentStory,
            characters: state.currentStory.characters.filter(character => {
              return character.id !== action.characterObj.id;
            })
          }
        }
      );
    case "ADD_CHAPTER_TO_CURRENT_STORY":
      return Object.assign(
        {},
        {
          ...state,
          currentStory: {
            ...state.currentStory,
            chapters: [...state.currentStory.chapters, action.chapterObj]
          }
        }
      );
    case "SET_CURRENT_STORY_ON_LOGIN":
      return Object.assign(
        {},
        {
          ...state,
          currentStory: action.storyObj.filter(
            story => story.id === state.currentUser.current_story_id
          )[0]
        }
      );
    case "SET_CURRENT_CHAPTER_ON_LOGIN":
      return Object.assign(
        {},
        {
          ...state,
          currentChapter: action.storyObj
            .filter(story => story.id === state.currentUser.current_story_id)[0]
            .chapters.filter(
              chapter => chapter.id === state.currentUser.current_chapter_id
            )[0]
        }
      );
    case "ADD_FOOTNOTE_TO_CURRENT_CHAPTER":
      return Object.assign(
        {},
        {
          ...state,
          currentStory: {
            ...state.currentStory,
            chapters: state.currentStory.chapters.map(chapter => {
              if (chapter.id === action.footnoteObj.current_chapter_id) {
                return {
                  ...chapter,
                  footnotes: [...chapter.footnotes, action.footnoteObj]
                };
              } else return chapter;
            })
          },
          currentChapter: {
            ...state.currentChapter,
            footnotes: [...state.currentChapter.footnotes, action.footnoteObj]
          }
        }
      );
    case "UPDATE_FOOTNOTE_IN_CURRENT_CHAPTER":
      return Object.assign(
        {},
        {
          ...state,
          currentChapter: {
            ...state.currentChapter,
            footnotes: state.currentChapter.footnotes.map(note => {
              if (note.id === action.footnoteObj.id) return action.footnoteObj;
              else return note;
            })
          },
          currentStory: {
            ...state.currentStory,
            chapters: state.currentStory.chapters.map(chapter => {
              if (chapter.id === action.footnoteObj.chapter_id) {
                return {
                  ...chapter,
                  footnotes: chapter.footnotes.map(note => {
                    if (note.id === action.footnoteObj.id)
                      return action.footnoteObj;
                    else return note;
                  })
                };
              } // end
              else return chapter;
            })
          }
        }
      );
    case "REMOVE_FOOTNOTE_FROM_CURRENT_CHAPTER":
      return Object.assign(
        {},
        {
          ...state,
          currentChapter: {
            ...state.currentChapter,
            footnotes: state.footnotes.filter(note => {
              return note.id !== action.footnoteObj.id;
            })
          },
          currentStory: {
            ...state.currentStory,
            chapters: state.currentStory.chapters.map(chapter => {
              if (chapter.id === action.footnoteObj.chapter_id) {
                return {
                  ...chapter,
                  footnotes: chapter.footnotes.filter(note => {
                    return note.id !== action.footnoteObj.id;
                  })
                };
              } else return chapter;
            })
          }
        }
      );
    default:
      return state;
  }
}
