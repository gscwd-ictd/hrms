import axios from "axios"

// Gets the logged in user data from local session
// const getLoggedInUser = () => {
//   const user = localStorage.getItem("user")
//   if (user) return JSON.parse(user)
//   return null
// }

//is user is logged in
// const isUserAuthenticated = () => {
//   return getLoggedInUser() !== null
// }

// Login
export async function postLogin(url, data) {
  return axios
    .post(url, data, { withCredentials: true })
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! Some resources are missing"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid Credentials"
            break
          case 408:
            message = "Request timeout. Try again later"
            break
          default:
            message = err[1]
            break
        }
      } else {
        message = "Network error. Unable to connect to server"
      }
      throw message
    })
}

// Logout
export async function postLogout(url, data) {
  return axios
    .post(url, data, { withCredentials: true })
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! Some resources are missing"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid Request"
            break
          case 408:
            message = "Request timeout. Try again later"
            break
          default:
            message = err[1]
            break
        }
      } else {
        message = "Network error. Unable to connect to server"
      }
      throw message
    })
}

// Verify Access Token
export async function getVerifyAccessToken(url) {
  // const config = {
  //   headers: { Authorization: `Bearer ${accessToken}` }
  // }

  return axios
    .get(url)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! Some resources are missing"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid Token"
            break
          case 408:
            message = "Request timeout. Try again later"
            break
          default:
            message = err[1]
            break
        }
      } else {
        message = "Network error. Unable to connect to server"
      }
      throw message
    })
}

// Register
export async function postRegister(url, data) {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! Some resources are missing"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 408:
            message = "Request timeout. Try again later"
            break
          default:
            message = err[1]
            break
        }
      } else {
        message = "Network error. Unable to connect to server"
      }
      throw message
    })
}

// Forget Password
export async function postForgetPwd(url, data) {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! Some resources are missing"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 408:
            message = "Request timeout. Try again later"
            break
          default:
            message = err[1]
            break
        }
      } else {
        message = "Network error. Unable to connect to server"
      }
      throw message
    })
}

// Update Profile
export async function postProfileUpdate(url, data) {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! Some resources are missing"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 408:
            message = "Request timeout. Try again later"
            break
          default:
            message = err[1]
            break
        }
      } else {
        message = "Network error. Unable to connect to server"
      }
      throw message
    })
}

// Super User Login
export async function postSuLogin(url, data) {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! Some resources are missing"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid Credentials"
            break
          case 408:
            message = "Request timeout. Try again later"
            break
          default:
            message = err[1]
            break
        }
      } else {
        message = "Network error. Unable to connect to server"
      }
      throw message
    })
}
