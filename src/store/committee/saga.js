import { call, put, takeEvery } from "redux-saga/effects"
import {
  postCommittee,
  putCommittee,
  delCommittee,
  getCommittees,
  getCommitteeMembers,
  postCommitteeMembers,
  deleteCommitteeMembers,
  getUnassignedEmployees,
} from "helpers/backend_helper"
import {
  addCommitteeSuccess,
  updateCommitteeSuccess,
  removeCommitteeSuccess,
  fetchCommitteesSuccess,
  committeeApiFail,
  fetchCommitteeMembersSuccess,
  fetchCommitteeMembersFail,
  assignCommitteeMembersSuccess,
  assignCommitteeMembersFail,
  unassignCommitteeMembersSuccess,
  unassignCommitteeMembersFail,
  getUnassignedEmployeesSuccess,
  getUnassignedEmployeesFail,
} from "./actions"
import {
  POST_COMMITTEE,
  PUT_COMMITTEE,
  DELETE_COMMITTEE,
  GET_COMMITTEES,
  GET_COMMITTEE_MEMBERS,
  ASSIGN_COMMITTEE_MEMBERS,
  UNASSIGN_COMMITTEE_MEMBERS,
  GET_UNASSIGNED_EMPLOYEES,
} from "./actionTypes"

function* addCommittee({ payload: committeeData }) {
  try {
    const response = yield call(postCommittee, committeeData)
    yield put(addCommitteeSuccess(response))
  } catch (error) {
    yield put(committeeApiFail(error))
  }
}

function* updateCommittee({ payload: { committeeId, committeeData } }) {
  try {
    const response = yield call(putCommittee, committeeId, committeeData)
    yield put(updateCommitteeSuccess(response))
  } catch (error) {
    yield put(committeeApiFail(error))
  }
}

function* deleteCommittee({ payload: committeeId }) {
  try {
    const response = yield call(delCommittee, committeeId)
    yield put(removeCommitteeSuccess(response))
  } catch (error) {
    yield put(committeeApiFail(error))
  }
}

function* fetchCommittees() {
  try {
    const response = yield call(getCommittees)
    yield put(fetchCommitteesSuccess(response))
  } catch (error) {
    yield put(committeeApiFail(error))
  }
}

function* fetchCommitteeMembers({ payload: committeeId }) {
  try {
    const response = yield call(getCommitteeMembers, committeeId)
    yield put(fetchCommitteeMembersSuccess(response))
  } catch (error) {
    yield put(fetchCommitteeMembersFail(error))
  }
}

function* fetchUnassignedEmployees({ payload: committeeId }) {
  try {
    const response = yield call(getUnassignedEmployees, committeeId)
    yield put(getUnassignedEmployeesSuccess(response))
  } catch (error) {
    yield put(getUnassignedEmployeesFail(error))
  }
}

function* sendCommitteeMembers({ payload: assignCommitteeMembers }) {
  try {
    const response = yield call(postCommitteeMembers, assignCommitteeMembers)
    yield put(assignCommitteeMembersSuccess(response))
  } catch (error) {
    yield put(assignCommitteeMembersFail(error))
  }
}

function* removeCommitteeMembers({ payload: unassignedEmployeesData }) {
  try {
    const response = yield call(deleteCommitteeMembers, {
      data: unassignedEmployeesData,
    })
    yield put(unassignCommitteeMembersSuccess(response))
  } catch (error) {
    yield put(unassignCommitteeMembersFail(error))
  }
}

function* committeeSaga() {
  yield takeEvery(POST_COMMITTEE, addCommittee)
  yield takeEvery(PUT_COMMITTEE, updateCommittee)
  yield takeEvery(DELETE_COMMITTEE, deleteCommittee)
  yield takeEvery(GET_COMMITTEES, fetchCommittees)

  yield takeEvery(GET_COMMITTEE_MEMBERS, fetchCommitteeMembers)
  yield takeEvery(GET_UNASSIGNED_EMPLOYEES, fetchUnassignedEmployees)

  yield takeEvery(ASSIGN_COMMITTEE_MEMBERS, sendCommitteeMembers)
  yield takeEvery(UNASSIGN_COMMITTEE_MEMBERS, removeCommitteeMembers)
}

export default committeeSaga
