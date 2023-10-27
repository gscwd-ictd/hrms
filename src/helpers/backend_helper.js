import {
  delHris,
  getHris,
  postHris,
  putHris,
  patchHris,
} from './hrms_api_helper'
import { getEmp } from './employee_api_helper'
import { getEmpMon } from './employee_monitoring_api_helper'
import * as url from './url_helper'

// Office ----------------------------------------------------------------------------
export const getOfficeList = () => getHris(url.GET_OFFICES)
export const postOffice = officeData => postHris(url.POST_OFFICE, officeData)
export const putOffice = (officeId, officeData) =>
  putHris(url.UPDATE_OFFICE + officeId, officeData)
export const delOffice = officeId => delHris(url.DELETE_OFFICE + officeId)

// Departments -----------------------------------------------------------------------
export const getDepartmentList = () => getHris(url.GET_DEPARTMENTS)
export const postDepartment = departmentData =>
  postHris(url.POST_DEPARTMENT, departmentData)
export const putDepartment = (departmentId, departmentData) =>
  putHris(url.UPDATE_DEPARTMENT + departmentId, departmentData)
export const delDepartment = departmentId =>
  delHris(url.DELETE_DEPARTMENT + departmentId)

// Divisions -------------------------------------------------------------------------
export const getDivisionList = () => getHris(url.GET_DIVISIONS)
export const postDivision = divisionData =>
  postHris(url.POST_DIVISION, divisionData)
export const putDivision = (divisionId, divisionData) =>
  putHris(url.UPDATE_DIVISION + divisionId, divisionData)
export const delDivision = divisionId =>
  delHris(url.DELETE_DIVISION + divisionId)

// Occupations -----------------------------------------------------------------------
export const getOccupations = () => getHris(url.GET_OCCUPATIONS)
export const getOccupation = occupationId =>
  getHris(url.GET_OCCUPATION + occupationId)
export const postOccupation = occupation =>
  postHris(url.POST_OCCUPATION, occupation)
export const putOccupation = (occupationId, occupation) =>
  putHris(url.PUT_OCCUPATION + occupationId, occupation)
export const delOccupation = occupationId =>
  delHris(url.DELETE_OCCUPATION + occupationId)

// Occupational group ---------------------------------------------------------------
export const getOccupationalGroupPositions = occupationId =>
  getHris(url.GET_OCCUPATIONAL_GROUP + occupationId)
export const getPositionsWithoutOccupation = () =>
  getHris(url.GET_POSITIONS_WITHOUT_OCCUPATION)
export const postPositionsToOccupation = (occupationId, selectedPositions) =>
  postHris(url.POST_POSITIONS_TO_OCCUPATION + occupationId, selectedPositions)
export const delPositionsToOccupation = (occupationId, selectedPositions) =>
  delHris(url.DELETE_POSITIONS_TO_OCCUPATION + occupationId, selectedPositions)

// Plantilla and Position Profile ---------------------------------------------------
export const getPlantillaTable = () => getHris(url.GET_PLANTILLA)
export const getPosition = positionId =>
  getHris(url.GET_PLANTILLA_POSITION + positionId)
export const getPositions = () => getHris(url.GET_PLANTILLA_POSITIONS)

// Submit new Position in Plantilla
export const postNewPosition = positionData =>
  postHris(url.POST_POSITION, positionData)

// Get Salary Grade ----------------------------------------------------------------
export const getSalaryGradeList = () => getHris(url.GET_SALARY_GRADE)
export const putSalaryGradeList = updatedSalaryGradeList =>
  putHris(url.PUT_SALARY_GRADE, updatedSalaryGradeList)
export const getSalaryGradeWithStepIncrement = () =>
  getHris(url.GET_SALARY_GRADE_STEP_INCREMENT)
export const getSalaryGradeWithStepIncrementOne = () =>
  getHris(url.GET_SALARY_GRADE_STEP_INCREMENT_ONE)

// Competency ----------------------------------------------------------------------
export const getCoreModels = () => getHris(url.GET_CORE_COMPETENCIES)
export const getFunctionalModels = () =>
  getHris(url.GET_FUNCTIONAL_COMPETENCIES)
