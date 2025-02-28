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
  GET_EMPLOYEE_BASIC_INFO,
  GET_EMPLOYEE_BASIC_INFO_SUCCESS,
  GET_EMPLOYEE_BASIC_INFO_FAIL,
  UPDATE_EMPLOYEE_BASIC_INFO,
  UPDATE_EMPLOYEE_BASIC_INFO_SUCCESS,
  UPDATE_EMPLOYEE_BASIC_INFO_FAIL,
  RESET_RESPONSE_ON_UPDATE_BASIC_INFO,
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
  employeeBasicInformation: {
    employeeId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    nameExtension: '',
    titlePrefix: '',
    titleSuffix: '',
    sex: '',
    civilStatus: '',
    phoneNumber: '',
    email: '',
    birthday: '',
    dailyRate: '',
  },
  isLoading: false,
  error: null,
  response: {
    updateEmpBasicInfo: {},
    isLoading: false,
    error: null,
  },
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

    case GET_EMPLOYEE_DETAILS_REPORT:
      state = {
        ...state,
        isLoading: true,
        error: null,
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

    case GET_EMPLOYEE_BASIC_INFO:
      state = {
        ...state,
        isLoading: true,
        error: null,
        employeeBasicInformation: {
          ...state.employeeBasicInformation,
          employeeId: '',
          firstName: '',
          middleName: '',
          lastName: '',
          nameExtension: '',
          titlePrefix: '',
          titleSuffix: '',
          sex: '',
          civilStatus: '',
          phoneNumber: '',
          email: '',
          birthday: '',
          dailyRate: '',
        },
      }
      break
    case GET_EMPLOYEE_BASIC_INFO_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        employeeBasicInformation: {
          ...state.employeeBasicInformation,
          employeeId: action.payload.employeeId,
          firstName: action.payload.firstName,
          middleName: action.payload.middleName,
          lastName: action.payload.lastName,
          nameExtension: action.payload.nameExtension,
          titlePrefix: action.payload.titlePrefix,
          titleSuffix: action.payload.titleSuffix,
          sex: action.payload.sex,
          civilStatus: action.payload.civilStatus,
          phoneNumber: action.payload.phoneNumber,
          email: action.payload.email,
          birthday: action.payload.birthday,
          dailyRate: action.payload.dailyRate,
        },
      }
      break
    case GET_EMPLOYEE_BASIC_INFO_FAIL:
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

    case UPDATE_EMPLOYEE_BASIC_INFO:
      state = {
        ...state,
        response: {
          ...state.response,
          updateEmpBasicInfo: {},
          isLoading: true,
          error: null,
        },
      }
      break
    case UPDATE_EMPLOYEE_BASIC_INFO_SUCCESS:
      state = {
        ...state,
        response: {
          ...state.response,
          updateEmpBasicInfo: action.payload,
          isLoading: false,
        },
      }
      break
    case UPDATE_EMPLOYEE_BASIC_INFO_FAIL:
      state = {
        ...state,
        response: {
          ...state.response,
          isLoading: false,
          error: action.payload,
        },
      }
      break
    case RESET_RESPONSE_ON_UPDATE_BASIC_INFO:
      state = {
        ...state,
        response: {
          ...state.response,
          updateEmpBasicInfo: {},
          error: null,
        },
      }
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default employee
