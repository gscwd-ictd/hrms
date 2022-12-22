import { call, put, takeEvery } from "redux-saga/effects"
import {
  getPRFList,
  getApprovedPRFList,
  getPRFDetails,
  getPRFTrail,
} from "helpers/backend_helper"
import {
  getPRFListSuccess,
  getPRFListFail,
  getSinglePRFSuccess,
  getSinglePRFFail,
  fetchPRFTrailSuccess,
  fetchPRFTrailFail,
  getApprovedPRFListSuccess,
  getApprovedPRFListFail,
} from "./actions"
import {
  GET_PRFLIST,
  GET_APPROVED_PRFLIST,
  GET_SINGLE_PRF,
  GET_PRF_TRAIL,
} from "./actionTypes"

function* fetchPRFList() {
  try {
    const response = yield call(getPRFList)
    yield put(getPRFListSuccess(response))
  } catch (error) {
    yield put(getPRFListFail(error))
  }
}

function* fetchApprovedPRFList() {
  try {
    const response = yield call(getApprovedPRFList)
    yield put(getApprovedPRFListSuccess(response))
  } catch (error) {
    yield put(getApprovedPRFListFail(error))
  }
}

function* fetchSinglePRF({ payload: prfId }) {
  try {
    const response = yield call(getPRFDetails, prfId)
    yield put(getSinglePRFSuccess(response))
  } catch (error) {
    yield put(getSinglePRFFail(error))
  }
}

function* fetchPRFTrail({ payload: prfId }) {
  try {
    const response = yield call(getPRFTrail, prfId)
    yield put(fetchPRFTrailSuccess(response))

    // yield put(fetchPRFTrailSuccess(mockData.prfTrail))
  } catch (error) {
    yield put(fetchPRFTrailFail(error))
  }
}

function* positionReqSaga() {
  yield takeEvery(GET_PRFLIST, fetchPRFList)
  yield takeEvery(GET_APPROVED_PRFLIST, fetchApprovedPRFList)
  yield takeEvery(GET_SINGLE_PRF, fetchSinglePRF)
  yield takeEvery(GET_PRF_TRAIL, fetchPRFTrail)
}

export default positionReqSaga
