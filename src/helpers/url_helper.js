//REGISTER
// export const POST_REGISTER = "/post-register"
export const AVAILABLE = '/available'

//AUTHENTICATION
export const POST_LOGIN = 'auth/login'
export const POST_LOGOUT = 'auth/logout'
export const POST_VERIFY_ACCESS_TOKEN = 'auth/verify/'
export const POST_REGISTER = 'auth/register'
export const POST_FORGET_PASSWORD = 'auth/forget-password'
export const POST_PROFILE_UPDATE = 'auth/post-jwt-profile'
export const POST_SU_LOGIN = 'users/super-login'

// DASHBOARD
export const GET_EMPLOYEES_COUNT = 'stats/count/employees'
export const GET_APPLICANTS_COUNT = 'stats/count/applicants'
export const GET_APPROVED_PRF_COUNT = 'stats/count/prf'
export const GET_BIRTHDAY_CELEBRANTS = 'stats/current/birthdays'
export const GET_NOA_DISTRIBUTION = 'stats/count/appointment'
export const GET_PERSONNEL_DISTRIBUTION = 'stats/count/department'
export const GET_AGE_BRACKET_DISTRIBUTION = 'stats/count/age'

//ORGANIZATION STRUCTURE
export const GET_OFFICES = 'office'
export const POST_OFFICE = 'office'
export const DELETE_OFFICE = 'office/'
export const UPDATE_OFFICE = 'office/'

export const GET_DEPARTMENTS = 'departments'
export const POST_DEPARTMENT = 'departments'
export const DELETE_DEPARTMENT = 'departments/'
export const UPDATE_DEPARTMENT = 'departments/'

export const GET_DIVISIONS = 'divisions'
export const POST_DIVISION = 'divisions'
export const DELETE_DIVISION = 'divisions/'
export const UPDATE_DIVISION = 'divisions/'

export const GET_ALL_ORGANIZATIONS = 'organization'

// POSITION REQUEST
export const POST_PRF = 'prf'
export const GET_PRFLIST = 'prf'
export const GET_APPROVED_PRFLIST = 'prf/approved'
export const GET_PRF_DETAILS = 'prf/details/'
export const GET_PRF_TRAIL = 'prf-trail/'

// PLANTILLA
export const GET_PLANTILLA = 'plantilla'
export const GET_PLANTILLA_POSITION = 'plantilla/'
export const GET_PLANTILLA_POSITIONS = 'plantilla-positions'
export const POST_POSITION = 'plantilla-positions'

export const GET_EMPLOYEE_DETAILS_BY_PLANTILLA = 'employees/plantilla/'

// EMPLOYEE
export const POST_EMPLOYEE_ASSIGNMENT = 'employees'
export const GET_EMPLOYEES = 'employees'
export const GET_EMPLOYEE_PDS = 'pds/'

// OCCUPATIONS
export const GET_OCCUPATIONS = 'occupations'
export const GET_OCCUPATION = 'occupations/'
export const POST_OCCUPATION = 'occupations/'
export const PUT_OCCUPATION = 'occupations/'
export const DELETE_OCCUPATION = 'occupations/'

// OCCUPATIONAL GROUP
export const GET_OCCUPATIONAL_GROUP = 'occupational-group/'
export const GET_POSITIONS_WITHOUT_OCCUPATION =
  'plantilla-positions/without-occupation'
export const POST_POSITIONS_TO_OCCUPATION = 'occupational-group/'
export const DELETE_POSITIONS_TO_OCCUPATION = 'occupational-group/'

// SALARY GRADE
export const GET_SALARY_GRADE = 'salary-grade'

export const GET_PREVIOUS_SALARY_GRADE = 'salary-grade/previous'
export const GET_CURRENT_SALARY_GRADE = 'salary-grade/current'

export const POST_SALARY_GRADE = 'salary-grade/'

export const PUT_SALARY_GRADE = 'salary-grade/'
export const GET_SALARY_GRADE_STEP_INCREMENT = 'salary-grade/step-increment'
export const GET_SALARY_GRADE_STEP_INCREMENT_ONE =
  'salary-grade/step-increment/1'

// PDS
export const GET_PDS_LIST = 'pds/personal'

//OTP
export const POST_SEND_OTP = 'sms/globelabs/send/otp'
export const POST_VERIFY_OTP = 'sms/globelabs/verify/otp'

//PROFILE
export const POST_EDIT_JWT_PROFILE = 'post-jwt-profile'
export const POST_EDIT_PROFILE = 'post-fake-profile'

