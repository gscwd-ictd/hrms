import axios from "axios"

// Submit Employee Assignment in Plantilla Method
const postEmployeeAssignment = (url, data) => {
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
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Get Plantilla List
const getPlantillaTable = url => {
  return axios
    .get(url)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message = err
      throw message
    })
}

// Submit new Position in Plantilla
const postNewPosition = (url, data) => {
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
          case 400:
            message = err.response.data.message
            break
          case 500:
            message =
              "Error 500"
            break
          case 401:
            message = "Error 401"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Get Duties and Responsibilities
const getPositionDutiesAndResponsibilities = url => {
  return axios
    .get(url)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message = err
      throw message
    })
}

export { postEmployeeAssignment, getPlantillaTable, postNewPosition, getPositionDutiesAndResponsibilities }
