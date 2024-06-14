import {
  GET_PUBLICATIONS,
  GET_PUBLICATIONS_SUCCESS,
  GET_PUBLICATIONS_FAIL,
  RESET_PUBLICATIONS,
  GET_CALENDAR_INTERVIEW_SCHEDULES,
  GET_CALENDAR_INTERVIEW_SCHEDULES_SUCCESS,
  GET_CALENDAR_INTERVIEW_SCHEDULES_FAIL,
  GET_PUBLICATION_DOCUMENT_DETAILS,
  GET_PUBLICATION_DOCUMENT_DETAILS_SUCCESS,
  GET_PUBLICATION_DOCUMENT_DETAILS_FAIL,
  PUT_PUBLICATION_STATUS,
  PUT_PUBLICATION_STATUS_SUCCESS,
  PUT_PUBLICATION_STATUS_FAIL,
  POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY,
  POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY_SUCCESS,
  POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY_FAIL,
  GET_PUBLICATION_SCHEDULES,
  GET_PUBLICATION_SCHEDULES_SUCCESS,
  GET_PUBLICATION_SCHEDULES_FAIL,
  POST_SCHEDULE_EXAM_INTERVIEW,
  POST_SCHEDULE_EXAM_INTERVIEW_SUCCESS,
  POST_SCHEDULE_EXAM_INTERVIEW_FAIL,
  PATCH_SCHEDULE_EXAM_INTERVIEW,
  PATCH_SCHEDULE_EXAM_INTERVIEW_SUCCESS,
  PATCH_SCHEDULE_EXAM_INTERVIEW_FAIL,
  PATCH_SET_APPOINTMENT_EFFECTIVITY,
  PATCH_SET_APPOINTMENT_EFFECTIVITY_SUCCESS,
  PATCH_SET_APPOINTMENT_EFFECTIVITY_FAIL,
  GET_PUBLICATIONS_WITH_HIRED_APPLICANTS,
  GET_PUBLICATIONS_WITH_HIRED_APPLICANTS_SUCCESS,
  GET_PUBLICATIONS_WITH_HIRED_APPLICANTS_FAIL,
  GET_AVAILABLE_ITEM_NUMBERS,
  GET_AVAILABLE_ITEM_NUMBERS_SUCCESS,
  GET_AVAILABLE_ITEM_NUMBERS_FAIL,
  GET_SELECTION_FOR_COA_CERTIFIED_BY,
  GET_SELECTION_FOR_COA_CERTIFIED_BY_SUCCESS,
  GET_SELECTION_FOR_COA_CERTIFIED_BY_FAIL,
  RESET_PUBLICATION_RESPONSES,
} from './actionTypes'

// Publication List
export const getPublications = prfId => ({
  type: GET_PUBLICATIONS,
  payload: prfId,
})
export const getPublicationsSuccess = publications => ({
  type: GET_PUBLICATIONS_SUCCESS,
  payload: publications,
})
export const getPublicationsFail = error => ({
  type: GET_PUBLICATIONS_FAIL,
  payload: error,
})

export const resetPublications = () => ({
  type: RESET_PUBLICATIONS,
})

// Interview Schedule for Calendar
export const fetchCalendarInterviewSchedules = () => ({
  type: GET_CALENDAR_INTERVIEW_SCHEDULES,
})
export const fetchCalendarInterviewSchedulesSuccess = interviewSchedules => ({
  type: GET_CALENDAR_INTERVIEW_SCHEDULES_SUCCESS,
  payload: interviewSchedules,
})
export const fetchCalendarInterviewSchedulesFail = error => ({
  type: GET_CALENDAR_INTERVIEW_SCHEDULES_FAIL,
  payload: error,
})

// Get content of publication documents
export const fetchPublicationDocumentDetails = prfId => ({
  type: GET_PUBLICATION_DOCUMENT_DETAILS,
  payload: prfId,
})
export const fetchPublicationDocumentDetailsSuccess = publicationDetails => ({
  type: GET_PUBLICATION_DOCUMENT_DETAILS_SUCCESS,
  payload: publicationDetails,
})
export const fetchPublicationDocumentDetailsFail = error => ({
  type: GET_PUBLICATION_DOCUMENT_DETAILS_FAIL,
  payload: error,
})

// Update publication status with added details depending on the requirements(list of psb members/deadline date/exam date/interview date)
export const updatePublicationStatus = (vppId, newPublicationStatus) => ({
  type: PUT_PUBLICATION_STATUS,
  payload: { vppId, newPublicationStatus },
})
export const updatePublicationStatusSuccess = response => ({
  type: PUT_PUBLICATION_STATUS_SUCCESS,
  payload: response,
})
export const updatePublicationStatusFail = error => ({
  type: PUT_PUBLICATION_STATUS_FAIL,
  payload: error,
})

