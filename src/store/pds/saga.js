import { all, call, fork, put, takeEvery } from "redux-saga/effects"
// import { getPdsList } from "../../../helpers/pds_helper"
import * as url from "helpers/url_helper"
import { getPdsListSuccess, getPdsListFail } from "./actions"
import { GET_PDS_LIST } from "./actionTypes"

const domainUrl = process.env.REACT_APP_AUTHDOMAIN

function* fetchPdsList() {
  try {
    const response = yield call(
      getPdsList,
      domainUrl + url.GET_PDS_LIST,
    )
    
    yield put(getPdsListSuccess(response))
  } catch (error) {
    yield put(getPdsListFail(error))
  }
}

function* pdsSaga() {
  yield takeEvery(GET_PDS_LIST, fetchPdsList)
}

export default pdsSaga
