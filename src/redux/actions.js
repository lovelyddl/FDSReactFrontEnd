// define all actions we want to manipulate
import { ADD_USER, EDIT_CART } from "./actionTypes";

// add user log in information into the store
export const addUser = (content) => ({
  type: ADD_USER,
  payload: {
    userName: content.userName,
    password: content.password,
    role: content.role
  }
});

export const editCart = (content) => ({
  type: EDIT_CART,
  payload: content
});