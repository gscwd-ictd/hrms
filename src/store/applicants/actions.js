import {
  GET_APPLICANTS,
  GET_APPLICANTS_SUCCESS,
  GET_APPLICANTS_FAIL,
  GET_QUALIFIED_APPLICANTS,
  GET_QUALIFIED_APPLICANTS_SUCCESS,
  GET_QUALIFIED_APPLICANTS_FAIL,
  GET_ENDORSED_APPLICANTS,
  GET_ENDORSED_APPLICANTS_SUCCESS,
  GET_ENDORSED_APPLICANTS_FAIL,
  GET_SHORTLISTED_APPLICANTS,
  GET_SHORTLISTED_APPLICANTS_SUCCESS,
  GET_SHORTLISTED_APPLICANTS_FAIL,
  UPDATE_QUALIFIED_APPLICANT_EXAM_SCORE,
  UPDATE_QUALIFIED_APPLICANTS_EXAM_SCORES,
  UPDATE_QUALIFIED_APPLICANTS_EXAM_SCORES_SUCCESS,
  UPDATE_QUALIFIED_APPLICANTS_EXAM_SCORES_FAIL,
  GET_APPLICANT_PDS,
  GET_APPLICANT_PDS_SUCCESS,
  GET_APPLICANT_PDS_FAIL,
  GET_APPLICANT_WES,
  GET_APPLICANT_WES_SUCCESS,
  GET_APPLICANT_WES_FAIL,
  UPDATE_APPLICANT_APPLICATION_STATUS,
  UPDATE_APPLICANT_APPLICATION_STATUS_SUCCESS,
  UPDATE_APPLICANT_APPLICATION_STATUS_FAIL,
  GET_DOCUMENT_RESULTS_OF_HIRING,
  GET_DOCUMENT_RESULTS_OF_HIRING_SUCCESS,
  GET_DOCUMENT_RESULTS_OF_HIRING_FAIL,
  GET_DOCUMENT_REPORT_ON_APPOINTMENTS_ISSUED,
  GET_DOCUMENT_REPORT_ON_APPOINTMENTS_ISSUED_SUCCESS,
  GET_DOCUMENT_REPORT_ON_APPOINTMENTS_ISSUED_FAIL,
  GET_DOCUMENT_CERTIFICATION_OF_ASSUMPTION_TO_DUTY,
  GET_DOCUMENT_CERTIFICATION_OF_ASSUMPTION_TO_DUTY_SUCCESS,
  GET_DOCUMENT_CERTIFICATION_OF_ASSUMPTION_TO_DUTY_FAIL,
  GET_DOCUMENT_CERTIFICATE_OF_APPOINTMENT,
  GET_DOCUMENT_CERTIFICATE_OF_APPOINTMENT_SUCCESS,
  GET_DOCUMENT_CERTIFICATE_OF_APPOINTMENT_FAIL,
  POST_DBMCSC_DETAILS,
  POST_DBMCSC_DETAILS_SUCCESS,
  POST_DBMCSC_DETAILS_FAIL,
  GET_APPLICANT_DBMCSC_DETAILS,
  GET_APPLICANT_DBMCSC_DETAILS_SUCCESS,
  GET_APPLICANT_DBMCSC_DETAILS_FAIL,
  GET_DBMCSC_FORM33B_DETAILS,
  GET_DBMCSC_FORM33B_DETAILS_SUCCESS,
  GET_DBMCSC_FORM33B_DETAILS_FAIL,
  PATCH_DBMCSC_DETAILS,
  PATCH_DBMCSC_DETAILS_SUCCESS,
  PATCH_DBMCSC_DETAILS_FAIL,
  GET_HIRED_APPLICANTS,
  GET_HIRED_APPLICANTS_SUCCESS,
  GET_HIRED_APPLICANTS_FAIL,
  RESET_APPLICANTS_RESPONSES,
} from './actionTypes'

// Get all applicants
export const fetchApplicants = publicationId => {
  return {
    type: GET_APPLICANTS,
    payload: publicationId,
  }
}
export const fetchApplicantsSuccess = applicantList => {
  return {
    type: GET_APPLICANTS_SUCCESS,
    payload: applicantList,
  }
}
export const fetchApplicantsFailed = error => {
  return {
    type: GET_APPLICANTS_FAIL,
    payload: error,
  }
}

// Get qualified applicants only
export const fetchQualifiedApplicants = publicationId => {
  return {
    type: GET_QUALIFIED_APPLICANTS,
    payload: publicationId,
  }
}
export const fetchQualifiedApplicantsSuccess = qualifiedApplicantList => {
  return {
    type: GET_QUALIFIED_APPLICANTS_SUCCESS,
    payload: qualifiedApplicantList,
  }
}
export const fetchQualifiedApplicantsFailed = error => {
  return {
    type: GET_QUALIFIED_APPLICANTS_FAIL,
    payload: error,
  }
}

