import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  getAssignedPsbMembers,
  getUnassignedPsbMembers,
  getPsbDetails,
  getPsbSummary,
  getSelectedByAppointingAuthority,
  getCBIReportsHeaders,
  getCBIReports,
  patchSwapPsbMember,
  getApplicantPsbRemarks,
} from 'helpers/backend_helper'
import {
  fetchAssignedPSBMembersSuccess,
  fetchAssignedPSBMembersFail,
  fetchUnassignedPSBMembersSuccess,
  fetchUnassignedPSBMembersFail,
  fetchPsbDetailsSuccess,
  fetchPsbDetailsFail,
  fetchPsbSummarySuccess,
  fetchPsbSummaryFail,
  fetchSelectedByAppointingAuthSuccess,
  fetchSelectedByAppointingAuthFail,
  fetchPsbCBIReportsHeaderSuccess,
  fetchPsbCBIReportsHeaderFail,
  fetchPsbCBIReportsSuccess,
  fetchPsbCBIReportsFail,
  updateSwapPsbMemberSuccess,
  updateSwapPsbMemberFail,
  fetchApplicantPsbRemarksSuccess,
  fetchApplicantPsbRemarksFail,
} from './actions'
import {
  GET_ASSIGNED_PSB_MEMBERS,
  GET_UNASSIGNED_PSB_MEMBERS,
  GET_PSB_DETAILS,
  GET_PSB_SUMMARY,
  GET_SELECTED_BY_APPOINTING_AUTHORITY,
  GET_PSB_CBI_REPORTS_HEADER,
  GET_PSB_CBI_REPORTS,
  PATCH_SWAP_PSB_MEMBER,
  GET_APPLICANT_PSB_REMARKS,
} from './actionTypes'

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

function* fetchPsbDetails({ payload: vppId }) {
  try {
    const response = yield call(getPsbDetails, vppId)
    yield put(fetchPsbDetailsSuccess(response))
  } catch (error) {
    yield put(fetchPsbDetailsFail(error))
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

function* updateSwapPsbMember({ payload: newPsbMemberData }) {
  try {
    const response = yield call(patchSwapPsbMember, newPsbMemberData)
    yield put(updateSwapPsbMemberSuccess(response))
  } catch (error) {
    yield put(updateSwapPsbMemberFail(error))
  }
}

function* fetchApplicantPsbRemarks({ payload: applicantId }) {
  try {
    const response = yield call(getApplicantPsbRemarks, applicantId)
    yield put(fetchApplicantPsbRemarksSuccess(response))
  } catch (error) {
    yield put(fetchApplicantPsbRemarksFail(error))
  }
}

function* personnelSelectionBoardSaga() {
  yield takeEvery(GET_ASSIGNED_PSB_MEMBERS, fetchAssignedPSBMembers)
  yield takeEvery(GET_UNASSIGNED_PSB_MEMBERS, fetchUnassignedPSBMembers)
  yield takeEvery(GET_PSB_DETAILS, fetchPsbDetails)
  yield takeLatest(GET_PSB_SUMMARY, fetchPsbSummary)
  yield takeEvery(
    GET_SELECTED_BY_APPOINTING_AUTHORITY,
    fetchSelectedByAppointingAuth
  )
  yield takeEvery(GET_PSB_CBI_REPORTS_HEADER, fetchPsbCBIReportsHeader)
  yield takeEvery(GET_PSB_CBI_REPORTS, fetchPsbCBIReports)
  yield takeEvery(PATCH_SWAP_PSB_MEMBER, updateSwapPsbMember)
  yield takeEvery(GET_APPLICANT_PSB_REMARKS, fetchApplicantPsbRemarks)
}

export default personnelSelectionBoardSaga
