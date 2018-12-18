import Axios from 'axios'
Axios.defaults.withCredentials = true; // make ajax takes cookie

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://119.29.96.250:8080'

export const queryRestList = (listType, searchKey) => {
  let url = baseURL + "/rest/queryRestList";
  console.log(listType + " " + searchKey);
  return Axios.get(url, {
    params: {
      listType,
      searchKey
    }
  });
}