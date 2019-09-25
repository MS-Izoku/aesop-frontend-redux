import * as types from "../actions/actionTypes.js";

const baseURL = (user_id = 1) => {
  return `http://localhost:3000/users/${user_id}/stories/`;
};

export const GET_STORIES = 'GET_STORIES'

export const fetchStories = stories => ({type: GET_STORIES, stories})


export const getStories = () => {
  return (dispatch) => {
     fetch(`http://localhost:3000/users/1/stories/`)
      .then(resp => resp.json())
      .then(stories => {
        return dispatch(fetchStories(stories));
  })
  .catch(err => console.error('error fetching things', err));
}};

// export const getStories = () => {
//   return (dispatch) => {
//      fetch(`http://localhost:3000/users/1/stories/`)
//       .then(resp => resp.json())
//       .then(stories => {
//         return dispatch(fetchStories(stories));
//   })
//   .catch(err => console.error('error fetching things', err));
// }};




export const patchStory = storyID => {
  return fetch(baseURL + `/${storyID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({})
  })
    .then(resp => resp.json())
    .then(json => {
      console.log(json);
    });
};

export const deleteStory = storyID => {
  return fetch(baseURL + `/${storyID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ id: storyID })
  })
    .then(resp => resp.json())
    .then(json => {
      console.log(json);
    });
};
