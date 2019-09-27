// This is a holder for constants that hold action names

// RECEIVE functions are used to handle the returned json from fetches

//#region Story Crud
export const GET_STORIES = "GET_STORIES";
export const POST_STORY = "POST_STORY";
export const PATCH_STORY = "PATCH_STORY";
export const DELETE_STORY = "DELETE_STORY";
export const RECEIVE_STORY = "RECEIVE_STORY"; // this is used when receiving FETCH data in THUNK
//#endregion

//#region Chapter CRUD actions
export const GET_CHAPTERS = "GET_CHAPTERS";
export const POST_CHAPTER = "POST_CHAPTER";
export const PATCH_CHAPTER = "PATCH_CHAPTER";
export const DELETE_CHAPTER = "DELETE_CHAPTER";
export const RECEIVE_CHAPTERS = "RECEIVE_CHAPTERS"; // this is used when receiving FETCH data in THUNK
export const SET_CURRENT_CHAPTER = "SET_CURRENT_CHAPTER";
//#endregion

//#region Charcter CRUD actions
// More actions may be needed depending on how the app
// manages the creation and asscociation of characters
export const GET_CHARACTERS = "GET_CHARACTERS";
export const POST_CHARACTER = "POST_CHARACTER";
export const PATCH_CHARACTER = "PATCH_CHARACTER";
export const DELETE_CHARACTER = "DELETE_CHARACTER";
export const RECEIVE_CHARACTERS = "RECEIVE_CHARACTERS"; // this is used when receiving FETCH data in THUNK
//#endregion

//#region Footnote CRUD
export const GET_FOOTNOTES = "GET_FOOTNOTES";
export const POST_FOOTNOTE = "POST_FOOTNOTE";
export const PATCH_FOOTNOTE = "PATCH_FOOTNOTE";
export const DELETE_FOOTNOTE = "DELETE_FOOTNOTE";
//#endregion

//#region User CRUD
// no GET , that's handled in the Login Actions
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const RECEIVE_USER = "RECEIVE_USER"; // this is used when receiving FETCH data in THUNK
//#endregion

//#region User Login Actions
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
//#endregion

//#region App
export const SET_SELECTED_CHAPTER = "SET_SELECTED_CHAPTER";
//#endregion
