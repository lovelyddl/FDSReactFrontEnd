import Axios from 'axios'

export const userLogin = (userId, password) => {
  let url ="http://localhost:8080/users/login";
  return Axios.get(url, {
    params: {
      userId,
      password
    }
  })

}