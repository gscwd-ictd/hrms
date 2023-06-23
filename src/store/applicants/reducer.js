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
  GET_HIRED_EXTERNAL_APPLICANTS,
  GET_HIRED_EXTERNAL_APPLICANTS_SUCCESS,
  GET_HIRED_EXTERNAL_APPLICANTS_FAIL,
  RESET_APPLICANTS_RESPONSES,
} from './actionTypes'
import update from 'immutability-helper'

const INIT_STATE = {
  applicantList: [],
  qualifiedApplicantList: [],
  endorsedApplicantList: {
    requestingEntity: {
      name: '',
      position: '',
    },
    postingApplicants: [],
  },
  shortlistedApplicantList: [],
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
  resultsOfHiringDocument: {
    resultsOfHiring: [],
    signatories: {
      certifiedCorrectBy: {},
      approvedBy: {},
    },
  },
  reportOnAppointmentsIssued: {
    data: [],
    signatories: [],
  },
  certificationOfAssumptionToDuty: {
    data: {
      applicantName: '',
      positionTitle: '',
      placeOfAssignment: '',
      effectivityDate: {},
    },
    signatories: [],
  },
  certificateOfAppointment: {
    data: {},
    signatories: [],
  },
  dbmCscPositionDescriptionForm: {
    positionDetails: {},
    positionDescriptionFormBasic: {},
    contacts: {
      internal: {},
      external: {},
    },
    workingCondition: {},
    generalFunctionOfUnit: '',
    jobSummary: '',
    qualificationStandards: {},
    competencies: {
      core: [],
      functionalManagerial: [],
    },
    dutiesAndResponsibilities: {
      core: [],
      support: [],
    },
    signatories: {
      employee: '',
      hrdDepartmentManager: {
        employeeName: '',
        positionTitle: '',
      },
    },
  },
  hiredExternalConfirmedApplicants: [],
  response: {
    patchApplicantsScores: [],
    patchApplicantApplicationStatus: {},
    postDbmCscAdditionalDetails: {},
  },
  loading: {
    loadingApplicants: false,
    loadingQualifiedApplicants: false,
    loadingApplicant: false,
    loadingResponseApplicantsScores: false,
    loadingResponseApplicantApplicationStatus: false,
    loadingEndorsedApplicants: false,
    loadingShortlistedApplicants: false,
    loadingPostDbmCscAdditionalDetails: false,
    loadingDbmCscPositionDescriptionForm: false,
    loadingRoHDocument: false,
    loadingRAIDocument: false,
    loadingCoAtDDocument: false,
    loadingCoADocument: false,
    loadingHiredExternalConfirmedApplicants: false,
  },
  error: {
    errorApplicants: null,
    errorQualifiedApplicants: null,
    errorApplicant: null,
    errorResponseApplicantsScores: null,
    errorApplicantApplicationStatus: null,
    errorEndorsedApplicants: null,
    errorShortlistedApplicants: null,
    errorPostDbmCscAdditionalDetails: null,
    errorDbmCscPositionDescriptionForm: null,
    errorRoHDocument: null,
    errorRAIDocument: null,
    errorCoAtDDocument: null,
    errorCoADocument: null,
    errorHiredExternalConfirmedApplicants: null,
  },
}

