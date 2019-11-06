import * as types from "../actions/actionTypes.js";

export default function userReducer(
  state = {
    currentUser: {},
    currentStory: { chapters: [{ title: "Chapter Not Found" }] },
    currentChapter: { title: "Chapter Not Found", body: "Chapter Not Found" },
    currentCharacter: {
      appearance: "",
      biography: "",
      height: 100,
      img_url:
        "https://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2019/05/toy_story_4_duke_caboom_keanu_reeves.jpg?itok=adUMUrqP",
      name: "Alpha",
      personality: "",
      story_id: 0,
      weight: 150
    }
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
          currentUser: {
            ...state.currentUser,
            current_story_id: action.storyObj.id
          },
          currentStory: {
            ...action.storyObj
          }
        }
      );
    case "SET_CURRENT_CHAPTER": // set here for persistence
      return Object.assign({}, { ...state, currentChapter: action.chapterObj });
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
          currentStory: action.storyObj[state.currentUser.current_story_id]
        }
      );
    case "SET_CURRENT_CHAPTER_ON_LOGIN":
      const story = action.storyObj.filter(
        story => story.id === state.currentUser.current_story_id
      )[0];

      const targetChapter = story.chapters.filter(
        chapter => chapter.id === state.currentUser.current_chapter_id
      );

      if (targetChapter[0] === undefined)
        console.log("NEED TO CHANGE THE STORY");
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
    default:
      return state;
  }
}
