import {
  SUBMIT_EMPLOYEE_ASSIGN,
  SUBMIT_EMPLOYEE_ASSIGN_SUCCESS,
  SUBMIT_EMPLOYEE_ASSIGN_FAILED,
  GET_EMPLOYEE_LIST,
  GET_EMPLOYEE_LIST_SUCCESS,
  GET_EMPLOYEE_LIST_FAILED,
  GET_EMPLOYEE_PDS,
  GET_EMPLOYEE_PDS_SUCCESS,
  GET_EMPLOYEE_PDS_FAILED,
  RESET_EMPLOYEE_ASSIGN,
  RESET_EMPLOYEE_ERROR_LOG,
  GET_EMPLOYEE_DETAILS_REPORT,
  GET_EMPLOYEE_DETAILS_REPORT_SUCCESS,
  GET_EMPLOYEE_DETAILS_REPORT_FAIL,
} from './actionTypes'

const INIT_STATE = {
  empAssignmentRes: [],
  employeeListRes: [],
  pds: {
    personalInfo: {},
    permanentAddress: {},
    residentialAddress: {},
    governmentIssuedIds: {},
    spouse: {},
    parents: {},
    children: [],
    elementary: {},
    secondary: {},
    vocational: [],
    college: [],
    graduate: [],
    eligibility: [],
    workExperience: [],
    voluntaryWork: [],
    learningDevelopment: [],
    skills: [],
    recognitions: [],
    organizations: [],
    officeRelation: {},
    guiltyCharged: {},
    convicted: {},
    separatedService: {},
    candidateResigned: {},
    immigrant: {},
    indigenousPwdSoloParent: {},
    references: [],
    governmentIssuedId: {},
  },
  employeeDetails: [],
  isLoading: false,
  error: null,
}

const employee = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SUBMIT_EMPLOYEE_ASSIGN:
      state = {
        ...state,
        isLoading: true,
        error: null,
      }
      break
    case SUBMIT_EMPLOYEE_ASSIGN_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        empAssignmentRes: action.payload,
        error: null,
      }
      break
    case SUBMIT_EMPLOYEE_ASSIGN_FAILED:
      state = {
        ...state,
        empAssignmentRes: [],
        isLoading: false,
        error: action.payload,
      }
      break
    case RESET_EMPLOYEE_ASSIGN:
      state = {
        ...state,
        empAssignmentRes: [],
        error: null,
      }
      break

    case GET_EMPLOYEE_LIST:
      state = {
        ...state,
        isLoading: true,
        error: null,
      }
      break
    case GET_EMPLOYEE_LIST_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        employeeListRes: action.payload,
        error: null,
      }
      break
    case GET_EMPLOYEE_LIST_FAILED:
      state = {
        ...state,
        employeeListRes: [],
        isLoading: false,
        error: action.payload,
      }
      break

    case GET_EMPLOYEE_PDS:
      state = {
        ...state,
        isLoading: true,
        error: null,
        pds: {
          ...state.pds,
          personalInfo: {},
          permanentAddress: {},
          residentialAddress: {},
          governmentIssuedIds: {},
          spouse: {},
          parents: {},
          children: [],
          elementary: {},
          secondary: {},
          vocational: [],
          college: [],
          graduate: [],
          eligibility: [],
          workExperience: [],
          voluntaryWork: [],
          learningDevelopment: [],
          skills: [],
          recognitions: [],
          organizations: [],
          officeRelation: {},
          guiltyCharged: {},
          convicted: {},
          separatedService: {},
          candidateResigned: {},
          immigrant: {},
          indigenousPwdSoloParent: {},
          references: [],
          governmentIssuedId: {},
        },
      }
      break
    case GET_EMPLOYEE_PDS_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        pds: {
          ...state.pds,
          personalInfo: action.payload.personalInfo,
          permanentAddress: action.payload.permanentAddress,
          residentialAddress: action.payload.residentialAddress,
          governmentIssuedIds: action.payload.governmentIssuedIds,
          spouse: action.payload.spouse,
          parents: action.payload.parents,
          children: action.payload.children,
          elementary: action.payload.elementary,
          secondary: action.payload.secondary,
          vocational: action.payload.vocational,
          college: action.payload.college,
          graduate: action.payload.graduate,
          eligibility: action.payload.eligibility,
          workExperience: action.payload.workExperience,
          voluntaryWork: action.payload.voluntaryWork,
          learningDevelopment: action.payload.learningDevelopment,
          skills: action.payload.skills,
          recognitions: action.payload.recognitions,
          organizations: action.payload.organizations,
          officeRelation: action.payload.officeRelation,
          guiltyCharged: action.payload.guiltyCharged,
          convicted: action.payload.convicted,
          separatedService: action.payload.separatedService,
          candidateResigned: action.payload.candidateResigned,
          immigrant: action.payload.immigrant,
          indigenousPwdSoloParent: action.payload.indigenousPwdSoloParent,
          references: action.payload.references,
          governmentIssuedId: action.payload.governmentIssuedId,
        },
      }
      break
    case GET_EMPLOYEE_PDS_FAILED:
      state = {
        ...state,
        isLoading: false,
        error: action.payload,
      }
      break

    // employee details report
    case GET_EMPLOYEE_DETAILS_REPORT:
      state = {
        ...state,
        isLoading: true,
        employeeDetails: [],
      }
      break

    case GET_EMPLOYEE_DETAILS_REPORT_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        employeeDetails: action.payload,
      }
      break

    case GET_EMPLOYEE_DETAILS_REPORT_FAIL:
      state = {
        ...state,
        isLoading: false,
        error: action.payload,
      }
      break

    case RESET_EMPLOYEE_ERROR_LOG:
      state = {
        ...state,
        error: null,
      }
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default employee
