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
  wes: [],
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
    positionDescriptionFormBasic: {
      appointmentType: '',
      directlySupervised: [],
      employmentPeriodFrom: '',
      employmentPeriodTo: '',
      immediateSupervisor: '',
      itemNumber: '',
      natureOfAppointment: '',
      psbDurationStartDate: '',
      publicationMode: '',
      supervisorNextHigher: '',
      toolsUsed: '',
      workStation: '',
    },
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
      requestingEntity: {
        employeeName: '',
        positionTitle: '',
      },
    },
  },
  hiredConfirmedApplicants: [],
  dbmCscForm33BAdditionalData: {
    basic: {
      itemNumber: '',
      immediateSupervisor: '',
      supervisorNextHigher: '',
      toolsUsed: '',
      workStation: '',
      appointmentType: '',
      publicationMode: '',
      directlySupervised: '',
      directlySupervisedItemNumbers: '',
    },
    contacts: {
      internal: {
        executiveIsOccasional: false,
        supervisorIsOccasional: false,
        nonSupervisorIsOccasional: false,
        staffIsOccasional: false,
      },
      external: {
        generalPublicIsOccasional: false,
        otherAgenciesIsOccasional: false,
        others: '',
      },
    },
    workingCondition: {
      isOfficeWork: false,
      isFieldWork: false,
      others: '',
    },
    certificateOfAppointment: {
      natureOfAppointment: '',
      vice: '',
      viceType: null,
      fieldPage: '',
      certifiedBy: '',
      psbDurationStartDate: '',
    },
  },
  response: {
    patchApplicantsScores: [],
    patchApplicantApplicationStatus: {},
    postDbmCscAdditionalDetails: {},
    patchDbmCscAdditionalDetails: {},
  },
  loading: {
    loadingApplicants: false,
    loadingQualifiedApplicants: false,
    loadingApplicant: false,
    laodingApplicantWes: false,
    loadingResponseApplicantsScores: false,
    loadingResponseApplicantApplicationStatus: false,
    loadingEndorsedApplicants: false,
    loadingShortlistedApplicants: false,
    loadingPostDbmCscAdditionalDetails: false,
    loadingDbmCscForm33BAdditionalData: false,
    loadingPatchDbmCscAdditionalDetails: false,
    loadingDbmCscPositionDescriptionForm: false,
    loadingRoHDocument: false,
    loadingRAIDocument: false,
    loadingCoAtDDocument: false,
    loadingCoADocument: false,
    loadingHiredConfirmedApplicants: false,
  },
  error: {
    errorApplicants: null,
    errorQualifiedApplicants: null,
    errorApplicant: null,
    errorApplicantWes: null,
    errorResponseApplicantsScores: null,
    errorApplicantApplicationStatus: null,
    errorEndorsedApplicants: null,
    errorShortlistedApplicants: null,
    errorPostDbmCscAdditionalDetails: null,
    errorDbmCscForm33BAdditionalData: null,
    errorPatchDbmCscAdditionalDetails: null,
    errorDbmCscPositionDescriptionForm: null,
    errorRoHDocument: null,
    errorRAIDocument: null,
    errorCoAtDDocument: null,
    errorCoADocument: null,
    errorHiredConfirmedApplicants: null,
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

    case GET_APPLICANT_WES:
      return {
        ...state,
        wes: [],
        loading: {
          ...state.loading,
          loadingApplicantWes: true,
        },
        error: {
          ...state.error,
          errorApplicantWes: null,
        },
      }
    case GET_APPLICANT_WES_SUCCESS:
      return {
        ...state,
        wes: action.payload,
        loading: {
          ...state.loading,
          loadingApplicantWes: false,
        },
      }
    case GET_APPLICANT_WES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingApplicantWes: false,
        },
        error: {
          ...state.error,
          errorApplicantWes: action.payload,
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
          positionDescriptionFormBasic: {
            ...state.dbmCscPositionDescriptionForm.positionDescriptionFormBasic,
            appointmentType: '',
            directlySupervised: [],
            employmentPeriodFrom: '',
            employmentPeriodTo: '',
            immediateSupervisor: '',
            itemNumber: '',
            natureOfAppointment: '',
            psbDurationStartDate: '',
            publicationMode: '',
            supervisorNextHigher: '',
            toolsUsed: '',
            workStation: '',
          },
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
            requestingEntity: {
              ...state.dbmCscPositionDescriptionForm.signatories
                .requestingEntity,
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
          positionDescriptionFormBasic: {
            ...state.dbmCscPositionDescriptionForm.positionDescriptionFormBasic,
            directlySupervised:
              action.payload.positionDescriptionFormBasic.directlySupervised,
            appointmentType:
              action.payload.positionDescriptionFormBasic.appointmentType,

            employmentPeriodFrom:
              action.payload.positionDescriptionFormBasic.employmentPeriodFrom,
            employmentPeriodTo:
              action.payload.positionDescriptionFormBasic.employmentPeriodTo,
            immediateSupervisor:
              action.payload.positionDescriptionFormBasic.immediateSupervisor,
            itemNumber: action.payload.positionDescriptionFormBasic.itemNumber,
            natureOfAppointment:
              action.payload.positionDescriptionFormBasic.natureOfAppointment,
            psbDurationStartDate:
              action.payload.positionDescriptionFormBasic.psbDurationStartDate,
            publicationMode:
              action.payload.positionDescriptionFormBasic.publicationMode,
            supervisorNextHigher:
              action.payload.positionDescriptionFormBasic.supervisorNextHigher,
            toolsUsed: action.payload.positionDescriptionFormBasic.toolsUsed,
            workStation:
              action.payload.positionDescriptionFormBasic.workStation,
          },

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
            requestingEntity: {
              ...state.dbmCscPositionDescriptionForm.signatories
                .requestingEntity,
              employeeName:
                action.payload.signatories.requestingEntity.employeeName,
              positionTitle:
                action.payload.signatories.requestingEntity.positionTitle,
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

    case GET_DBMCSC_FORM33B_DETAILS:
      return {
        ...state,
        dbmCscForm33BAdditionalData: {
          ...state.dbmCscForm33BAdditionalData,
          basic: {
            ...state.dbmCscForm33BAdditionalData.basic,
            itemNumber: '',
            immediateSupervisor: '',
            supervisorNextHigher: '',
            toolsUsed: '',
            workStation: '',
            appointmentType: '',
            publicationMode: '',
            directlySupervised: '',
            directlySupervisedItemNumbers: '',
          },
          contacts: {
            ...state.dbmCscForm33BAdditionalData.contacts,
            internal: {
              ...state.dbmCscForm33BAdditionalData.contacts.internal,
              executiveIsOccasional: false,
              supervisorIsOccasional: false,
              nonSupervisorIsOccasional: false,
              staffIsOccasional: false,
            },
            external: {
              ...state.dbmCscForm33BAdditionalData.contacts.external,
              generalPublicIsOccasional: false,
              otherAgenciesIsOccasional: false,
              others: '',
            },
          },
          workingCondition: {
            ...state.dbmCscForm33BAdditionalData.workingCondition,
            isOfficeWork: false,
            isFieldWork: false,
            others: '',
          },
          certificateOfAppointment: {
            ...state.dbmCscForm33BAdditionalData.certificateOfAppointment,
            natureOfAppointment: '',
            vice: '',
            viceType: null,
            fieldPage: '',
            certifiedBy: '',
            psbDurationStartDate: '',
          },
        },
        loading: {
          ...state.loading,
          loadingDbmCscForm33BAdditionalData: true,
        },
        error: {
          ...state.error,
          errorDbmCscForm33BAdditionalData: null,
        },
      }
    case GET_DBMCSC_FORM33B_DETAILS_SUCCESS:
      return {
        ...state,
        dbmCscForm33BAdditionalData: {
          ...state.dbmCscForm33BAdditionalData,
          basic: {
            ...state.dbmCscForm33BAdditionalData.basic,
            itemNumber: action.payload.basic.itemNumber,
            immediateSupervisor: action.payload.basic.immediateSupervisor,
            supervisorNextHigher: action.payload.basic.supervisorNextHigher,
            toolsUsed: action.payload.basic.toolsUsed,
            workStation: action.payload.basic.workStation,
            appointmentType: action.payload.basic.appointmentType,
            publicationMode: action.payload.basic.publicationMode,
            directlySupervised: action.payload.basic.directlySupervised,
            directlySupervisedItemNumbers:
              action.payload.basic.directlySupervisedItemNumbers,
          },
          contacts: {
            ...state.dbmCscForm33BAdditionalData.contacts,
            internal: {
              ...state.dbmCscForm33BAdditionalData.contacts.internal,
              executiveIsOccasional:
                action.payload.contacts.internal.executiveIsOccasional,
              supervisorIsOccasional:
                action.payload.contacts.internal.supervisorIsOccasional,
              nonSupervisorIsOccasional:
                action.payload.contacts.internal.nonSupervisorIsOccasional,
              staffIsOccasional:
                action.payload.contacts.internal.staffIsOccasional,
            },
            external: {
              ...state.dbmCscForm33BAdditionalData.contacts.external,
              generalPublicIsOccasional:
                action.payload.contacts.external.generalPublicIsOccasional,
              otherAgenciesIsOccasional:
                action.payload.contacts.external.otherAgenciesIsOccasional,
              others: action.payload.contacts.external.others,
            },
          },
          workingCondition: {
            ...state.dbmCscForm33BAdditionalData.workingCondition,
            isOfficeWork: action.payload.workingCondition.isOfficeWork,
            isFieldWork: action.payload.workingCondition.isFieldWork,
            others: action.payload.workingCondition.others,
          },
          certificateOfAppointment: {
            ...state.dbmCscForm33BAdditionalData.certificateOfAppointment,
            natureOfAppointment:
              action.payload.certificateOfAppointment.natureOfAppointment,
            vice: action.payload.certificateOfAppointment.vice,
            viceType: action.payload.certificateOfAppointment.viceType,
            fieldPage: action.payload.certificateOfAppointment.fieldPage,
            certifiedBy: action.payload.certificateOfAppointment.certifiedBy,
            psbDurationStartDate:
              action.payload.certificateOfAppointment.psbDurationStartDate,
          },
        },
        loading: {
          ...state.loading,
          loadingDbmCscForm33BAdditionalData: false,
        },
      }
    case GET_DBMCSC_FORM33B_DETAILS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingDbmCscForm33BAdditionalData: false,
        },
        error: {
          ...state.error,
          errorDbmCscForm33BAdditionalData: action.payload,
        },
      }

    case PATCH_DBMCSC_DETAILS:
      return {
        ...state,
        response: {
          ...state.response,
          patchDbmCscAdditionalDetails: {},
        },
        loading: {
          ...state.loading,
          loadingPatchDbmCscAdditionalDetails: true,
        },
        error: {
          ...state.error,
          errorPatchDbmCscAdditionalDetails: null,
        },
      }
    case PATCH_DBMCSC_DETAILS_SUCCESS:
      return {
        ...state,
        response: {
          ...state.response,
          patchDbmCscAdditionalDetails: action.payload,
        },
        loading: {
          ...state.loading,
          loadingPatchDbmCscAdditionalDetails: false,
        },
      }
    case PATCH_DBMCSC_DETAILS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingPatchDbmCscAdditionalDetails: false,
        },
        error: {
          ...state.error,
          errorPatchDbmCscAdditionalDetails: action.payload,
        },
      }

    case GET_HIRED_APPLICANTS:
      return {
        ...state,
        hiredConfirmedApplicants: [],
        loading: {
          ...state.loading,
          loadingHiredConfirmedApplicants: true,
        },
        error: {
          ...state.error,
          errorHiredConfirmedApplicants: null,
        },
      }
    case GET_HIRED_APPLICANTS_SUCCESS:
      return {
        ...state,
        hiredConfirmedApplicants: action.payload,
        loading: {
          ...state.loading,
          loadingHiredConfirmedApplicants: false,
        },
      }
    case GET_HIRED_APPLICANTS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadingHiredConfirmedApplicants: false,
        },
        error: {
          ...state.error,
          errorHiredConfirmedApplicants: action.payload,
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
          patchDbmCscAdditionalDetails: {},
        },
        error: {
          errorApplicants: null,
          errorQualifiedApplicants: null,
          errorApplicant: null,
          errorApplicantWes: null,
          errorResponseApplicantsScores: null,
          errorApplicantApplicationStatus: null,
          errorEndorsedApplicants: null,
          errorShortlistedApplicants: null,
          errorPostDbmCscAdditionalDetails: null,
          errorDbmCscForm33BAdditionalData: null,
          errorPatchDbmCscAdditionalDetails: null,
          errorDbmCscPositionDescriptionForm: null,
        },
      }
    default:
      return state
  }
}

export default applicants
