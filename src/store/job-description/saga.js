import { call, put, takeEvery } from "redux-saga/effects"
import {
  getPositionJobDescription,
  patchPositionJobDescription,
} from "helpers/backend_helper"
import {
  fetchJobDescriptionSuccess,
  updateJobDescriptionSuccess,
  jobDescriptionApiFail,
} from "./actions"
import { GET_JOB_DESCRIPTION, UPDATE_JOB_DESCRIPTION } from "./actionTypes"

function* fetchJobDescription({ payload: positionId }) {
  try {
    const response = yield call(getPositionJobDescription, positionId)
    yield put(fetchJobDescriptionSuccess(response))
  } catch (error) {
    yield put(jobDescriptionApiFail(error))
  }
}

function* updateJobDescription({
  payload: { positionId, updatedJobDescription },
}) {
  try {
    const response = yield call(
      patchPositionJobDescription,
      positionId,
      updatedJobDescription
    )
    yield put(updateJobDescriptionSuccess(response))
  } catch (error) {
    yield put(jobDescriptionApiFail(error))
  }
}

function* jobDescriptionSaga() {
  yield takeEvery(GET_JOB_DESCRIPTION, fetchJobDescription)
  yield takeEvery(UPDATE_JOB_DESCRIPTION, updateJobDescription)
}

export default jobDescriptionSaga