// Get endorsed applicants
export const fetchEndorsedApplicants = vppId => {
  return {
    type: GET_ENDORSED_APPLICANTS,
    payload: vppId,
  }
}
export const fetchEndorsedApplicantsSuccess = endorsedApplicants => {
  return {
    type: GET_ENDORSED_APPLICANTS_SUCCESS,
    payload: endorsedApplicants,
  }
}
export const fetchEndorsedApplicantsFailed = error => {
  return {
    type: GET_ENDORSED_APPLICANTS_FAIL,
    payload: error,
  }
}

// Get shortlisted applicants
export const fetchShortlistedApplicants = vppId => {
  return {
    type: GET_SHORTLISTED_APPLICANTS,
    payload: vppId,
  }
}
export const fetchShortlistedApplicantsSuccess = shortlistedApplicants => {
  return {
    type: GET_SHORTLISTED_APPLICANTS_SUCCESS,
    payload: shortlistedApplicants,
  }
}
export const fetchShortlistedApplicantsFailed = error => {
  return {
    type: GET_SHORTLISTED_APPLICANTS_FAIL,
    payload: error,
  }
}

// Update applicant score in state
export const updateQualifiedApplicantExamScore = (index, examScore) => ({
  type: UPDATE_QUALIFIED_APPLICANT_EXAM_SCORE,
  payload: { index, examScore },
})

// Update applicants scores
export const updateQualifiedApplicantsExamScores = examScores => ({
  type: UPDATE_QUALIFIED_APPLICANTS_EXAM_SCORES,
  payload: examScores,
})
export const updateQualifiedApplicantsExamScoresSuccess =
  responseExamScores => ({
    type: UPDATE_QUALIFIED_APPLICANTS_EXAM_SCORES_SUCCESS,
    payload: responseExamScores,
  })
export const updateQualifiedApplicantsExamScoresFailed = error => ({
  type: UPDATE_QUALIFIED_APPLICANTS_EXAM_SCORES_FAIL,
  payload: error,
})

// Get applicant details
export const fetchApplicantPds = (applicantId, isInternal) => {
  return {
    type: GET_APPLICANT_PDS,
    payload: { applicantId, isInternal },
  }
}
export const fetchApplicantPdsSuccess = applicantDetails => {
  return {
    type: GET_APPLICANT_PDS_SUCCESS,
    payload: applicantDetails,
  }
}
export const fetchApplicantPdsFailed = error => {
  return {
    type: GET_APPLICANT_PDS_FAIL,
    payload: error,
  }
}

// Get applicant work experience sheet
export const fetchApplicantWes = (postingApplicantId, isInternal) => {
  return {
    type: GET_APPLICANT_WES,
    payload: { postingApplicantId, isInternal },
  }
}
export const fetchApplicantWesSuccess = applicantWorkExperience => {
  return {
    type: GET_APPLICANT_WES_SUCCESS,
    payload: applicantWorkExperience,
  }
}
export const fetchApplicantWesFailed = error => {
  return {
    type: GET_APPLICANT_WES_FAIL,
    payload: error,
  }
}

// Update applicant application status
export const updateApplicantApplicationStatus = (
  positingApplicantId,
  applicantStatus
) => {
  return {
    type: UPDATE_APPLICANT_APPLICATION_STATUS,
    payload: { positingApplicantId, applicantStatus },
  }
}
export const updateApplicantApplicationStatusSuccess =
  responseApplicantStatus => {
    return {
      type: UPDATE_APPLICANT_APPLICATION_STATUS_SUCCESS,
      payload: responseApplicantStatus,
    }
  }
export const updateApplicantApplicationStatusFail = error => {
  return {
    type: UPDATE_APPLICANT_APPLICATION_STATUS_FAIL,
    payload: error,
  }
}

// Get data for the document of Results of Hiring (HRD-005-2)
export const fetchDocumentResultsOfHiring = appointmentEffectivity => {
  return {
    type: GET_DOCUMENT_RESULTS_OF_HIRING,
    payload: appointmentEffectivity,
  }
}
export const fetchDocumentResultsOfHiringSuccess = response => {
  return {
    type: GET_DOCUMENT_RESULTS_OF_HIRING_SUCCESS,
    payload: response,
  }
}
export const fetchDocumentResultsOfHiringFailed = error => {
  return {
    type: GET_DOCUMENT_RESULTS_OF_HIRING_FAIL,
    payload: error,
  }
}

// Get data for the document of Report on Appointments Issued (CS Form No. 2)
export const fetchDocumentReportOnAppointmentsIssued = monthYear => {
  return {
    type: GET_DOCUMENT_REPORT_ON_APPOINTMENTS_ISSUED,
    payload: monthYear,
  }
}
export const fetchDocumentReportOnAppointmentsIssuedSuccess = response => {
  return {
    type: GET_DOCUMENT_REPORT_ON_APPOINTMENTS_ISSUED_SUCCESS,
    payload: response,
  }
}
export const fetchDocumentReportOnAppointmentsIssuedFail = error => {
  return {
    type: GET_DOCUMENT_REPORT_ON_APPOINTMENTS_ISSUED_FAIL,
    payload: error,
  }
}