const applicants = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_APPLICANTS:
      return {
        ...state,
        applicantList: [],
        loading: {
          ...state.loading,
          loadingApplicants: true,
        },
        error: {
          ...state.error,
          errorApplicants: null,
        },
      }
    case GET_APPLICANTS_SUCCESS:
      return {
        ...state,
        applicantList: action.payload,
        loading: {
          ...state.loading,
          loadingApplicants: false,
        },
      }
    case GET_APPLICANTS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingApplicants: false,
        },
        error: {
          ...state.error,
          errorApplicants: action.payload,
        },
      }

    case GET_QUALIFIED_APPLICANTS:
      return {
        ...state,
        qualifiedApplicantList: [],
        loading: {
          ...state.loading,
          loadingQualifiedApplicants: true,
        },
        error: {
          ...state.error,
          errorQualifiedApplicants: null,
        },
      }
    case GET_QUALIFIED_APPLICANTS_SUCCESS:
      return {
        ...state,
        qualifiedApplicantList: action.payload,
        loading: {
          ...state.loading,
          loadingQualifiedApplicants: false,
        },
      }
    case GET_QUALIFIED_APPLICANTS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingQualifiedApplicants: false,
        },
        error: {
          ...state.error,
          errorQualifiedApplicants: action.payload,
        },
      }

    case GET_ENDORSED_APPLICANTS:
      return {
        ...state,
        endorsedApplicantList: {
          ...state.endorsedApplicantList,
          requestingEntity: {
            ...state.endorsedApplicantList.requestingEntity,
            name: '',
            position: '',
          },
          postingApplicants: [],
        },
        loading: {
          ...state.loading,
          loadingEndorsedApplicants: true,
        },
        error: {
          ...state.error,
          errorEndorsedApplicants: null,
        },
      }
    case GET_ENDORSED_APPLICANTS_SUCCESS:
      return {
        ...state,
        endorsedApplicantList: {
          ...state.endorsedApplicantList,
          requestingEntity: {
            ...state.endorsedApplicantList.requestingEntity,
            name: action.payload.requestingEntity.name,
            position: action.payload.requestingEntity.position,
          },
          postingApplicants: action.payload.postingApplicants,
        },
        loading: {
          ...state.loading,
          loadingEndorsedApplicants: false,
        },
      }
    case GET_ENDORSED_APPLICANTS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingEndorsedApplicants: false,
        },
        error: {
          ...state.error,
          errorEndorsedApplicants: action.payload,
        },
      }

    case GET_SHORTLISTED_APPLICANTS:
      return {
        ...state,
        shortlistedApplicantList: [],
        loading: {
          ...state.loading,
          loadingShortlistedApplicants: true,
        },
        error: {
          ...state.error,
          errorShortlistedApplicants: null,
        },
      }
    case GET_SHORTLISTED_APPLICANTS_SUCCESS:
      return {
        ...state,
        shortlistedApplicantList: action.payload,
        loading: {
          ...state.loading,
          loadingShortlistedApplicants: false,
        },
      }
    case GET_SHORTLISTED_APPLICANTS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingShortlistedApplicants: false,
        },
        error: {
          ...state.error,
          errorShortlistedApplicants: action.payload,
        },
      }

    case UPDATE_QUALIFIED_APPLICANT_EXAM_SCORE: {
      return update(state, {
        qualifiedApplicantList: {
          [action.payload.index]: {
            examScore: { $set: action.payload.examScore },
          },
        },
      })
    }

    case UPDATE_QUALIFIED_APPLICANTS_EXAM_SCORES: {
      return {
        ...state,
        response: {
          patchApplicantsScores: [],
        },
        loading: {
          ...state.loading,
          loadingResponseApplicantsScores: true,
        },
        error: {
          ...state.error,
          errorResponseApplicantsScores: null,
        },
      }
    }
    case UPDATE_QUALIFIED_APPLICANTS_EXAM_SCORES_SUCCESS: {
      return {
        ...state,
        response: {
          ...state.response,
          patchApplicantsScores: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponseApplicantsScores: false,
        },
      }
    }
    case UPDATE_QUALIFIED_APPLICANTS_EXAM_SCORES_FAIL: {
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingResponseApplicantsScores: false,
        },
        error: {
          ...state.error,
          errorResponseApplicantsScores: action.payload,
        },
      }
    }

    case GET_APPLICANT_PDS:
      return {
        ...state,
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
        loading: {
          ...state.loading,
          loadingApplicant: true,
        },
        error: {
          ...state.error,
          errorApplicant: null,
        },
      }
    case GET_APPLICANT_PDS_SUCCESS:
      return {
        ...state,
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
        loading: {
          ...state.loading,
          loadingApplicant: false,
        },
      }
    case GET_APPLICANT_PDS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingApplicant: false,
        },
        error: {
          ...state.error,
          errorApplicant: action.payload,
        },
      }

    case UPDATE_APPLICANT_APPLICATION_STATUS:
      return {
        ...state,
        response: {
          ...state.response,
          patchApplicantApplicationStatus: {},
        },
        loading: {
          ...state.loading,
          loadingResponseApplicantApplicationStatus: true,
        },
        error: {
          ...state.error,
          errorApplicantApplicationStatus: null,
        },
      }
    case UPDATE_APPLICANT_APPLICATION_STATUS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          patchApplicantApplicationStatus: action.payload,
        },
        loading: {
          ...state.loading,
          loadingResponseApplicantApplicationStatus: false,
        },
      }
    case UPDATE_APPLICANT_APPLICATION_STATUS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingResponseApplicantApplicationStatus: false,
        },
        error: {
          ...state.error,
          errorApplicantApplicationStatus: action.payload,
        },
      }

    case GET_DOCUMENT_RESULTS_OF_HIRING:
      return {
        ...state,
        resultsOfHiringDocument: {
          ...state.resultsOfHiringDocument,
          resultsOfHiring: [],
          signatories: {
            certifiedCorrectBy: {},
            approvedBy: {},
          },
        },
        loading: {
          ...state.loading,
          loadingRoHDocument: true,
        },
        error: {
          ...state.error,
          errorRoHDocument: null,
        },
      }
    case GET_DOCUMENT_RESULTS_OF_HIRING_SUCCESS:
      return {
        ...state,
        resultsOfHiringDocument: {
          ...state.resultsOfHiringDocument,
          resultsOfHiring: action.payload.resultsOfHiring,
          signatories: {
            ...state.resultsOfHiringDocument.signatories,
            certifiedCorrectBy: action.payload.signatories.certifiedCorrectBy,
            approvedBy: action.payload.signatories.approvedBy,
          },
        },
        loading: {
          ...state.loading,
          loadingRoHDocument: false,
        },
      }
    case GET_DOCUMENT_RESULTS_OF_HIRING_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingRoHDocument: false,
        },
        error: {
          ...state.error,
          errorRoHDocument: action.payload,
        },
      }

    case GET_DOCUMENT_REPORT_ON_APPOINTMENTS_ISSUED:
      return {
        ...state,
        reportOnAppointmentsIssued: {
          ...state.reportOnAppointmentsIssued,
          data: [],
          signatories: [],
        },
        loading: {
          ...state.loading,
          loadingRAIDocument: true,
        },
        error: {
          ...state.error,
          errorRAIDocument: null,
        },
      }
    case GET_DOCUMENT_REPORT_ON_APPOINTMENTS_ISSUED_SUCCESS:
      return {
        ...state,
        reportOnAppointmentsIssued: {
          ...state.reportOnAppointmentsIssued,
          data: action.payload.data,
          signatories: action.payload.signatories,
        },
        loading: {
          ...state.loading,
          loadingRAIDocument: false,
        },
      }
    case GET_DOCUMENT_REPORT_ON_APPOINTMENTS_ISSUED_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingRAIDocument: false,
        },
        error: {
          ...state.error,
          errorRAIDocument: action.payload,
        },
      }

    case GET_DOCUMENT_CERTIFICATION_OF_ASSUMPTION_TO_DUTY: {
      return {
        ...state,
        certificationOfAssumptionToDuty: {
          ...state.certificationOfAssumptionToDuty,
          data: {
            applicantName: '',
            positionTitle: '',
            placeOfAssignment: '',
            effectivityDate: {},
          },
          signatories: [],
        },
        loading: {
          ...state.loading,
          loadingCoAtDDocument: true,
        },
        error: {
          ...state.error,
          errorCoAtDDocument: null,
        },
      }
    }
    case GET_DOCUMENT_CERTIFICATION_OF_ASSUMPTION_TO_DUTY_SUCCESS: {
      return {
        ...state,
        certificationOfAssumptionToDuty: {
          ...state.certificationOfAssumptionToDuty,
          data: {
            ...state.certificationOfAssumptionToDuty.data,
            applicantName: action.payload.data.applicantName,
            positionTitle: action.payload.data.positionTitle,
            placeOfAssignment: action.payload.data.placeOfAssignment,
            effectivityDate: action.payload.data.effectivityDate,
          },
          signatories: action.payload.signatories,
        },
        loading: {
          ...state.loading,
          loadingCoAtDDocument: false,
        },
      }
    }
    case GET_DOCUMENT_CERTIFICATION_OF_ASSUMPTION_TO_DUTY_FAIL: {
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingCoAtDDocument: false,
        },
        error: {
          ...state.error,
          errorCoAtDDocument: action.payload,
        },
      }
    }

    case GET_DOCUMENT_CERTIFICATE_OF_APPOINTMENT:
      return {
        ...state,
        certificateOfAppointment: {
          ...state.certificateOfAppointment,
          data: {},
          signatories: [],
        },
        loading: {
          ...state.loading,
          loadingCoADocument: true,
        },
        error: {
          ...state.error,
          errorCoADocument: null,
        },
      }
    case GET_DOCUMENT_CERTIFICATE_OF_APPOINTMENT_SUCCESS:
      return {
        ...state,
        certificateOfAppointment: {
          ...state.certificateOfAppointment,
          data: action.payload.data,
          signatories: action.payload.signatories,
        },
        loading: {
          ...state.loading,
          loadingCoADocument: false,
        },
      }
    case GET_DOCUMENT_CERTIFICATE_OF_APPOINTMENT_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingCoADocument: false,
        },
        error: {
          ...state.error,
          errorCoADocument: action.payload,
        },
      }

    case POST_DBMCSC_DETAILS:
      return {
        ...state,
        response: {
          ...state.response,
          postDbmCscAdditionalDetails: {},
        },
        loading: {
          ...state.loading,
          loadingPostDbmCscAdditionalDetails: true,
        },
        error: {
          ...state.error,
          errorPostDbmCscAdditionalDetails: null,
        },
      }
    case POST_DBMCSC_DETAILS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          postDbmCscAdditionalDetails: action.payload,
        },
        loading: {
          ...state.loading,
          loadingPostDbmCscAdditionalDetails: false,
        },
      }
    case POST_DBMCSC_DETAILS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPostDbmCscAdditionalDetails: false,
        },
        error: {
          ...state.error,
          errorPostDbmCscAdditionalDetails: action.payload,
        },
      }

    case GET_APPLICANT_DBMCSC_DETAILS:
      return {
        ...state,
        dbmCscPositionDescriptionForm: {
          ...state.dbmCscPositionDescriptionForm,
          positionDetails: {},
          positionDescriptionFormBasic: {},
          contacts: {
            ...state.dbmCscPositionDescriptionForm.contacts,
            internal: {},
            external: {},
          },
          workingCondition: {},
          generalFunctionOfUnit: '',
          jobSummary: '',
          qualificationStandards: {},
          competencies: {
            ...state.dbmCscPositionDescriptionForm.competencies,
            core: [],
            functionalManagerial: [],
          },
          dutiesAndResponsibilities: {
            ...state.dbmCscPositionDescriptionForm.dutiesAndResponsibilities,
            core: [],
            support: [],
          },
          signatories: {
            ...state.dbmCscPositionDescriptionForm.signatories,
            employee: '',
            hrdDepartmentManager: {
              ...state.dbmCscPositionDescriptionForm.signatories
                .hrdDepartmentManager,
              employeeName: '',
              positionTitle: '',
            },
          },
        },
        loading: {
          ...state.loading,
          loadingDbmCscPositionDescriptionForm: true,
        },
        error: {
          ...state.error,
          errorDbmCscPositionDescriptionForm: null,
        },
      }
    case GET_APPLICANT_DBMCSC_DETAILS_SUCCESS:
      return {
        ...state,
        dbmCscPositionDescriptionForm: {
          ...state.dbmCscPositionDescriptionForm,
          positionDetails: action.payload.positionDetails,
          positionDescriptionFormBasic:
            action.payload.positionDescriptionFormBasic,
          contacts: {
            ...state.dbmCscPositionDescriptionForm.contacts,
            internal: action.payload.contacts.internal,
            external: action.payload.contacts.external,
          },
          workingCondition: action.payload.workingCondition,
          generalFunctionOfUnit: action.payload.generalFunctionOfUnit,
          jobSummary: action.payload.jobSummary,
          qualificationStandards: action.payload.qualificationStandards,
          competencies: {
            ...state.dbmCscPositionDescriptionForm.competencies,
            core: action.payload.competencies.core,
            functionalManagerial:
              action.payload.competencies.functionalManagerial,
          },
          dutiesAndResponsibilities: {
            ...state.dbmCscPositionDescriptionForm.dutiesAndResponsibilities,
            core: action.payload.dutiesAndResponsibilities.core,
            support: action.payload.dutiesAndResponsibilities.support,
          },
          signatories: {
            ...state.dbmCscPositionDescriptionForm.signatories,
            employee: action.payload.signatories.employee,
            hrdDepartmentManager: {
              ...state.dbmCscPositionDescriptionForm.signatories
                .hrdDepartmentManager,
              employeeName:
                action.payload.signatories.hrdDepartmentManager.employeeName,
              positionTitle:
                action.payload.signatories.hrdDepartmentManager.positionTitle,
            },
          },
        },
        loading: {
          ...state.loading,
          loadingDbmCscPositionDescriptionForm: false,
        },
      }
    case GET_APPLICANT_DBMCSC_DETAILS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingDbmCscPositionDescriptionForm: false,
        },
        error: {
          ...state.error,
          errorDbmCscPositionDescriptionForm: action.payload,
        },
      }

    case GET_HIRED_EXTERNAL_APPLICANTS:
      return {
        ...state,
        hiredExternalConfirmedApplicants: [],
        loading: {
          ...state.loading,
          loadingHiredExternalConfirmedApplicants: true,
        },
        error: {
          ...state.error,
          errorHiredExternalConfirmedApplicants: null,
        },
      }
    case GET_HIRED_EXTERNAL_APPLICANTS_SUCCESS:
      return {
        ...state,
        hiredExternalConfirmedApplicants: action.payload,
        loading: {
          ...state.loading,
          loadingHiredExternalConfirmedApplicants: false,
        },
      }
    case GET_HIRED_EXTERNAL_APPLICANTS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingHiredExternalConfirmedApplicants: false,
        },
        error: {
          ...state.error,
          errorHiredExternalConfirmedApplicants: action.payload,
        },
      }

    case RESET_APPLICANTS_RESPONSES:
      return {
        ...state,
        response: {
          ...state.response,
          patchApplicantsScores: [],
          patchApplicantApplicationStatus: {},
          postDbmCscAdditionalDetails: {},
        },
        error: {
          errorApplicants: null,
          errorQualifiedApplicants: null,
          errorApplicant: null,
          errorResponseApplicantsScores: null,
          errorApplicantApplicationStatus: null,
          errorEndorsedApplicants: null,
          errorShortlistedApplicants: null,
          errorPostDbmCscAdditionalDetails: null,
          errorDbmCscPositionDescriptionForm: null,
        },
      }
    default:
      return state
  }
}

export default applicants
