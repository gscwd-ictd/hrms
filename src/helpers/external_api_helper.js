import axios from "axios"

// Get Country List
const getCountryList = url => {
  return axios
    .get(url)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      message = err
      throw message
    })
}

export { getCountryList }
