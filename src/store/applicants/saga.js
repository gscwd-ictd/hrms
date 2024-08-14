import { call, put, takeEvery } from 'redux-saga/effects'
import {
  getApplicants,
  getApplicantExternal,
  getApplicantInternal,
  getQualifiedApplicants,
  getEndorsedApplicants,
  getShortlistedApplicants,
  patchApplicantsExamScores,
  patchApplicantApplicationStatus,
  getDocumentResultsOfHiring,
  getDocumentReportOnAppointmentsIssued,
  getDocumentCertOfAssumptionToDuty,
  getDocumentCertificateOfAppointment,
  getDocumentPositionDescriptionDBMCSC,
  postDbmCscAdditionalData,
  getDbmCscForm33BData,
  putDbmCscAdditionalData,
  getHiredExternalConfirmedApplicants,
} from 'helpers/backend_helper'
import {
  fetchApplicantsSuccess,
  fetchApplicantsFailed,
  fetchApplicantPdsSuccess,
  fetchApplicantPdsFailed,
  fetchQualifiedApplicantsSuccess,
  fetchQualifiedApplicantsFailed,
  updateQualifiedApplicantsExamScoresSuccess,
  updateQualifiedApplicantsExamScoresFailed,
  updateApplicantApplicationStatusSuccess,
  updateApplicantApplicationStatusFail,
  fetchEndorsedApplicantsSuccess,
  fetchEndorsedApplicantsFailed,
  fetchShortlistedApplicantsSuccess,
  fetchShortlistedApplicantsFailed,
  fetchDocumentResultsOfHiringSuccess,
  fetchDocumentResultsOfHiringFailed,
  fetchDocumentReportOnAppointmentsIssuedSuccess,
  fetchDocumentReportOnAppointmentsIssuedFail,
  fetchDocumentCertificationOfAssumptionToDutySuccess,
  fetchDocumentCertificationOfAssumptionToDutyFail,
  fetchDocumentCertificateOfAppointmentSuccess,
  fetchDocumentCertificateOfAppointmentFail,
  addDbmCscAdditionalDataSuccess,
  addDbmCscAdditionalDataFailed,
  fetchHiredApplicantDbmCscFormSuccess,
  fetchHiredApplicantDbmCscFormFailed,
  fetchDbmCscForm33BDataSuccess,
  fetchDbmCscForm33BDataFailed,
  updateDbmCscAdditionalDataSuccess,
  updateDbmCscAdditionalDataFailed,
  fetchHiredExternalConfirmedApplicantsSuccess,
  fetchHiredExternalConfirmedApplicantsFailed,
} from './actions'
import {
  GET_APPLICANTS,
  GET_APPLICANT_PDS,
  GET_QUALIFIED_APPLICANTS,
  UPDATE_QUALIFIED_APPLICANTS_EXAM_SCORES,
  UPDATE_APPLICANT_APPLICATION_STATUS,
  GET_ENDORSED_APPLICANTS,
  GET_SHORTLISTED_APPLICANTS,
  GET_DOCUMENT_RESULTS_OF_HIRING,
  GET_DOCUMENT_REPORT_ON_APPOINTMENTS_ISSUED,
  GET_DOCUMENT_CERTIFICATION_OF_ASSUMPTION_TO_DUTY,
  GET_DOCUMENT_CERTIFICATE_OF_APPOINTMENT,
  POST_DBMCSC_DETAILS,
  GET_APPLICANT_DBMCSC_DETAILS,
  GET_DBMCSC_FORM33B_DETAILS,
  PATCH_DBMCSC_DETAILS,
  GET_HIRED_EXTERNAL_APPLICANTS,
} from './actionTypes'

function* fetchApplicants({ payload: publicationId }) {
  try {
    const response = yield call(getApplicants, publicationId)
    yield put(fetchApplicantsSuccess(response))
  } catch (error) {
    yield put(fetchApplicantsFailed(error))
  }
}

function* fetchQualifiedApplicants({ payload: publicationId }) {
  try {
    const response = yield call(getQualifiedApplicants, publicationId)
    yield put(fetchQualifiedApplicantsSuccess(response))
  } catch (error) {
    yield put(fetchQualifiedApplicantsFailed(error))
  }
}

function* updateQualifiedApplicantsExamScores({ payload: examScores }) {
  try {
    const temp = { applicantsExamScores: examScores }
    const response = yield call(patchApplicantsExamScores, temp)
    yield put(updateQualifiedApplicantsExamScoresSuccess(response))
  } catch (error) {
    yield put(updateQualifiedApplicantsExamScoresFailed(error))
  }
}

function* fetchApplicantPds({ payload: { applicantId, isInternal } }) {
  try {
    if (isInternal === 'internal') {
      const response = yield call(getApplicantInternal, applicantId)
      yield put(fetchApplicantPdsSuccess(response))
    } else {
      const response = yield call(getApplicantExternal, applicantId)
      yield put(fetchApplicantPdsSuccess(response))
    }
  } catch (error) {
    yield put(fetchApplicantPdsFailed(error))
  }
}

function* updateApplicantApplicationStatus({
  payload: { positingApplicantId, applicantStatus },
}) {
  try {
    const response = yield call(
      patchApplicantApplicationStatus,
      positingApplicantId,
      applicantStatus
    )
    yield put(updateApplicantApplicationStatusSuccess(response))
  } catch (error) {
    yield put(updateApplicantApplicationStatusFail(error))
  }
}

function* fetchEndorsedApplicants({ payload: vppId }) {
  try {
    const response = yield call(getEndorsedApplicants, vppId)
    yield put(fetchEndorsedApplicantsSuccess(response))
  } catch (error) {
    yield put(fetchEndorsedApplicantsFailed(error))
  }
}

