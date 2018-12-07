import { ADD_USER } from "../actionTypes";

// store the user information here
const initialState = {
  userId: "",
  password: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      return action.payload ;
    }
    default:
      return state;
  }
}