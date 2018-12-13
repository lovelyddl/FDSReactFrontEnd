import Axios from 'axios'
Axios.defaults.withCredentials = true; // make ajax takes cookie

// const host = "http://119.29.96.250:8080"
const host = "http://localhost:8080"

export const userLogin = (userId, password, type) => {
  let url = host + "/users/login";
  return Axios.post(url, {
    userId,
    password,
    type
  })
}

export const checkLog = () => {
  let url = host + "/users/checkLog";
  return Axios.get(url)
}

export const logout = () => {
  let url = host + "/users/logout";
  return Axios.post(url)
}

export const signup = (userName, phone, email, password) => {
  let url = host + "/users/signup";
  return Axios.post(url, {
    userName,
    phone,
    email,
    password
  })
}