// COMPETENCY

export const GET_COMPETENCY_DOMAIN = 'domains'

export const COMPETENCY_MODEL = 'competency-model/'

export const GET_CORE_COMPETENCIES = 'competency-model/core'
export const GET_FUNCTIONAL_COMPETENCIES = 'competency-model/functions/'
export const GET_CROSSCUTTING_COMPETENCIES = 'competency-model/cross-cutting'
export const GET_MANAGERIAL_COMPETENCIES = 'competency-model/managerial'
export const GET_MODEL_KEY_ACTIONS = 'proficiency/'
export const GET_COMPETENCIES_OF_OCCUPATION = 'competency-model/functional/'

export const GET_AVAILABLE_FUNCTIONAL_COMPETENCIES = 'competency-model/'
export const POST_COMPETENCIES_FOR_OCCUPATION = 'competency-model-occupation/'
export const DELETE_COMPETENCIES_FOR_OCCUPATION = 'competency-model-occupation/'

export const GET_POSITION_COMPETENCY_PROFICIENCY_LEVELS =
  'competency-proficiency-level/single/'
export const GET_POSITION_FUNCTIONAL_COMPETENCY_PROFICIENCY_LEVELS =
  'competency-proficiency-level/single/functional/'
export const GET_POSITION_MANAGERIAL_COMPETENCY_PROFICIENCY_LEVELS =
  'competency-proficiency-level/single/managerial/'
export const GET_AVAILABLE_FUNCTIONAL_COMPETENCY_POOL_FOR_POSITION =
  'competency-proficiency-level/position/'

export const POST_ASSIGN_COMPETENCIES = 'competency-proficiency-level/'
export const DELETE_UNASSIGN_COMPETENCIES = 'competency-proficiency-level/'

export const PATCH_POSITION_COMPETENCY_PROFICIENCY_LEVELS =
  'competency-proficiency-level/'

// JOB DESCRIPTION
export const GET_POSITION_JOB_DESCRIPTION = 'plantilla/job-description/single/'
export const PATCH_POSITION_JOB_DESCRIPTION = 'plantilla-positions/'

// QUALIFICATION STANDARD
export const GET_QS_LIST = 'qualification-standards'
export const GET_POSITION_QUALIFICATION_STANDARD =
  'qualification-standards/single/'
export const PUT_POSITION_QUALIFICATION_STANDARD = 'qualification-standards/'

// DUTIES AND RESPONSIBILITIES
export const GET_POSITION_DUTIES = 'plantilla/duties/single/'
export const GET_DUTIES_RESPONSIBILITIES = 'duties-responsibilities'
export const POST_DUTY_RESPONSIBILITY = 'duties-responsibilities'
export const PUT_DUTY_RESPONSIBILITY = 'duties-responsibilities/' // with param and body
export const DELETE_DUTY_RESPONSIBILITY = 'duties-responsibilities/' // with param

export const GET_OCCUPATION_DUTIES_RESPONSIBILITIES =
  'occupation-duties-responsibilities/' // with param of occupation id
export const POST_ASSIGN_OCCUPATION_DUTIES_RESPONSIBILITIES =
  'occupation-duties-responsibilities/' // with param(occupation id) and body(duty & responsibility ids)
export const DELETE_UNASSIGN_OCCUPATION_DUTIES_RESPONSIBILITIES =
  'occupation-duties-responsibilities/' // without param. config.data(array of specified Occupation D&R ids)
export const GET_AVAILABLE_DUTIES_RESPONSIBILITIES =
  'occupation-duties-responsibilities/' // for drop-down selection

// Occupational duty and responsibility rework
export const POST_OCCUPATIONAL_DUTY_RESPONSIBILITY =
  'occupation-duties-responsibilities/occupation/' // with param of occupational group id
export const DELETE_OCCUPATIONAL_DUTY_RESPONSIBILITY =
  'occupation-duties-responsibilities/occupation/' // with param of occupational group id and body (occupational duty responsibility id and duty responsibility id)

//CALENDER
export const GET_EVENTS = 'events/'

// COMMITTEE
export const GET_COMMITTEES = 'committees'
export const POST_COMMITTEE = 'committees/'
export const PUT_COMMITTEE = 'committees/'
export const DELETE_COMMITTEE = 'committees/'

// COMMITTEE MEMBERS
export const GET_COMMITTEE_MEMBERS = 'committee-members/'
export const POST_ASSIGN_MEMBERS = 'committee-members'
export const DELETE_UNASSIGN_MEMBERS = 'committee-members'
export const GET_UNASSIGNED_EMPLOYEES = '/employees/not' // for drop-down selection