// Send endorsement of qualified applicants to the requesting entity
export const addEndorsementToReqEntity = vppId => ({
  type: POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY,
  payload: vppId,
})
export const addEndorsementToReqEntitySuccess = response => ({
  type: POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY_SUCCESS,
  payload: response,
})
export const addEndorsementToReqEntityFail = error => ({
  type: POST_ENDORSEMENT_OF_QUALIFIED_APPLICANTS_TO_REQUESTING_ENTITY_FAIL,
  payload: error,
})

// Get publication schedule details. Will be use for rescheduling
export const fetchExamInterviewSchedule = vppId => ({
  type: GET_PUBLICATION_SCHEDULES,
  payload: vppId,
})
export const fetchExamInterviewScheduleSuccess = response => ({
  type: GET_PUBLICATION_SCHEDULES_SUCCESS,
  payload: response,
})
export const fetchExamInterviewScheduleFail = error => ({
  type: GET_PUBLICATION_SCHEDULES_FAIL,
  payload: error,
})

// Send data for shceduling of examination or interview
export const addExamInterviewSchedule = (vppId, scheduleDetails) => ({
  type: POST_SCHEDULE_EXAM_INTERVIEW,
  payload: { vppId, scheduleDetails },
})
export const addExamInterviewScheduleSuccess = response => ({
  type: POST_SCHEDULE_EXAM_INTERVIEW_SUCCESS,
  payload: response,
})
export const addExamInterviewScheduleFail = error => ({
  type: POST_SCHEDULE_EXAM_INTERVIEW_FAIL,
  payload: error,
})

// Re-schedule publication schedules. Either exam or interview schedule.
export const updateExamInterviewSchedule = (
  scheduleId,
  newScheduleDetails
) => ({
  type: PATCH_SCHEDULE_EXAM_INTERVIEW,
  payload: { scheduleId, newScheduleDetails },
})
export const updateExamInterviewScheduleSuccess = response => ({
  type: PATCH_SCHEDULE_EXAM_INTERVIEW_SUCCESS,
  payload: response,
})
export const updateExamInterviewScheduleFail = error => ({
  type: PATCH_SCHEDULE_EXAM_INTERVIEW_FAIL,
  payload: error,
})

// add appointment effectivity date to hired applicants
export const updateAppointmentEffectivityDate = (
  vppId,
  effectivityDateDetails
) => ({
  type: PATCH_SET_APPOINTMENT_EFFECTIVITY,
  payload: { vppId, effectivityDateDetails },
})
export const updateAppointmentEffectivityDateSuccess = response => ({
  type: PATCH_SET_APPOINTMENT_EFFECTIVITY_SUCCESS,
  payload: response,
})
export const updateAppointmentEffectivityDateFail = error => ({
  type: PATCH_SET_APPOINTMENT_EFFECTIVITY_FAIL,
  payload: error,
})

// Get list of publications with hired applicants
export const fetchPublicationsWithHiredApplicants = () => {
  return {
    type: GET_PUBLICATIONS_WITH_HIRED_APPLICANTS,
  }
}
export const fetchPublicationsWithHiredApplicantsSuccess = response => {
  return {
    type: GET_PUBLICATIONS_WITH_HIRED_APPLICANTS_SUCCESS,
    payload: response,
  }
}
export const fetchPublicationsWithHiredApplicantsFailed = error => {
  return {
    type: GET_PUBLICATIONS_WITH_HIRED_APPLICANTS_FAIL,
    payload: error,
  }
}

// Get list of item numbers that are not yet assigned to a hired applicant
export const fetchAvailableItemNumbers = vppId => {
  return {
    type: GET_AVAILABLE_ITEM_NUMBERS,
    payload: vppId,
  }
}
export const fetchAvailableItemNumbersSuccess = response => {
  return {
    type: GET_AVAILABLE_ITEM_NUMBERS_SUCCESS,
    payload: response,
  }
}
export const fetchAvailableItemNumbersFailed = error => {
  return {
    type: GET_AVAILABLE_ITEM_NUMBERS_FAIL,
    payload: error,
  }
}

// Get list of selection whom can certify the positing for Certifcate of Appointment
export const fetchSelectionForCoaCertification = vppId => {
  return {
    type: GET_SELECTION_FOR_COA_CERTIFIED_BY,
  }
}
export const fetchSelectionForCoaCertificationSuccess = response => {
  return {
    type: GET_SELECTION_FOR_COA_CERTIFIED_BY_SUCCESS,
    payload: response,
  }
}
export const fetchSelectionForCoaCertificationFailed = error => {
  return {
    type: GET_SELECTION_FOR_COA_CERTIFIED_BY_FAIL,
    payload: error,
  }
}

// Reset all responses in publication
export const resetPublicationResponses = () => ({
  type: RESET_PUBLICATION_RESPONSES,
})
