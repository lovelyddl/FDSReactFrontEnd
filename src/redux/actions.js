// define all actions we want to manipulate
import { ADD_USER } from "./actionTypes";

// add user log in information into the store
export const addUser = (content) => ({
  type: ADD_USER,
  payload: {
    userId: content.userId,
    password: content.password
  }
});