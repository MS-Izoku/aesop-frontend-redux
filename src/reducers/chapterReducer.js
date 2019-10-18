import * as types from "../actions/actionTypes.js";
import update from "immutability-helper";
import { stat } from "fs";

export default function chapterReducer(
  state = {
    currentChapter: {
      id: 0,
      title: "Chapter Not Found",
      body: "(Body) Chapter Not Found"
    },
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
      })

      return {
        allChapters: sortedChapters,
        currentChapter: sortedChapters[0]
      };
    case types.POST_CHAPTER:
      return Object.assign(
        {},
        { ...state, allChapters: [...state.allChapters, action.chapter] }
      );
    // return [...state, action.chapter];
    case types.PATCH_CHAPTER:
      return Object.assign(
        {},
        {
          ...state,
          allChapters: state.allChapters.map(chapter => {
            return chapter.id === action.chapter.id ? action.chapter : chapter;
          }),
          currentChapter: action.chapter
        }
      );
    // return state.map(chapter => {
    //   if (chapter.id === action.chapter.id) {
    //     return action.chapter;
    //   } else return chapter;
    // });
    case "DELETE_CHAPTER":
      return Object.assign(
        {},
        {
          ...state,
          currentChapter: { id: 0, title: "Chapter Not Found", body: "(Body) Chapter Not Found" },
          allChapters: state.allChapters.filter(chapter => {
            return chapter.id !== action.chapter.id;
          })
        }
      );
    // console.log("You hit the reducer");
    // return state.filter(chapter => {
    //   return chapter.id !== action.chapter.id;
    // });
    default:
      return state;
  }
}
