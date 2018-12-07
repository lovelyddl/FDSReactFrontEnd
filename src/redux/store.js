import { createStore } from "redux";
import rootReducer from "./reducers";
// 创建store，将root reducer 添加进来
export default createStore(rootReducer);