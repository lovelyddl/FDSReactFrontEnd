// 此处合并所有的reducers
import { combineReducers } from "redux";
import userInfo from "./userInfo";

export default combineReducers({ userInfo });