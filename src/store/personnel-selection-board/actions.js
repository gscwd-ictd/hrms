import {
  GET_ASSIGNED_PSB_MEMBERS,
  GET_ASSIGNED_PSB_MEMBERS_SUCCESS,
  GET_ASSIGNED_PSB_MEMBERS_FAIL,
  GET_UNASSIGNED_PSB_MEMBERS,
  GET_UNASSIGNED_PSB_MEMBERS_SUCCESS,
  GET_UNASSIGNED_PSB_MEMBERS_FAIL,
  GET_PSB_DETAILS,
  GET_PSB_DETAILS_SUCCESS,
  GET_PSB_DETAILS_FAIL,
  GET_PSB_SUMMARY,
  GET_PSB_SUMMARY_SUCCESS,
  GET_PSB_SUMMARY_FAIL,
  GET_SELECTED_BY_APPOINTING_AUTHORITY,
  GET_SELECTED_BY_APPOINTING_AUTHORITY_SUCCESS,
  GET_SELECTED_BY_APPOINTING_AUTHORITY_FAIL,
  GET_PSB_CBI_REPORTS_HEADER,
  GET_PSB_CBI_REPORTS_HEADER_SUCCESS,
  GET_PSB_CBI_REPORTS_HEADER_FAIL,
  GET_PSB_CBI_REPORTS,
  GET_PSB_CBI_REPORTS_SUCCESS,
  GET_PSB_CBI_REPORTS_FAIL,
  PATCH_SWAP_PSB_MEMBER,
  PATCH_SWAP_PSB_MEMBER_SUCCESS,
  PATCH_SWAP_PSB_MEMBER_FAIL,
  GET_APPLICANT_PSB_REMARKS,
  GET_APPLICANT_PSB_REMARKS_SUCCESS,
  GET_APPLICANT_PSB_REMARKS_FAIL,
  ADD_PSB_MEMBER_TO_TABLE,
  REMOVE_PSB_MEMBER_FROM_TABLE,
  RESET_PSB_MEMBERS_TABLE,
  ADD_PSB_MEMBER_TO_OPTIONS,
  REMOVE_PSB_MEMBER_FROM_OPTIONS,
  SET_PSB_ROLES,
  ADD_PSB_ROLE_TO_OPTIONS,
  REMOVE_PSB_ROLE_FROM_OPTIONS,
} from './actionTypes'

// Get assigned Personnel Selection Board members for a specific publication
export const fetchAssignedPSBMembers = vppId => ({
  type: GET_ASSIGNED_PSB_MEMBERS,
  payload: vppId,
})
export const fetchAssignedPSBMembersSuccess = assignedPSBMembers => ({
  type: GET_ASSIGNED_PSB_MEMBERS_SUCCESS,
  payload: assignedPSBMembers,
})
export const fetchAssignedPSBMembersFail = error => ({
  type: GET_ASSIGNED_PSB_MEMBERS_FAIL,
  payload: error,
})

// Get unassigned Personnel Selection Board members for a specific publication
export const fetchUnassignedPSBMembers = vppId => ({
  type: GET_UNASSIGNED_PSB_MEMBERS,
  payload: vppId,
})
export const fetchUnassignedPSBMembersSuccess = unassignedPSBMembers => ({
  type: GET_UNASSIGNED_PSB_MEMBERS_SUCCESS,
  payload: unassignedPSBMembers,
})
export const fetchUnassignedPSBMembersFail = error => ({
  type: GET_UNASSIGNED_PSB_MEMBERS_FAIL,
  payload: error,
})

// Get PSB details. PSB members, interview and/or exam date, location, & etc.
export const fetchPsbDetails = vppId => ({
  type: GET_PSB_DETAILS,
  payload: vppId,
})
export const fetchPsbDetailsSuccess = response => ({
  type: GET_PSB_DETAILS_SUCCESS,
  payload: response,
})
export const fetchPsbDetailsFail = error => ({
  type: GET_PSB_DETAILS_FAIL,
  payload: error,
})

