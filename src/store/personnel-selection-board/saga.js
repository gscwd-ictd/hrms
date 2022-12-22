import { call, put, takeEvery } from "redux-saga/effects"
import {
  getAssignedPsbMembers,
  getUnassignedPsbMembers,
  getPsbSummary,
  getSelectedByAppointingAuthority,
  getCBIReportsHeaders,
  getCBIReports,
} from "helpers/backend_helper"
import {
  fetchAssignedPSBMembersSuccess,
  fetchAssignedPSBMembersFail,
  fetchUnassignedPSBMembersSuccess,
  fetchUnassignedPSBMembersFail,
  fetchPsbSummarySuccess,
  fetchPsbSummaryFail,
  fetchSelectedByAppointingAuthSuccess,
  fetchSelectedByAppointingAuthFail,
  fetchPsbCBIReportsHeaderSuccess,
  fetchPsbCBIReportsHeaderFail,
  fetchPsbCBIReportsSuccess,
  fetchPsbCBIReportsFail,
} from "./actions"
import {
  GET_ASSIGNED_PSB_MEMBERS,
  GET_UNASSIGNED_PSB_MEMBERS,
  GET_PSB_SUMMARY,
  GET_SELECTED_BY_APPOINTING_AUTHORITY,
  GET_PSB_CBI_REPORTS_HEADER,
  GET_PSB_CBI_REPORTS,
} from "./actionTypes"

function* fetchAssignedPSBMembers({ payload: vppId }) {
  try {
    const response = yield call(getAssignedPsbMembers, vppId)
    yield put(fetchAssignedPSBMembersSuccess(response))
  } catch (error) {
    yield put(fetchAssignedPSBMembersFail(error))
  }
}

function* fetchUnassignedPSBMembers({ payload: vppId }) {
  try {
    const response = yield call(getUnassignedPsbMembers, vppId)
    yield put(fetchUnassignedPSBMembersSuccess(response))
  } catch (error) {
    yield put(fetchUnassignedPSBMembersFail(error))
  }
}

function* fetchPsbSummary({ payload: vppId }) {
  try {
    const response = yield call(getPsbSummary, vppId)
    yield put(fetchPsbSummarySuccess(response))
  } catch (error) {
    yield put(fetchPsbSummaryFail(error))
  }
}

function* fetchSelectedByAppointingAuth({ payload: vppId }) {
  try {
    const response = yield call(getSelectedByAppointingAuthority, vppId)
    yield put(fetchSelectedByAppointingAuthSuccess(response))
  } catch (error) {
    yield put(fetchSelectedByAppointingAuthFail(error))
  }
}

function* fetchPsbCBIReportsHeader({ payload: vppId }) {
  try {
    const response = yield call(getCBIReportsHeaders, vppId)
    yield put(fetchPsbCBIReportsHeaderSuccess(response))
  } catch (error) {
    yield put(fetchPsbCBIReportsHeaderFail(error))
  }
}

function* fetchPsbCBIReports({ payload: vppId }) {
  try {
    const response = yield call(getCBIReports, vppId)
    yield put(fetchPsbCBIReportsSuccess(response))
  } catch (error) {
    yield put(fetchPsbCBIReportsFail(error))
  }
}

function* personnelSelectionBoardSaga() {
  yield takeEvery(GET_ASSIGNED_PSB_MEMBERS, fetchAssignedPSBMembers)
  yield takeEvery(GET_UNASSIGNED_PSB_MEMBERS, fetchUnassignedPSBMembers)
  yield takeEvery(GET_PSB_SUMMARY, fetchPsbSummary)
  yield takeEvery(
    GET_SELECTED_BY_APPOINTING_AUTHORITY,
    fetchSelectedByAppointingAuth
  )
  yield takeEvery(GET_PSB_CBI_REPORTS_HEADER, fetchPsbCBIReportsHeader)
  yield takeEvery(GET_PSB_CBI_REPORTS, fetchPsbCBIReports)
}

export default personnelSelectionBoardSaga