// Get data for the document on Certification of Assumption to Duty
export const fetchDocumentCertificationOfAssumptionToDuty =
  postingApplicantId => {
    return {
      type: GET_DOCUMENT_CERTIFICATION_OF_ASSUMPTION_TO_DUTY,
      payload: postingApplicantId,
    }
  }
export const fetchDocumentCertificationOfAssumptionToDutySuccess = response => {
  return {
    type: GET_DOCUMENT_CERTIFICATION_OF_ASSUMPTION_TO_DUTY_SUCCESS,
    payload: response,
  }
}
export const fetchDocumentCertificationOfAssumptionToDutyFail = error => {
  return {
    type: GET_DOCUMENT_CERTIFICATION_OF_ASSUMPTION_TO_DUTY_FAIL,
    payload: error,
  }
}

// Get data for the document on Certificate of Appointment
export const fetchDocumentCertificateOfAppointment = postingApplicantId => {
  return {
    type: GET_DOCUMENT_CERTIFICATE_OF_APPOINTMENT,
    payload: postingApplicantId,
  }
}
export const fetchDocumentCertificateOfAppointmentSuccess = response => {
  return {
    type: GET_DOCUMENT_CERTIFICATE_OF_APPOINTMENT_SUCCESS,
    payload: response,
  }
}
export const fetchDocumentCertificateOfAppointmentFail = error => {
  return {
    type: GET_DOCUMENT_CERTIFICATE_OF_APPOINTMENT_FAIL,
    payload: error,
  }
}

// Post data for additional data on dbm-csc form no. 1
export const addDbmCscAdditionalData = dbmCscAdditionalData => {
  return {
    type: POST_DBMCSC_DETAILS,
    payload: dbmCscAdditionalData,
  }
}
export const addDbmCscAdditionalDataSuccess = response => {
  return {
    type: POST_DBMCSC_DETAILS_SUCCESS,
    payload: response,
  }
}
export const addDbmCscAdditionalDataFailed = error => {
  return {
    type: POST_DBMCSC_DETAILS_FAIL,
    payload: error,
  }
}

// Get hired applicant details about position description form DBM-CSC Form No. 1
export const fetchHiredApplicantDbmCscForm = postingApplicantId => {
  return {
    type: GET_APPLICANT_DBMCSC_DETAILS,
    payload: postingApplicantId,
  }
}
export const fetchHiredApplicantDbmCscFormSuccess = response => {
  return {
    type: GET_APPLICANT_DBMCSC_DETAILS_SUCCESS,
    payload: response,
  }
}
export const fetchHiredApplicantDbmCscFormFailed = error => {
  return {
    type: GET_APPLICANT_DBMCSC_DETAILS_FAIL,
    payload: error,
  }
}

// Get DBM CSC and Form 33-B details
export const fetchDbmCscForm33BData = dbmCscForm33BAdditionalData => {
  return {
    type: GET_DBMCSC_FORM33B_DETAILS,
    payload: dbmCscForm33BAdditionalData,
  }
}
export const fetchDbmCscForm33BDataSuccess = response => {
  return {
    type: GET_DBMCSC_FORM33B_DETAILS_SUCCESS,
    payload: response,
  }
}
export const fetchDbmCscForm33BDataFailed = error => {
  return {
    type: GET_DBMCSC_FORM33B_DETAILS_FAIL,
    payload: error,
  }
}

// Update data for additional data on dbm-csc form no. 1
export const updateDbmCscAdditionalData = dbmCscAdditionalData => {
  return {
    type: PATCH_DBMCSC_DETAILS,
    payload: dbmCscAdditionalData,
  }
}
export const updateDbmCscAdditionalDataSuccess = response => {
  return {
    type: PATCH_DBMCSC_DETAILS_SUCCESS,
    payload: response,
  }
}
export const updateDbmCscAdditionalDataFailed = error => {
  return {
    type: PATCH_DBMCSC_DETAILS_FAIL,
    payload: error,
  }
}

// Get applicants that are hired, external and has confirmed
export const fetchHiredConfirmedApplicants = () => {
  return {
    type: GET_HIRED_APPLICANTS,
  }
}
export const fetchHiredConfirmedApplicantsSuccess = response => {
  return {
    type: GET_HIRED_APPLICANTS_SUCCESS,
    payload: response,
  }
}
export const fetchHiredConfirmedApplicantsFailed = error => {
  return {
    type: GET_HIRED_APPLICANTS_FAIL,
    payload: error,
  }
}

// Reset responses for alerts
export const resetApplicantsResponses = () => {
  return {
    type: RESET_APPLICANTS_RESPONSES,
  }
}
