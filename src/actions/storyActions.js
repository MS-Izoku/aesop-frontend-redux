//import * as types from "../actions/actionTypes.js";

const baseURL = (user_id = 1) => {
  return `http://localhost:3000/users/${user_id}/stories/`;
};

export const GET_STORIES = "GET_STORIES";

export const fetchStories = stories => ({ type: GET_STORIES, stories });
export const getStories = () => {
  return dispatch => {
    fetch(`http://localhost:3000/users/1/stories/`)
      .then(resp => resp.json())
      .then(stories => {
        return dispatch(fetchStories(stories));
      })
      .catch(err => console.error("error fetching things", err));
  };
};

export const postStoryFetch = story => ({ type: "POST_STORY", story });
export const postStory = () => {
  console.log('Starting story post fetch')
  return dispatch => {
    fetch(`http://localhost:3000/users/1/stories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: "New Story",
        pitch: "Pitch!",
        high_concept: "A Story Concept",
        //chapters: [{ title: "undefined title", body: "undefined body" }]
      })
    })
      .then(resp => resp.json())
      .then(json => {
        console.log(json, "Fetching POST");
        return dispatch(postStoryFetch(json));
      });
  };
};

export const patchStoryFetch = story => ({ type: "PATCH_STORY", story });

export const patchStory = story => {
  return dispatch => {
    console.log(story)
    fetch(`http://localhost:3000/users/1/stories/${story.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: story.title,
        pitch: story.pitch,
        high_concept: story.high_concept
      })
    })
      .then(resp => resp.json())
      .then(json => {
        return dispatch(patchStoryFetch(json));
      });
  };
};

export const deleteStoryFetch = story => ({ type: "DELETE_STORY", story });

export const deleteStory = storyID => {
  return dispatch => {
    fetch("http://localhost:3000/users/1/stories" + `/${storyID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ id: storyID })
    })
      .then(resp => resp.json())
      .then(json => {
        return dispatch(deleteStoryFetch(json));
      });
  };
};
