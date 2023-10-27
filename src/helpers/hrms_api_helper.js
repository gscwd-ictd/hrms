import axios from 'axios'

const API_URL = process.env.REACT_APP_HRMS_DOMAIN

const axiosApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function getHris(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function postHris(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function putHris(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function patchHris(url, data, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function delHris(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