export const getCrossCuttingModels = () =>
  getHris(url.GET_CROSSCUTTING_COMPETENCIES)
export const getManagerialModels = () =>
  getHris(url.GET_MANAGERIAL_COMPETENCIES)
export const getProficiencyKeyActions = competencyId =>
  getHris(url.GET_MODEL_KEY_ACTIONS + competencyId)
export const getCompetenciesOfOccupation = occupationId =>
  getHris(url.GET_COMPETENCIES_OF_OCCUPATION + occupationId)
export const getAvailableFunctionalCompetencies = occupationId =>
  getHris(url.GET_AVAILABLE_FUNCTIONAL_COMPETENCIES + occupationId)
export const postCompetenciesForOccupation = (
  occupationId,
  selectedCompetencies
) =>
  postHris(
    url.POST_COMPETENCIES_FOR_OCCUPATION + occupationId,
    selectedCompetencies
  )
export const delCompetenciesForOccupation = (
  occupationId,
  selectedCompetencies
) =>
  delHris(
    url.DELETE_COMPETENCIES_FOR_OCCUPATION + occupationId,
    selectedCompetencies
  )

// Get proficiency levels for all competencies in a single position
export const getPositionCompetencyProficiencyLevels = positionId =>
  getHris(url.GET_POSITION_COMPETENCY_PROFICIENCY_LEVELS + positionId)

// Get functional competency proficiency levels in a single position
export const getPositionFunctionalCompetenciesProficiencyLevels = positionId =>
  getHris(
    url.GET_POSITION_FUNCTIONAL_COMPETENCY_PROFICIENCY_LEVELS + positionId
  )

//  Update(patch) the proficiency levels
export const patchPositionCompetencyProficiencyLevels = proficiencyLevels =>
  patchHris(url.PATCH_POSITION_COMPETENCY_PROFICIENCY_LEVELS, proficiencyLevels)

// Get available functional competencies that can be assigned to a single position
export const getPositionCompetencyPool = positionId =>
  getHris(
    url.GET_AVAILABLE_FUNCTIONAL_COMPETENCY_POOL_FOR_POSITION + positionId
  )

export const postFunctionalCompetenciesOfPosition = (
  positionId,
  selectedFunctionalCompetencies
) =>
  postHris(
    url.POST_ASSIGN_FUNCTIONAL_COMPETENCIES + positionId,
    selectedFunctionalCompetencies
  )
export const delFunctionalCompetenciesOfPosition =
  selectedFunctionalCompetencies =>
    delHris(
      url.DELETE_UNASSIGN_FUNCTIONAL_COMPETENCIES,
      selectedFunctionalCompetencies
    )

// PRF -----------------------------------------------------------------------------
export const getPRFList = () => getHris(url.GET_PRFLIST)
export const getApprovedPRFList = () => getHris(url.GET_APPROVED_PRFLIST)
export const getPRFDetails = prfId => getHris(url.GET_PRF_DETAILS + prfId)
export const getPRFTrail = prfId => getHris(url.GET_PRF_TRAIL + prfId)

// Qualification Standards ----------------------------------
export const getQualificationStandardsList = () => getHris(url.GET_QS_LIST)
// Get qualification standard of single position
export const getPositionQualificationStandard = positionId =>
  getHris(url.GET_POSITION_QUALIFICATION_STANDARD + positionId)
export const putPositionQualificationStandard = (
  positionId,
  updatedQualificationStandards
) =>
  putHris(
    url.PUT_POSITION_QUALIFICATION_STANDARD + positionId,
    updatedQualificationStandards
  )

// Job Description -----------------------------------------------------
// Get job description of single position
export const getPositionJobDescription = positionId =>
  getHris(url.GET_POSITION_JOB_DESCRIPTION + positionId)

// Update job description of single position
export const patchPositionJobDescription = (
  positionId,
  updatedJobDescription
) =>
  patchHris(
    url.PATCH_POSITION_JOB_DESCRIPTION + positionId,
    updatedJobDescription
  )

// Duties and Responsibilities -----------------------------------------------------
// Get duties and responsibility of single position
export const getPositionDutiesAndResponsibilities = positionId =>
  getHris(url.GET_POSITION_DUTIES + positionId)