function* fetchShortlistedApplicants({ payload: vppId }) {
  try {
    const response = yield call(getShortlistedApplicants, vppId)
    yield put(fetchShortlistedApplicantsSuccess(response))
  } catch (error) {
    yield put(fetchShortlistedApplicantsFailed(error))
  }
}

function* fetchDocumentResultsOfHiring({ payload: appointmentEffectivity }) {
  try {
    const response = yield call(
      getDocumentResultsOfHiring,
      appointmentEffectivity
    )
    yield put(fetchDocumentResultsOfHiringSuccess(response))
  } catch (error) {
    yield put(fetchDocumentResultsOfHiringFailed(error))
  }
}

function* fetchDocumentReportOnAppointmentsIssued({ payload: monthYear }) {
  try {
    const response = yield call(
      getDocumentReportOnAppointmentsIssued,
      monthYear
    )
    yield put(fetchDocumentReportOnAppointmentsIssuedSuccess(response))
  } catch (error) {
    yield put(fetchDocumentReportOnAppointmentsIssuedFail(error))
  }
}

function* fetchDocumentCertificationOfAssumptionToDuty({
  payload: positingApplicantId,
}) {
  try {
    const response = yield call(
      getDocumentCertOfAssumptionToDuty,
      positingApplicantId
    )
    yield put(fetchDocumentCertificationOfAssumptionToDutySuccess(response))
  } catch (error) {
    yield put(fetchDocumentCertificationOfAssumptionToDutyFail(error))
  }
}

function* fetchDocumentCertificateOfAppointment({
  payload: positingApplicantId,
}) {
  try {
    const response = yield call(
      getDocumentCertificateOfAppointment,
      positingApplicantId
    )
    yield put(fetchDocumentCertificateOfAppointmentSuccess(response))
  } catch (error) {
    yield put(fetchDocumentCertificateOfAppointmentFail(error))
  }
}

function* addDbmCscAdditionalData({ payload: dbmCscAdditionalData }) {
  try {
    const response = yield call(postDbmCscAdditionalData, dbmCscAdditionalData)
    yield put(addDbmCscAdditionalDataSuccess(response))
  } catch (error) {
    yield put(addDbmCscAdditionalDataFailed(error))
  }
}

function* fetchHiredApplicantDbmCscForm({ payload: postingApplicantId }) {
  try {
    const response = yield call(
      getDocumentPositionDescriptionDBMCSC,
      postingApplicantId
    )

    yield put(fetchHiredApplicantDbmCscFormSuccess(response))
  } catch (error) {
    yield put(fetchHiredApplicantDbmCscFormFailed(error))
  }
}

function* fetchDbmCscForm33BData({ payload: postingApplicantId }) {
  try {
    const response = yield call(getDbmCscForm33BData, postingApplicantId)
    yield put(fetchDbmCscForm33BDataSuccess(response))
  } catch (error) {
    yield put(fetchDbmCscForm33BDataFailed(error))
  }
}

function* updateDbmCscAdditionalData({ payload: dbmCscAdditionalData }) {
  try {
    const response = yield call(putDbmCscAdditionalData, dbmCscAdditionalData)
    yield put(updateDbmCscAdditionalDataSuccess(response))
  } catch (error) {
    yield put(updateDbmCscAdditionalDataFailed(error))
  }
}

function* fetchHiredExternalConfirmedApplicants() {
  try {
    const response = yield call(getHiredExternalConfirmedApplicants)
    yield put(fetchHiredExternalConfirmedApplicantsSuccess(response))
  } catch (error) {
    yield put(fetchHiredExternalConfirmedApplicantsFailed(error))
  }
}

function* applicantsSaga() {
  yield takeEvery(GET_APPLICANTS, fetchApplicants)
  yield takeEvery(GET_QUALIFIED_APPLICANTS, fetchQualifiedApplicants)
  yield takeEvery(
    UPDATE_QUALIFIED_APPLICANTS_EXAM_SCORES,
    updateQualifiedApplicantsExamScores
  )
  yield takeEvery(GET_APPLICANT_PDS, fetchApplicantPds)
  yield takeEvery(
    UPDATE_APPLICANT_APPLICATION_STATUS,
    updateApplicantApplicationStatus
  )
  yield takeEvery(GET_ENDORSED_APPLICANTS, fetchEndorsedApplicants)
  yield takeEvery(GET_SHORTLISTED_APPLICANTS, fetchShortlistedApplicants)
  yield takeEvery(GET_DOCUMENT_RESULTS_OF_HIRING, fetchDocumentResultsOfHiring)
  yield takeEvery(
    GET_DOCUMENT_REPORT_ON_APPOINTMENTS_ISSUED,
    fetchDocumentReportOnAppointmentsIssued
  )
  yield takeEvery(
    GET_DOCUMENT_CERTIFICATION_OF_ASSUMPTION_TO_DUTY,
    fetchDocumentCertificationOfAssumptionToDuty
  )
  yield takeEvery(
    GET_DOCUMENT_CERTIFICATE_OF_APPOINTMENT,
    fetchDocumentCertificateOfAppointment
  )
  yield takeEvery(POST_DBMCSC_DETAILS, addDbmCscAdditionalData)
  yield takeEvery(GET_APPLICANT_DBMCSC_DETAILS, fetchHiredApplicantDbmCscForm)
  yield takeEvery(GET_DBMCSC_FORM33B_DETAILS, fetchDbmCscForm33BData)
  yield takeEvery(PATCH_DBMCSC_DETAILS, updateDbmCscAdditionalData)
  yield takeEvery(
    GET_HIRED_EXTERNAL_APPLICANTS,
    fetchHiredExternalConfirmedApplicants
  )
}

export default applicantsSaga
