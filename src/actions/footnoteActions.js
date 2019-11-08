import {
  updateFootnoteInCurrentChapter,
  addFootnoteToCurrenChapter
} from "./userActions";

export const getFootnotesFromChapter = chapterObj => {
  return dispatch => {
    return dispatch({ type: "GET_FOOTNOTES", footnotes: chapterObj });
  };
};

export const fetchFootnotes = footnotes => ({
  type: "GET_FOOTNOTES",
  footnotes
});

export const getFootnotes = (chapterID, storyID) => {
  return dispatch => {
    fetch(
      `http://localhost:3000/users/1/stories/${storyID}/chapters/${chapterID}/footnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        }
      }
    )
      .then(resp => resp.json())
      .then(notes => {
        return dispatch(fetchFootnotes(notes));
      })
      .catch(err => console.error("ERROR GETTING FOOTNOTES", err));
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
        dispatch(addFootnoteToCurrenChapter(json));
        return dispatch(postFootNoteFetch(json));
      })
      .catch(err => {
        console.error("ERROR CREATING NEW FOOTNOTE:", err);
      });
  };
};

export const patchFootnoteFetch = footnote => ({
  type: "PATCH_FOOTNOTE",
  footnote
});
export const patchFootnote = (footnoteObj, storyID) => {
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
  
        dispatch(patchFootnoteFetch(json));
        return dispatch(updateFootnoteInCurrentChapter(json));
      })
      .catch(err => {
        console.error("ERROR UPDATING FOOTNOTE:", err);
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
      })
      .catch(err => {
        console.error("ERROR DELETING FOOTNOTE:", err);
      });
  };
};

export const setCurrentFootnote = footnote => {
  return { type: "SET_CURRENT_FOOTNOTE", footnote };
};

export const getCurrentFootnote = () => {
  return { type: "GET_CURRENT_FOOTNOTE" };
};

export const setAllNotes = chapterObj => {
  const notes = chapterObj.footnotes;
  return { type: "SET_ALL_FOOTNOTES", notes };
};
