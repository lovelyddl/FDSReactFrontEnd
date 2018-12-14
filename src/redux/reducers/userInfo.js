import { ADD_USER } from "../actionTypes";

// store the user information here
const initialState = {
  userInfo: {
    userId: "",
    password: "",
    role: ""
  }
};

const getUserInfo = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        userInfo: action.payload
      }
    }
    default:
      return state;
  }
}

export default getUserInfo;