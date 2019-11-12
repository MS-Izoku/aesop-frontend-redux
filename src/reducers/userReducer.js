import * as types from "../actions/actionTypes.js";

export default function userReducer(
  state = { currentUser: {username: 'Log In'}},
  action
) {
  switch (action.type) {
    case types.LOGIN_USER:
      return state;
    case types.LOGOUT_USER:
      return state;
    case 'POST_USER':
      debugger
      return {...state , currentUser: action.user}
    default:
      return state;
  }
}