// Get PSB summary of ratings per applicant
export const fetchPsbSummary = vppId => ({
  type: GET_PSB_SUMMARY,
  payload: vppId,
})
export const fetchPsbSummarySuccess = response => ({
  type: GET_PSB_SUMMARY_SUCCESS,
  payload: response,
})
export const fetchPsbSummaryFail = error => ({
  type: GET_PSB_SUMMARY_FAIL,
  payload: error,
})

// Get the list for selected by appointing authority
export const fetchSelectedByAppointingAuth = vppId => ({
  type: GET_SELECTED_BY_APPOINTING_AUTHORITY,
  payload: vppId,
})
export const fetchSelectedByAppointingAuthSuccess = response => ({
  type: GET_SELECTED_BY_APPOINTING_AUTHORITY_SUCCESS,
  payload: response,
})
export const fetchSelectedByAppointingAuthFail = error => ({
  type: GET_SELECTED_BY_APPOINTING_AUTHORITY_FAIL,
  payload: error,
})

// Get the competencies for the CBIR report
export const fetchPsbCBIReportsHeader = vppId => ({
  type: GET_PSB_CBI_REPORTS_HEADER,
  payload: vppId,
})
export const fetchPsbCBIReportsHeaderSuccess = response => ({
  type: GET_PSB_CBI_REPORTS_HEADER_SUCCESS,
  payload: response,
})
export const fetchPsbCBIReportsHeaderFail = error => ({
  type: GET_PSB_CBI_REPORTS_HEADER_FAIL,
  payload: error,
})

// Get the PSB rating for CBIR
export const fetchPsbCBIReports = vppId => ({
  type: GET_PSB_CBI_REPORTS,
  payload: vppId,
})
export const fetchPsbCBIReportsSuccess = response => ({
  type: GET_PSB_CBI_REPORTS_SUCCESS,
  payload: response,
})
export const fetchPsbCBIReportsFail = error => ({
  type: GET_PSB_CBI_REPORTS_FAIL,
  payload: error,
})

// Swap current PSB member assigned
export const updateSwapPsbMember = newPsbMemberData => ({
  type: PATCH_SWAP_PSB_MEMBER,
  payload: newPsbMemberData,
})
export const updateSwapPsbMemberSuccess = response => ({
  type: PATCH_SWAP_PSB_MEMBER_SUCCESS,
  payload: response,
})
export const updateSwapPsbMemberFail = error => ({
  type: PATCH_SWAP_PSB_MEMBER_FAIL,
  payload: error,
})

// Get applicants PSB remarks
export const fetchApplicantPsbRemarks = applicantId => ({
  type: GET_APPLICANT_PSB_REMARKS,
  payload: applicantId,
})
export const fetchApplicantPsbRemarksSuccess = response => ({
  type: GET_APPLICANT_PSB_REMARKS_SUCCESS,
  payload: response,
})
export const fetchApplicantPsbRemarksFail = error => ({
  type: GET_APPLICANT_PSB_REMARKS_FAIL,
  payload: error,
})

// PSB members table actions
export const addPSBMemberToTable = psbMemberData => ({
  type: ADD_PSB_MEMBER_TO_TABLE,
  payload: psbMemberData,
})
export const removePSBMemberFromTable = psbMemberData => ({
  type: REMOVE_PSB_MEMBER_FROM_TABLE,
  payload: psbMemberData,
})
export const resetPSBMembersTable = () => ({
  type: RESET_PSB_MEMBERS_TABLE,
})

// PSB members options actions
export const addPSBMemberToOptions = psbMemberData => ({
  type: ADD_PSB_MEMBER_TO_OPTIONS,
  payload: psbMemberData,
})
export const removePSBMemberFromOptions = psbMemberData => ({
  type: REMOVE_PSB_MEMBER_FROM_OPTIONS,
  payload: psbMemberData,
})

// PSB roles options actions
export const setPSBRoles = psbRoles => ({
  type: SET_PSB_ROLES,
  payload: psbRoles,
})
export const addPSBRoleToOptions = psbRole => ({
  type: ADD_PSB_ROLE_TO_OPTIONS,
  payload: psbRole,
})
export const removePSBRoleFromOptions = psbRole => ({
  type: REMOVE_PSB_ROLE_FROM_OPTIONS,
  payload: psbRole,
})
