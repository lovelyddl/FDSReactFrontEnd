import Axios from 'axios'
Axios.defaults.withCredentials = true; // make ajax takes cookie

// const host = "http://119.29.96.250:8080"
const host = "http://localhost:8080"

export const queryRestList = () => {
  let url = host + "/users/queryRestList";
  return Axios.get(url);
}