export const postDutyResponsibility = dutyResponsibilityData =>
  postHris(url.POST_DUTY_RESPONSIBILITY, dutyResponsibilityData)
export const putDutyResponsibility = (
  dutyResponsibilityId,
  dutyResponsibilityData
) =>
  putHris(
    url.PUT_DUTY_RESPONSIBILITY + dutyResponsibilityId,
    dutyResponsibilityData
  )
export const delDutyResponsibility = dutyResponsibilityId =>
  delHris(url.DELETE_DUTY_RESPONSIBILITY + dutyResponsibilityId)
export const getDutyResponsibilities = () =>
  getHris(url.GET_DUTIES_RESPONSIBILITIES)

// Get the current assigned duties for a occupation
export const getOccupationDuties = (
  occupationId // Assigned duties to a specific occupation
) => getHris(url.GET_OCCUPATION_DUTIES_RESPONSIBILITIES + occupationId)

// Assigned and unassigned response
export const postOccupationDuties = (
  occupationId,
  assignedDutyResponsibilities
) =>
  postHris(
    url.POST_ASSIGN_OCCUPATION_DUTIES_RESPONSIBILITIES + occupationId,
    assignedDutyResponsibilities
  )
export const deleteOccupationDuties = unassignedDutyResponsibilities =>
  delHris(
    url.DELETE_UNASSIGN_OCCUPATION_DUTIES_RESPONSIBILITIES,
    unassignedDutyResponsibilities
  )

// Duties that were not assigned on the given occupation
export const getAvailableDutiesForOccupation = occupationId =>
  getHris(
    url.GET_AVAILABLE_DUTIES_RESPONSIBILITIES + occupationId + url.AVAILABLE
  )

// Events --------------------------------------------------------------------------
export const getEvents = () => getHris(url.GET_EVENTS)

//Employee -------------------------------------------------------------------------
export const getEmployees = () => getHris(url.GET_EMPLOYEES)
export const getEmployeePds = employeeId =>
  getEmp(url.GET_EMPLOYEE_PDS + employeeId + url.VERSION_2)

export const postEmployeeAssignment = empassgndata =>
  postHris(url.POST_EMPLOYEE_ASSIGNMENT, empassgndata)

// Committee -----------------------------------------------------------------------
export const getCommittees = () => getHris(url.GET_COMMITTEES)
export const postCommittee = committeeData =>
  postHris(url.POST_COMMITTEE, committeeData)
export const putCommittee = (committeeId, committeeData) =>
  putHris(url.PUT_COMMITTEE + committeeId, committeeData)
export const delCommittee = committeeId =>
  delHris(url.DELETE_COMMITTEE + committeeId)

// Committee members
export const getCommitteeMembers = committeeId =>
  getHris(url.GET_COMMITTEE_MEMBERS + committeeId)
export const postCommitteeMembers = assignedEmployeesData =>
  postHris(url.POST_ASSIGN_MEMBERS, assignedEmployeesData)
export const deleteCommitteeMembers = unassignedEmployeesData =>
  delHris(url.DELETE_UNASSIGN_MEMBERS, unassignedEmployeesData)

// Employees that were not assigned on the given committee
export const getUnassignedEmployees = committeeId =>
  getHris(
    url.GET_COMMITTEE_MEMBERS + committeeId + url.GET_UNASSIGNED_EMPLOYEES
  )

// PSB committee members only
export const getAssignedPsbMembers = vppId =>
  getHris(url.PUBLICATIONS + vppId + url.ASSIGNED_PSB_MEMBERS)
export const getUnassignedPsbMembers = vppId =>
  getHris(url.PUBLICATIONS + vppId + url.UNASSIGNED_PSB_MEMBERS)
export const patchSwapPsbMember = newPsbMemberData =>
  patchHris(url.PUBLICATIONS + url.PSB_MEMBER, newPsbMemberData)
export const getApplicantPsbRemarks = applicantId =>
  getHris(
    url.PUBLICATIONS +
      url.PUBLICATION_APPLICANTS +
      url.APPLICANT_PSB_REMARKS +
      applicantId
  )