// PUBLICATIONS
export const PUBLICATIONS = 'vacant-position-postings/'
export const GET_PUBLICATIONS = 'publication/'
export const PUBLICATION_CALENDAR_EVENTS = 'schedules/calendar'
export const PUBLICATION_DOCUMENT_DETAILS = 'prf/'
export const PUBLICATION_APPLICANTS = 'psb-applicants/'
export const APPLICANTS_EXAM_SCORE = 'exam/'
export const APPLICANT_PSB_REMARKS = 'remarks/'

export const ITEM_NUMBERS_IN_PUBLICATION = 'positions/'

export const PSB_MEMBER = 'psb'
export const ASSIGNED_PSB_MEMBERS = '/psb'
export const UNASSIGNED_PSB_MEMBERS = '/non-psb'

export const APPLICANT_ENDORSEMENT = 'applicant-endorsement/'
export const SCHEDULE_EXAM_INTERVIEW = '/schedules'
export const APPOINTMENT_EFFECTIVITY = 'appointment-effectivity/'

export const PSB_DETAILS = 'psb-details/'
export const PSB_SUMMARY = 'interview-rating/'
export const SELECTED_BY_APPOINTING_AUTHORITY =
  'appointing-authority-selection/'
export const COMPETENCY_BASED_INTERVIEW_REPORT_HEADERS = '/competencies'

// APPLICANTS
export const GET_APPLICANT = 'applicant/'
export const GET_APPLICANT_PDS = 'pds/'
export const PATCH_APPLICANT_APPLICATION_STATUS = '/status/'

export const GET_APPLICANTS = 'applicants/'
export const QUALIFIED_APPLICANTS = 'applicants/'
export const PATCH_APPLICANTS_EXAM_SCORES = 'applicant/scores/'

export const ENDORSED_APPLICANTS = 'qualified/'
export const SHORTLISTED_APPLICANTS = 'shortlisted/'
export const HIRED_EXTERNAL_CONFIRMED_APPLICANTS =
  'confirmed/external/onboarding/all/'

export const HIRING_PROCESS_RESULTS = 'hiring-process-results/'

// OFFICER-IN-CHARGE
export const OFFICER_IN_CHARGE = 'officer-in-charge/'
export const SG24_UP_EMPLOYEES = 'qualified-employees/'
export const VACANT_MANAGERIAL_POSITIONS = 'oic-managerial-positions/'

// USERS
export const HRMS_USERS = 'users/'
export const USER_ROLES = 'user-roles/'
export const ASSIGNABLE_EMPLOYEES_FOR_HRMS = 'assignable/'

// DOCUMENTS
export const HRMS_REPORTS = 'reports/'

export const COMPETENCY_BASED_INTERVIEW = 'hrd002-3/'
export const RESULTS_OF_HIRING = 'hrd005-2/'
export const POSITION_DESCRIPTION_DBM_CSC_FORM_1 = 'position-description-form/'
export const REPORT_ON_APPOINTMENTS = 'csc-form-2/'
export const CERTIFICATION_OF_ASSUMPTION_TO_DUTY = 'csc-form-4/'
export const CERTIFICATE_OF_APPOINTMENT = 'csc-form-33-b/'

// MODULES
export const HRMS_MODULES = 'modules/'

// SYSTEM LOGS
export const SYSTEM_LOGS = 'user-logs/'

// VERSIONS
export const VERSION_2 = '/v2'

// SCHEDULES
export const SCHEDULES = 'schedules/dropdown/'

// TEMPORARY ASSIGNMENT
export const TEMPORARY_ASSIGNMENT = 'temporary-assignment/'
export const ASSIGNABLE_EMPLOYEE_FOR_TEMPORARY_ASSIGNMENT =
  'temporary-assignment/assignable/employee'

// REPORTS
export const EMPLOYEE_DETAILS_REPORT = 'employees/reports/detailed'

/* with params of the following:
 philhealth: boolean
 secondary_education: boolean
 pagibig: boolean
 company_id: boolean
 nature_of_appointment: boolean
 personal_details: boolean
 gsis: boolean
 vocational_education: boolean
 college_education: boolean
 sss: boolean
 tin: boolean
 vocational_course: boolean
 graduate_studies: boolean
 primary_education: boolean
 eligibility: boolean
 residential_address: boolean
 permanent_address: boolean
 */
