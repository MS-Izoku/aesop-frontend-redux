import * as types from "./actionTypes.js";
// this will need to be modularized based on the current user/story information
//const baseChapterURL = "http://localhost:3000/users/1/stories/1/chapters";

// this action will do something later, need to be able to set the currently selected chapter for editing and updating

export const fetchFootnotes = footnotes => ({
  type: "GET_FOOTNOTES",
  footnotes
});

export const getFootnotes = (chapterID, storyID) => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${storyID}/chapters/${chapterID}/footnotes`
    )
      .then(resp => resp.json())
      .then(notes => {
        return dispatch(fetchFootnotes(notes));
      })
      .catch(err => console.error("error fetching things", err));
  };
};

export const postFootNoteFetch = footnote => ({
  type: "POST_FOOTNOTE",
  footnote
});
export const postFootNote = (chapterID, storyID) => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${chapterID}/chapters/${storyID}/footnotes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          title: "New Note",
          body: "New Note Body",
          chapter_id: chapterID
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(postFootNoteFetch(json));
      });
  };
};

export const patchFootNoteFetch = footnote => ({
  type: "PATCH_FOOTNOTE",
  footnote
});
export const patchFootnote = (chapterID, storyID, footnoteID, footnoteData) => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${storyID}/chapters/${chapterID}/footnotes/${footnoteID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          title: footnoteData.title,
          body: footnoteData.body
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(patchFootNoteFetch(json));
      });
  };
};

export const deleteFootNoteFetch = footnote => ({
  type: "DELETE_FOOTNOTE",
  footnote
});
export const deleteFootNote = (storyID, footnote) => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${storyID}/chapters/${footnote.chapter_id}/footnotes/${footnote.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          id: footnote.id
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(deleteFootNoteFetch(json));
      });
  };
};

export const setCurrentFootnote = footnote => {
  return { type: "SET_CURRENT_FOOTNOTE", footnote };
};

export const getCurrentFootnote = () =>{
  return {type: "GET_CURRENT_FOOTNOTE" }
}