// Publications --------------------------------------------------------------------
export const getPublications = prfId =>
  getHris(url.PUBLICATIONS + url.GET_PUBLICATIONS + prfId)
export const getPublicationCalendarEvents = () =>
  getHris(url.PUBLICATIONS + url.PUBLICATION_CALENDAR_EVENTS)
export const getPublicationDocumentDetails = prfId =>
  getHris(url.PUBLICATIONS + url.PUBLICATION_DOCUMENT_DETAILS + prfId)
export const putPublicationStatus = (vppId, newPublicationStatus) =>
  putHris(url.PUBLICATIONS + vppId, newPublicationStatus)

export const postEndorsementToReqEntity = vppid =>
  postHris(url.APPLICANT_ENDORSEMENT + vppid)

export const getScheduleExamInterview = vppId =>
  getHris(url.PUBLICATIONS + vppId + url.SCHEDULE_EXAM_INTERVIEW)
export const postScheduleExamInterview = (vppId, scheduleDetails) =>
  postHris(
    url.PUBLICATIONS + vppId + url.SCHEDULE_EXAM_INTERVIEW,
    scheduleDetails
  )
export const patchScheduleExamInterview = (scheduleId, newScheduleDetails) =>
  patchHris(
    url.PUBLICATIONS + scheduleId + url.SCHEDULE_EXAM_INTERVIEW,
    newScheduleDetails
  )

export const getPsbDetails = vppId =>
  getHris(url.PUBLICATIONS + url.PSB_DETAILS + vppId)
export const getPsbSummary = vppId =>
  getHris(url.PUBLICATIONS + url.PSB_SUMMARY + vppId)
export const getSelectedByAppointingAuthority = vppId =>
  getHris(
    url.APPLICANT_ENDORSEMENT + url.SELECTED_BY_APPOINTING_AUTHORITY + vppId
  )
export const getCBIReportsHeaders = vppId =>
  getHris(
    url.PUBLICATIONS + vppId + url.COMPETENCY_BASED_INTERVIEW_REPORT_HEADERS
  )

export const patchAppointmentEffectivity = (vppId, effectivityDateDetails) =>
  patchHris(
    url.PUBLICATIONS + url.APPOINTMENT_EFFECTIVITY + vppId,
    effectivityDateDetails
  )

export const getPublicationsWithHiredApplicants = () =>
  getHris(url.APPLICANT_ENDORSEMENT + url.HIRING_PROCESS_RESULTS)

export const getPublicationItemNumbers = vppId =>
  getHris(url.PUBLICATIONS + url.ITEM_NUMBERS_IN_PUBLICATION + vppId)

// Applicants-----------------------------------------------------------------------
export const getApplicants = publicationId =>
  getHris(url.GET_APPLICANTS + publicationId)
export const getQualifiedApplicants = publicationId =>
  getHris(url.PUBLICATIONS + url.QUALIFIED_APPLICANTS + publicationId)

export const getApplicantExternal = applicantId =>
  getHris(url.GET_APPLICANT_PDS + applicantId + url.VERSION_2)
export const getApplicantInternal = applicantId =>
  getEmp(url.GET_APPLICANT_PDS + applicantId + url.VERSION_2)

export const getEndorsedApplicants = vppId =>
  getHris(url.APPLICANT_ENDORSEMENT + url.ENDORSED_APPLICANTS + vppId)
export const getShortlistedApplicants = vppId =>
  getHris(url.APPLICANT_ENDORSEMENT + url.SHORTLISTED_APPLICANTS + vppId)
export const getHiredExternalConfirmedApplicants = () =>
  getHris(
    url.PUBLICATIONS +
      url.QUALIFIED_APPLICANTS +
      url.HIRED_EXTERNAL_CONFIRMED_APPLICANTS
  )

export const patchApplicantApplicationStatus = (
  positingApplicantId,
  applicantStatus
) =>
  patchHris(
    url.GET_APPLICANT +
      positingApplicantId +
      url.PATCH_APPLICANT_APPLICATION_STATUS,
    applicantStatus
  )
