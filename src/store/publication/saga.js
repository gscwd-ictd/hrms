import { call, put, takeEvery } from "redux-saga/effects"
import {
  getPublications,
  getPublicationCalendarEvents,
  getPublicationDocumentDetails,
  putPublicationStatus,
  postEndorsementToReqEntity,
  getScheduleExamInterview,
  postScheduleExamInterview,
  patchScheduleExamInterview,
  patchAppointmentEffectivity,
  getPublicationsWithHiredApplicants,
  getPublicationItemNumbers,
} from "helpers/backend_helper"
import {
  getPublicationsSuccess,
  getPublicationsFail,
  fetchCalendarInterviewSchedulesSuccess,
  fetchCalendarInterviewSchedulesFail,
  fetchPublicationDocumentDetailsSuccess,
  fetchPublicationDocumentDetailsFail,
  updatePublicationStatusSuccess,
  updatePublicationStatusFail,
  addEndorsementToReqEntitySuccess,
  addEndorsementToReqEntityFail,
  fetchExamInterviewScheduleSuccess,
  fetchExamInterviewScheduleFail,
  addExamInterviewScheduleSuccess,
  addExamInterviewScheduleFail,
  updateExamInterviewScheduleSuccess,
  updateExamInterviewScheduleFail,
  updateAppointmentEffectivityDateSuccess,
  updateAppointmentEffectivityDateFail,
  fetchPublicationsWithHiredApplicantsSuccess,
  fetchPublicationsWithHiredApplicantsFailed,
  fetchAvailableItemNumbersSuccess,
  fetchAvailableItemNumbersFailed,
} from "./actions"
import {
  GET_PUBLICATIONS,
  GET_CALENDAR_INTERVIEW_SCHEDULES,
  GET_PUBLICATION_DOCUMENT_DETAILS,
  PUT_PUBLICATION_STATUS,
  POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY,
  GET_PUBLICATION_SCHEDULES,
  POST_SCHEDULE_EXAM_INTERVIEW,
  PATCH_SCHEDULE_EXAM_INTERVIEW,
  PATCH_SET_APPOINTMENT_EFFECTIVITY,
  GET_PUBLICATIONS_WITH_HIRED_APPLICANTS,
  GET_AVAILABLE_ITEM_NUMBERS,
} from "./actionTypes"

function* fetchPublications({ payload: prfId }) {
  try {
    const response = yield call(getPublications, prfId)
    yield put(getPublicationsSuccess(response))
  } catch (error) {
    yield put(getPublicationsFail(error))
  }
}

function* fetchCalendarInterviewSchedules() {
  try {
    const response = yield call(getPublicationCalendarEvents)
    yield put(fetchCalendarInterviewSchedulesSuccess(response))
  } catch (error) {
    yield put(fetchCalendarInterviewSchedulesFail(error))
  }
}

function* fetchPublicationDocumentDetails({ payload: prfId }) {
  try {
    const response = yield call(getPublicationDocumentDetails, prfId)
    yield put(fetchPublicationDocumentDetailsSuccess(response))
  } catch (error) {
    yield put(fetchPublicationDocumentDetailsFail(error))
  }
}

function* updatePublicationStatus({
  payload: { vppId, newPublicationStatus },
}) {
  try {
    const response = yield call(
      putPublicationStatus,
      vppId,
      newPublicationStatus
    )
    yield put(updatePublicationStatusSuccess(response))
  } catch (error) {
    yield put(updatePublicationStatusFail(error))
  }
}

function* addEndorsementToReqEntity({ payload: vppId }) {
  try {
    const response = yield call(postEndorsementToReqEntity, vppId)
    yield put(addEndorsementToReqEntitySuccess(response))
  } catch (error) {
    yield put(addEndorsementToReqEntityFail(error))
  }
}

function* fetchExamInterviewSchedule({ payload: vppId }) {
  try {
    const response = yield call(getScheduleExamInterview, vppId)
    yield put(fetchExamInterviewScheduleSuccess(response))
  } catch (error) {
    yield put(fetchExamInterviewScheduleFail(error))
  }
}

function* addExamInterviewSchedule({ payload: { vppId, scheduleDetails } }) {
  try {
    const response = yield call(
      postScheduleExamInterview,
      vppId,
      scheduleDetails
    )
    yield put(addExamInterviewScheduleSuccess(response))
  } catch (error) {
    yield put(addExamInterviewScheduleFail(error))
  }
}

function* updateExamInterviewSchedule({
  payload: { scheduleId, newScheduleDetails },
}) {
  try {
    const response = yield call(
      patchScheduleExamInterview,
      scheduleId,
      newScheduleDetails
    )
    yield put(updateExamInterviewScheduleSuccess(response))
  } catch (error) {
    yield put(updateExamInterviewScheduleFail(error))
  }
}

function* updateAppointmentEffectivityDate({
  payload: { vppId, effectivityDateDetails },
}) {
  try {
    const response = yield call(
      patchAppointmentEffectivity,
      vppId,
      effectivityDateDetails
    )
    yield put(updateAppointmentEffectivityDateSuccess(response))
  } catch (error) {
    yield put(updateAppointmentEffectivityDateFail(error))
  }
}

function* fetchPublicationsWithHiredApplicants() {
  try {
    const response = yield call(getPublicationsWithHiredApplicants)
    yield put(fetchPublicationsWithHiredApplicantsSuccess(response))
  } catch (error) {
    yield put(fetchPublicationsWithHiredApplicantsFailed(error))
  }
}

function* fetchAvailableItemNumbers({ payload: vppId }) {
  try {
    const response = yield call(getPublicationItemNumbers, vppId)
    yield put(fetchAvailableItemNumbersSuccess(response))
  } catch (error) {
    yield put(fetchAvailableItemNumbersFailed(error))
  }
}

function* publicationsSaga() {
  yield takeEvery(GET_PUBLICATIONS, fetchPublications)
  yield takeEvery(
    GET_CALENDAR_INTERVIEW_SCHEDULES,
    fetchCalendarInterviewSchedules
  )
  yield takeEvery(
    GET_PUBLICATION_DOCUMENT_DETAILS,
    fetchPublicationDocumentDetails
  )
  yield takeEvery(PUT_PUBLICATION_STATUS, updatePublicationStatus)
  yield takeEvery(
    POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY,
    addEndorsementToReqEntity
  )
  yield takeEvery(GET_PUBLICATION_SCHEDULES, fetchExamInterviewSchedule)
  yield takeEvery(POST_SCHEDULE_EXAM_INTERVIEW, addExamInterviewSchedule)
  yield takeEvery(PATCH_SCHEDULE_EXAM_INTERVIEW, updateExamInterviewSchedule)
  yield takeEvery(
    PATCH_SET_APPOINTMENT_EFFECTIVITY,
    updateAppointmentEffectivityDate
  )
  yield takeEvery(
    GET_PUBLICATIONS_WITH_HIRED_APPLICANTS,
    fetchPublicationsWithHiredApplicants
  )
  yield takeEvery(GET_AVAILABLE_ITEM_NUMBERS, fetchAvailableItemNumbers)
}

export default publicationsSaga
