import { setCurrentStoryDispatch } from './userActions'

export const GET_STORIES = "GET_STORIES";

// get stories
export const fetchStories = stories => ({ type: GET_STORIES, stories });
export const getStories = () => {
  return dispatch => {
    fetch(`http://localhost:3000/users/1/stories/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(resp => resp.json())
      .then(stories => {
        return dispatch(fetchStories(stories));
      })
      .catch(err => console.error("error fetching things", err));
  };
};

// Story Creation
export const postStoryFetch = story => ({ type: "POST_STORY", story });
export const postStory = (user_id) => {
  return dispatch => {
    fetch(`http://localhost:3000/users/${user_id}/stories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        title: "New Story",
        pitch: "Pitch!",
        high_concept: "A Story Concept"
      })
    })
      .then(resp => resp.json())
      .then(json => {
        return dispatch(postStoryFetch(json));
      });
  };
};


// Story Updating
export const patchStoryFetch = story => ({ type: "PATCH_STORY", story });
export const patchStory = story => {
  return dispatch => {
    console.log(story);
    fetch(`http://localhost:3000/users/${story.user_id}/stories/${story.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
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

// Story Deletion
export const deleteStoryFetch = story => ({ type: "DELETE_STORY", story });
export const deleteStory = story => {
  return dispatch => {
    fetch(`http://localhost:3000/users/${story.user_id}/stories/${story.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({ id: story.id })
    })
      .then(resp => resp.json())
      .then(json => {
        
        return dispatch(deleteStoryFetch(json));
      });
  };
};

export const setCurrentStory = storyObj =>{
  return dispatch =>{
    console.log("Dispatching Action to User Controller")
    return dispatch(setCurrentStoryDispatch(storyObj))
  }
}