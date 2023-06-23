import axios from 'axios'
import accessToken from './jwt-token-access/accessToken'

//pass new generated access token here
const token = accessToken

const API_URL = process.env.REACT_APP_EMP_MONITORING_DOMAIN

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common['Authorization'] = 'Bearer ' + token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function getEmpMon(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function postEmpMon(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function putEmpMon(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function patchEmpMon(url, data, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function delEmpMon(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
