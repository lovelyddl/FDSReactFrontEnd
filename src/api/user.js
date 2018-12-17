import Axios from 'axios'
Axios.defaults.withCredentials = true; // make ajax takes cookie

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://119.29.96.250:8080'


export const userLogin = (userId, password, type, role) => {
  let url = baseURL + "/users/login";
  return Axios.post(url, {
    userId,
    password,
    type,
    role
  })
}

export const checkLog = () => {
  let url = baseURL + "/users/checkLog";
  return Axios.get(url)
}

export const logout = () => {
  let url = baseURL + "/users/logout";
  return Axios.post(url)
}

export const signup = (userName, phone, email, password, role) => {
  let url = baseURL + "/users/signup";
  return Axios.post(url, {
    userName,
    phone,
    email,
    password,
    role
  })
}