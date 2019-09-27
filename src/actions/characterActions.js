import * as types from "./actionTypes.js";
// this will need to be modularized based on the current user/story information
//const baseChapterURL = (id) => {return "http://localhost:3000/users/1/stories/${id}/chapters";}
//baseChapterURL(1)
// this action will do something later, need to be able to set the currently selected chapter for editing and updating
export const setCurrentChapter = chapterObj => {
  return { type: types.SET_CURRENT_CHAPTER, chapterObj };
};

export const fetchCharacters = characters => ({
  type: "GET_CHARACTERS",
  characters
});
export const getCharacters = (storyID) => {
  return dispatch => {
    fetch(`http://localhost:3000/users/1/stories/${storyID}/characters/`)
      .then(resp => resp.json())
      .then(chars => {
        return dispatch(fetchCharacters(chars));
      })
      .catch(err => console.error("error fetching things", err));
  };
};

export const postFetchCharacter = character => ({
  type: "POST_CHARACTER",
  character
});
export const postCharacter = (characterObj, storyID) => {
  return dispatch => {
    return fetch("http://localhost:3000/users/1/stories/1/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: characterObj.name,
        height: characterObj.height,
        weight: characterObj.weight,
        biography: characterObj.biography,
        backstory: characterObj.backstory,
        personality: characterObj.personality,
        story_id: storyID // get this from params
      })
    })
      .then(resp => resp.json())
      .then(json => {
        return dispatch(postFetchCharacter(json));
      });
  };
};

export const updateFetchCharacter = character => ({
  type: "PATCH_CHARACTER",
  character
});
export const patchCharacter = characterObj => {
  return dispatch => {
    return fetch(`http://localhost:3000/users/1/stories/1/characters/${characterObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: {
        name: characterObj.name,
        height: characterObj.height,
        weight: characterObj.weight,
        biography: characterObj.biography,
        backstory: characterObj.backstory,
        personality: characterObj.personality
      }
    })
      .then(resp => resp.json())
      .then(json => {
        return dispatch(updateFetchCharacter(json));
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
      `http://localhost:3000/users/1/stories/1/characters/${character.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          id: character.id
        })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        return dispatch(deleteCharacterFetch(json));
      });
  };
};
