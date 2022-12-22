import {
  GET_PDS_LIST,
  GET_PDS_LIST_SUCCESS,
  GET_PDS_LIST_FAIL,
} from "./actionTypes"

export const getPdsList = () => ({
  type: GET_PDS_LIST,
})

export const getPdsListSuccess = pdslist => ({
  type: GET_PDS_LIST_SUCCESS,
  payload: pdslist,
})

export const getPdsListFail = error => ({
  type: GET_PDS_LIST_FAIL,
  payload: error,
})
