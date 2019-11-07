import * as types from "../actions/actionTypes.js";

export default function chapterReducer(
  state = {
    allChapters: [
      { id: 0, title: "Chapter Not Found", body: "(Body) Chapter Not Found" }
    ]
  },
  action
) {
  switch (action.type) {
    case types.GET_CHAPTERS:
      const sortedChapters = action.chapters.sort((a, b) => {
        return a.chapter_index - b.chapter_index;
      });

      return {
        allChapters: sortedChapters
      };
    case types.POST_CHAPTER:
      return Object.assign(
        {},
        { ...state, allChapters: [...state.allChapters, action.chapter] }
      );

    case types.PATCH_CHAPTER:
      return Object.assign(
        {},
        {
          ...state,
          allChapters: state.allChapters.map(chapter => {
            if (chapter.id === action.chapter.id) return action.chapter;
            else return chapter;
          })
        }
      );

    case "DELETE_CHAPTER":
      return {
        ...state,
        allChapters: state.allChapters.filter(chapter => {
          return chapter.id !== action.chapter.id;
        })
      };

    default:
      return state;
  }
}