export const patchApplicantsExamScores = examScores =>
  patchHris(url.PATCH_APPLICANTS_EXAM_SCORES, examScores)

export const postDbmCscAdditionalData = (
  postingApplicantId,
  dbmCscAdditionalData
) =>
  postHris(
    url.POSITION_DESCRIPTION_DBM_CSC_FORM_1 + postingApplicantId,
    dbmCscAdditionalData
  )

// Officer-In-Charge---------------------------------------------------------------
export const getOfficerInChargeList = () => getHris(url.OFFICER_IN_CHARGE)
export const getSG20UpEmployees = () =>
  getHris(url.OFFICER_IN_CHARGE + url.SG24_UP_EMPLOYEES)
export const getVacantManagerialPositions = () =>
  getHris(url.OFFICER_IN_CHARGE + url.VACANT_MANAGERIAL_POSITIONS)
export const postAssignOfficerInCharge = assignmentDetails =>
  postHris(url.OFFICER_IN_CHARGE, assignmentDetails)
export const delUnassignOfficerInCharge = oicId =>
  delHris(url.OFFICER_IN_CHARGE + oicId)

// Users---------------------------------------------------------------------------
export const getUserList = () => getHris(url.HRMS_USERS)
export const getNonUserList = () =>
  getHris(url.HRMS_USERS + url.ASSIGNABLE_EMPLOYEES_FOR_HRMS)
export const postUser = userDetails => postHris(url.USER_ROLES, userDetails)
export const delUser = employeeId => delHris(url.USER_ROLES + employeeId)

export const getUserRoles = employeeId => getHris(url.USER_ROLES + employeeId)
export const patchUserRoles = updatedUserRoles =>
  patchHris(url.USER_ROLES, updatedUserRoles)

// Documents-----------------------------------------------------------------------
export const getDocumentPositionDescriptionDBMCSC = postingApplicantId =>
  getHris(url.POSITION_DESCRIPTION_DBM_CSC_FORM_1 + postingApplicantId)

export const getCBIReports = vppId =>
  getHris(
    url.PUBLICATIONS +
      url.PSB_SUMMARY +
      url.HRMS_REPORTS +
      url.COMPETENCY_BASED_INTERVIEW +
      vppId
  )
export const getDocumentResultsOfHiring = appointmentEffectivity =>
  getHris(
    url.PUBLICATIONS +
      url.PSB_SUMMARY +
      url.HRMS_REPORTS +
      url.RESULTS_OF_HIRING +
      '?effectivity_date=' +
      appointmentEffectivity
  )
export const getDocumentReportOnAppointmentsIssued = monthYear =>
  getHris(
    url.PUBLICATIONS +
      url.PSB_SUMMARY +
      url.HRMS_REPORTS +
      url.REPORT_ON_APPOINTMENTS +
      monthYear
  )
export const getDocumentCertOfAssumptionToDuty = postingApplicantId =>
  getHris(
    url.PUBLICATIONS +
      url.PSB_SUMMARY +
      url.HRMS_REPORTS +
      url.CERTIFICATION_OF_ASSUMPTION_TO_DUTY +
      postingApplicantId
  )
export const getDocumentCertificateOfAppointment = postingApplicantId =>
  getHris(
    url.PUBLICATIONS +
      url.PSB_SUMMARY +
      url.HRMS_REPORTS +
      url.CERTIFICATE_OF_APPOINTMENT +
      postingApplicantId
  )

// Modules-------------------------------------------------------------------------
export const getHrmsModules = () => getHris(url.HRMS_MODULES)
export const postHrmsModule = module => postHris(url.HRMS_MODULES, module)
export const delHrmsModule = moduleId => delHris(url.HRMS_MODULES + moduleId)
export const patchHrmsModule = (moduleId, moduleDetails) =>
  patchHris(url.HRMS_MODULES + moduleId, moduleDetails)

// System Logs---------------------------------------------------------------------
export const getSystemLogs = () => getHris(url.SYSTEM_LOGS)
export const getSystemLog = logId => getHris(url.SYSTEM_LOGS + logId)

// Schedules-----------------------------------------------------------------------
export const getSchedules = () => getEmpMon(url.SCHEDULES)
