import { call, put, takeEvery } from "redux-saga/effects"
import { getSystemLogs, getSystemLog } from "helpers/backend_helper"
import {
  fetchSystemLogsSuccess,
  fetchSystemLogsFail,
  fetchSystemLogSuccess,
  fetchSystemLogFail,
} from "./actions"
import { GET_SYSTEM_LOGS, GET_SYSTEM_LOG } from "./actionTypes"

function* fetchSystemLogs() {
  try {
    const response = yield call(getSystemLogs)

    yield put(fetchSystemLogsSuccess(response))
  } catch (error) {
    yield put(fetchSystemLogsFail(error))
  }
}

function* fetchSystemLog({ payload: logId }) {
  try {
    const response = yield call(getSystemLog, logId)

    yield put(fetchSystemLogSuccess(response))
  } catch (error) {
    yield put(fetchSystemLogFail(error))
  }
}

function* systemLogsSaga() {
  yield takeEvery(GET_SYSTEM_LOGS, fetchSystemLogs)
  yield takeEvery(GET_SYSTEM_LOG, fetchSystemLog)
}
export default systemLogsSaga
