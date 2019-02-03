import { EDIT_CART } from "../actionTypes";

const initialState = {
    cart: []
  };

const editCartInfo = (state = initialState, action) => {
    switch (action.type) {
      case EDIT_CART: {
        return {
          ...state,
          cart: action.payload
        }
      }
      default:
        return state;
    }
  }

export default editCartInfo;