import * as types from "./actionTypes.js";

import { updateCurrentCharacterDispatch } from "./userActions";

export const setCurrentChapter = chapterObj => {
  return { type: types.SET_CURRENT_CHAPTER, chapterObj };
};

export const fetchCharacters = characters => ({
  type: "GET_CHARACTERS",
  characters
});
export const getCharacters = storyID => {
  return dispatch => {

    fetch(`http://localhost:3000/users/1/stories/${storyID}/characters/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(resp => resp.json())
      .then(chars => {
        return dispatch(fetchCharacters(chars));
      })
      .catch(err => console.error("ERROR GETTING CHARACTERS:", err));
  };
};

export const getSingleCharacterFetch = character => ({
  type: "GET_SINGLE_CHARACTER",
  character
});
export const getCharacter = (storyID, characterID) => {
  return dispatch => {
    fetch(

      `http://localhost:3000/users/1/stories/${storyID}/characters/${characterID}`,
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
      .then(json => dispatch(getSingleCharacterFetch(json)))
      .catch(err => {
        console.error("ERROR GETTING THIS CHARACTER:", err);
      });
  };
};

export const postFetchCharacter = character => ({
  type: "POST_CHARACTER",
  character
});
export const postCharacter = (characterObj, storyID) => {
  return dispatch => {

    return fetch(
      `http://localhost:3000/users/1/stories/${storyID}/characters`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          name: characterObj.name,
          height: characterObj.height,
          weight: characterObj.weight,
          biography: characterObj.biography,
          personality: characterObj.personality,
          appearance: characterObj.appearance,
          story_id: storyID
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(postFetchCharacter(json));
      });
  };
};

export const patchFetchCharacter = character => ({
  type: "PATCH_CHARACTER",
  character
});
export const patchCharacter = (characterObj, setCurrent = false) => {
  return dispatch => {
    return fetch(
      `https://aesop-backend.herokuapp.com//users/1/stories/${characterObj.story_id}/characters/${characterObj.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          name: characterObj.name,
          height: characterObj.height,
          weight: characterObj.weight,
          biography: characterObj.biography,
          backstory: characterObj.backstory,
          personality: characterObj.personality,
          appearance: characterObj.appearance
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        if (setCurrent) dispatch(updateCurrentCharacterDispatch(json));
        return dispatch(patchFetchCharacter(json));
      })
      .catch(err => {
        console.error("ERROR UPDATING CHARACTER:", err);
      });
  };
};

export const deleteCharacterFetch = character => ({
  type: "DELETE_CHARCTER",
  character
});
export const deleteCharacter = character => {
  return dispatch => {
    return fetch(
      `https://aesop-backend.herokuapp.com//users/1/stories/1/characters/${character.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          id: character.id
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(deleteCharacterFetch(json));
      })
      .catch(err => {
        console.error("ERROR DELETING CHARACTER:", err);
      });
  };
};
