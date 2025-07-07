import axios from 'axios'
import accessToken from './jwt-token-access/accessToken'

//pass new generated access token here
const token = accessToken

const API_URL = process.env.REACT_APP_EMP_DOMAIN

const API_URL2 = process.env.REACT_APP_EMP_DOMAIN_V2

const axiosApi = axios.create({
  baseURL: API_URL,
})

const axiosApi2 = axios.create({
  baseURL: API_URL2,
})

axiosApi.defaults.headers.common['Authorization'] = 'Bearer ' + token

axiosApi.interceptors.request.use(
  response => response,
  error => Promise.reject(error)
)

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function getEmp(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function getEmpv2(url, config = {}) {
  return await axiosApi2.get(url, { ...config }).then(response => response.data)
}

export async function postEmp(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function putEmp(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function patchEmp(url, data, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function delEmp(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
