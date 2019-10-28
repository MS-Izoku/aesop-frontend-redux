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
      `http://localhost:3000/users/1/stories/${storyID}/chapters/${chapterID}/footnotes` , {
        method: "GET",
        headers:{
          "Content-Type": 'application/json',
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        }
      })
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
      `http://localhost:3000/users/1/stories/${storyID}/chapters/${chapterID}/footnotes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
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

export const patchFootnoteFetch = footnote => ({
  type: "PATCH_FOOTNOTE",
  footnote
});
export const patchFootnote = (footnoteObj , storyID) => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${storyID}/chapters/${footnoteObj.chapter_id}/footnotes/${footnoteObj.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          title: footnoteObj.title,
          body: footnoteObj.body
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(patchFootnoteFetch(json));
      });
  };
};

export const deleteFootnoteFetch = footnote => ({
  type: "DELETE_FOOTNOTE",
  footnote
});
export const deleteFootnote = (footnote, storyID) => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${storyID}/chapters/${footnote.chapter_id}/footnotes/${footnote.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          id: footnote.id
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(deleteFootnoteFetch(json));
      });
  };
};

export const setCurrentFootnote = footnote => {
  return { type: "SET_CURRENT_FOOTNOTE", footnote };
};

export const getCurrentFootnote = () =>{
  return {type: "GET_CURRENT_FOOTNOTE" }
}

export const setAllNotes = (chapterObj) =>{
  const notes = chapterObj.footnotes
  return {type: "SET_ALL_FOOTNOTES" , notes}
}
