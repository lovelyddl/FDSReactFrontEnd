import Axios from 'axios'
Axios.defaults.withCredentials = true; // make ajax takes cookie

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://119.29.96.250:8080'

export const queryRestList = () => {
  let url = baseURL + "/users/queryRestList";
  return Axios.get(url);
}