import {
  REGISTER_PERMANENT_EMPLOYEE,
  REGISTER_PERMANENT_EMPLOYEE_SUCCESS,
  REGISTER_PERMANENT_EMPLOYEE_FAILED,
  REGISTER_CAS_JO_COS_EMPLOYEE,
  REGISTER_CAS_JO_COS_EMPLOYEE_SUCCESS,
  REGISTER_CAS_JO_COS_EMPLOYEE_FAILED,
  UPDATE_EMPLOYEE_BASIC_INFO,
  UPDATE_EMPLOYEE_BASIC_INFO_SUCCESS,
  UPDATE_EMPLOYEE_BASIC_INFO_FAIL,
  RESET_EMPLOYEE_RESPONSE_AND_ERROR,
  GET_EMPLOYEE_LIST,
  GET_EMPLOYEE_LIST_SUCCESS,
  GET_EMPLOYEE_LIST_FAILED,
  GET_EMPLOYEE_PDS,
  GET_EMPLOYEE_PDS_SUCCESS,
  GET_EMPLOYEE_PDS_FAILED,
  GET_EMPLOYEE_DETAILS_REPORT,
  GET_EMPLOYEE_DETAILS_REPORT_SUCCESS,
  GET_EMPLOYEE_DETAILS_REPORT_FAIL,
  GET_EMPLOYEE_BASIC_INFO,
  GET_EMPLOYEE_BASIC_INFO_SUCCESS,
  GET_EMPLOYEE_BASIC_INFO_FAIL,
  GET_EMPLOYEE_HEADER_INFO,
  GET_EMPLOYEE_HEADER_INFO_SUCCESS,
  GET_EMPLOYEE_HEADER_INFO_FAIL,
  RESET_EMPLOYEE_ERROR_LOG,
} from './actionTypes'

const INIT_STATE = {
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
  employeeHeaderInformation: {
    data: {},
    isLoading: false,
    error: null,
  },
  response: {
    updateEmpBasicInfo: {},
    addPermEmployee: {},
    addCasJoCosEmployee: {},
    isLoading: false,
    error: null,
  },
}

const employee = (state = INIT_STATE, action) => {
  switch (action.type) {
    case REGISTER_PERMANENT_EMPLOYEE:
      state = {
        ...state,
        response: {
          ...state.response,
          addPermEmployee: {},
          isLoading: true,
          error: null,
        },
      }
      break
    case REGISTER_PERMANENT_EMPLOYEE_SUCCESS:
      state = {
        ...state,
        response: {
          ...state.response,
          addPermEmployee: action.payload,
          isLoading: false,
        },
      }
      break
    case REGISTER_PERMANENT_EMPLOYEE_FAILED:
      state = {
        ...state,
        response: {
          ...state.response,
          isLoading: false,
          error: action.payload,
        },
      }
      break

    case REGISTER_CAS_JO_COS_EMPLOYEE:
      state = {
        ...state,
        response: {
          ...state.response,
          addCasJoCosEmployee: {},
          isLoading: true,
          error: null,
        },
      }
      break
    case REGISTER_CAS_JO_COS_EMPLOYEE_SUCCESS:
      state = {
        ...state,
        response: {
          ...state.response,
          addCasJoCosEmployee: action.payload,
          isLoading: false,
        },
      }
      break
    case REGISTER_CAS_JO_COS_EMPLOYEE_FAILED:
      state = {
        ...state,
        response: {
          ...state.response,
          isLoading: false,
          error: action.payload,
        },
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

    case RESET_EMPLOYEE_RESPONSE_AND_ERROR:
      state = {
        ...state,
        response: {
          ...state.response,
          updateEmpBasicInfo: {},
          addPermEmployee: {},
          addCasJoCosEmployee: {},
          error: null,
        },
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

    case GET_EMPLOYEE_HEADER_INFO:
      state = {
        ...state,
        employeeHeaderInformation: {
          ...state.employeeHeaderInformation,
          data: {},
          isLoading: true,
          error: null,
        },
      }
      break
    case GET_EMPLOYEE_HEADER_INFO_SUCCESS:
      state = {
        ...state,
        employeeHeaderInformation: {
          ...state.employeeHeaderInformation,
          data: action.payload,
          isLoading: false,
        },
      }
      break
    case GET_EMPLOYEE_HEADER_INFO_FAIL:
      state = {
        ...state,
        employeeHeaderInformation: {
          ...state.employeeHeaderInformation,
          isLoading: false,
          error: action.payload,
        },
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
