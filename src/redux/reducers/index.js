// 此处合并所有的reducers
import { combineReducers } from "redux";
import userInfo from "./userInfo";
import cart from "./cart";

export default combineReducers({ userInfo, cart });