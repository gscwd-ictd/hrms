import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "pages/Authentication/user-profile"

// Authentication related pages
import Login from "pages/Authentication/Login"
import Logout from "pages/Authentication/Logout"
import Register from "pages/Authentication/Register"
import ForgetPwd from "pages/Authentication/ForgetPassword"
import SuperAdminLogin from "pages/Authentication/SuperAdminLogin"
import SuperAdminLogout from "pages/Authentication/SuperAdminLogout"

// Dashboard
import Dashboard from "pages/Dashboard/index"

//Organization Structure
import Department from "pages/OrganizationStructure/Department"
import Division from "pages/OrganizationStructure/Division"
import Office from "pages/OrganizationStructure/Office"

// PRF
import PrfList from "pages/PositionRequest"
import PrfDetails from "pages/PositionRequest/SinglePositionRequest"

// Personnel
import PlantillaTable from "pages/Plantilla"
import PositionProfile from "pages/Plantilla/PositionProfile"
import PositionJobDescription from "pages/Plantilla/PositionProfile/JobDescription/PositionJobDescription"
import PositionDutiesResponsibilities from "pages/Plantilla/PositionProfile/DutiesResponsibilities/PositionDutiesResponsibilities"
import PositionQualificationStandards from "pages/Plantilla/PositionProfile/QualificationStandards/PositionQualificationStandards"
import PositionCompetencies from "pages/Plantilla/PositionProfile/Competency/PositionCompetencies"
import EmployeeList from "pages/Employee"
import EmployeeRegistration from "../pages/Employee/EmployeeRegistration"
import EmployeePds from "pages/Employee/EmployeePds"

// Qualification Standards
import QualificationStandards from "pages/QualificationStandards"

// Competency
import Competency from "pages/Competency"
import CompetenciesInOccupation from "pages/Competency/CompetenciesInOccupation"
import PositionsInOccupation from "pages/Competency/PositionsInOccupation"

// import Model from "pages/Competency/Model"
import CoreModels from "pages/Competency/Model/CoreModels"
import FunctionalModels from "pages/Competency/Model/FunctionalModels"
import CrossCuttingModels from "pages/Competency/Model/CrossCuttingModels"
import ManagerialModels from "pages/Competency/Model/ManagerialModels"

// Committee
import Committees from "pages/Committee"
import CommitteeMembers from "pages/Committee/CommitteeMembers"

// PersonnelSelection
import PersonnelSelection from "pages/PersonnelSelection"
import PublicationPositions from "pages/PersonnelSelection/PublicationPositions"

// Applicants
import Applicants from "pages/PersonnelSelection/Applicants/index"
import ApplicantDetails from "pages/PersonnelSelection/Applicants/ApplicantPds"

// PDF
import ApplicantPersonalDataSheetPdf from "pages/PdfCreator/ApplicantPersonalDataSheet"
import EmployeePersonalDataSheetPdf from "pages/PdfCreator/EmployeePersonalDataSheet"
import PositionRequestFormPdf from "pages/PdfCreator/PositionRequestForm"
import PositionDescriptionPdf from "pages/PdfCreator/PositionDescription"
import PublicationPdf from "pages/PdfCreator/Publication"
import SummaryRankingOfApplicantsPdf from "pages/PdfCreator/SummaryRankingOfApplicants"
import CompetencyBasedInterviewReportPdf from "pages/PdfCreator/CompetencyBasedInterviewReport"
import ResultsOfHiringPdf from "pages/PdfCreator/ResultsOfHiring"
import PositionDescriptionDbmCscPdf from "pages/PdfCreator/PositionDescriptionDbmCsc"
import ReportOnAppointmentsIssuedPdf from "pages/PdfCreator/ReportOnAppointmentsIssued"
import CertificationOfAssumptionToDutyPdf from "pages/PdfCreator/CertificationOfAssumptionToDuty"
import CertificateOfAppointmentPdf from "pages/PdfCreator/CertificateOfAppointment"

// Occupations
import Occupation from "pages/Occupation"
import OccupationalGroup from "pages/Occupation/OccupationalGroup"
import OccupationDuties from "pages/Occupation/OccupationDuties"

// Duties and Responsibilities
import Duties from "pages/Duties"

// Salary Grade
import SalaryGrade from "pages/SalaryGrade"

// Hiring Results
import HiringResults from "pages/HiringResults"

// Utility
import Page404 from "pages/Utility/pages-404"

// Settings
import OfficerInCharge from "pages/Settings/OfficerInCharge"
import Users from "pages/Settings/Users"
import Modules from "pages/Settings/Modules"

// System Logs
import SystemLogs from "pages/SystemLogs"

// Test Pages
// import TestLogin from 'pages/Test/test-login/TestLogin'
// import TwostepVerification from "pages/Test/Otp/auth-two-step-verification"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/profile", component: UserProfile },

  // Position Request
  { path: "/prf-list", component: PrfList },
  { path: "/prf-list/:prfId", component: PrfDetails },

  //Organization Structure
  { path: "/office", component: Office },
  { path: "/department", component: Department },
  { path: "/division", component: Division },

  // Personnel
  { path: "/employee-registration", component: EmployeeRegistration },
  { path: "/plantilla", component: PlantillaTable },
  { path: "/plantilla/:id", component: PositionProfile },
  { path: "/plantilla/:id/job-description", component: PositionJobDescription },
  {
    path: "/plantilla/:id/duties-and-responsibilities",
    component: PositionDutiesResponsibilities,
  },
  {
    path: "/plantilla/:id/qualification-standards",
    component: PositionQualificationStandards,
  },
  { path: "/plantilla/:id/competencies", component: PositionCompetencies },
  { path: "/employees", component: EmployeeList },
  { path: "/employees/:id", component: EmployeePds },

  // Qualification Standards
  {
    path: "/qualification-standards",
    component: QualificationStandards,
  },

  // Competency
  { path: "/competency", component: Competency },
  {
    path: "/competency/:occupationId/competencies",
    component: CompetenciesInOccupation,
  },
  {
    path: "/competency/:occupationId/positions",
    component: PositionsInOccupation,
  },
  { path: "/core-models", component: CoreModels },
  { path: "/functional-models", component: FunctionalModels },
  { path: "/cross-cutting-models", component: CrossCuttingModels },
  { path: "/managerial-models", component: ManagerialModels },

  // Committee
  { path: "/committees", component: Committees },
  { path: "/committees/:id", component: CommitteeMembers },

  // PersonnelSelection
  { path: "/personnel-selection", component: PersonnelSelection },
  {
    path: "/personnel-selection/publication-positions/:prfId",
    component: PublicationPositions,
  },

  // Applicants
  {
    path: "/personnel-selection/publication-positions/:prfId/publications/:publicationId/applicants",
    component: Applicants,
  },
  {
    path: "/personnel-selection/publication-positions/:prfId/publications/:publicationId/applicants/:applicantId/:isInternal",
    component: ApplicantDetails,
  },

  // Occupations
  { path: "/occupations", component: Occupation },
  {
    path: "/occupational-group/:occupationId",
    component: OccupationalGroup,
  },
  {
    path: "/occupation-duties/:occupationId",
    component: OccupationDuties,
  },

  // Duties & Responsibilities
  {
    path: "/duties-responsibilities",
    component: Duties,
  },

  // Salary Grade
  {
    path: "/salary-grade",
    component: SalaryGrade,
  },

  // PDF creator
  // {
  //   path: "/applicant-pds-pdf/:applicantId/:isInternal",
  //   component: ApplicantPersonalDataSheetPdf,
  // },
  {
    path: "/employee-pds-pdf/:employeeId",
    component: EmployeePersonalDataSheetPdf,
  },
  { path: "/prf-pdf/:prfId", component: PositionRequestFormPdf },
  {
    path: "/position-description-pdf/:prfId/:positionId",
    component: PositionDescriptionPdf,
  },
  { path: "/publication-pdf/:prfId", component: PublicationPdf },
  {
    path: "/summary-ranking-of-applicants-pdf/:vppId",
    component: SummaryRankingOfApplicantsPdf,
  },
  {
    path: "/competency-based-interview-report-pdf/:vppId",
    component: CompetencyBasedInterviewReportPdf,
  },
  {
    path: "/results-of-hiring-pdf/:appointmentEffectivityDate",
    component: ResultsOfHiringPdf,
  },
  {
    path: "/position-description-dbm-csc-form-no-1/:postingApplicantId",
    component: PositionDescriptionDbmCscPdf,
  },
  {
    path: "/report-on-appointments-issued-pdf/:yearMonth",
    component: ReportOnAppointmentsIssuedPdf,
  },
  {
    path: "/cs-form-no-4/:postingApplicantId",
    component: CertificationOfAssumptionToDutyPdf,
  },
  {
    path: "/cs-form-no-33-b/:postingApplicantId",
    component: CertificateOfAppointmentPdf,
  },

  // Hiring results
  { path: "/hiring-results", component: HiringResults },

  // Settings
  { path: "/settings/officer-in-charge", component: OfficerInCharge },
  { path: "/settings/users", component: Users },
  { path: "/settings/modules", component: Modules },

  // System Logs
  { path: "/settings/system-logs", component: SystemLogs },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  // SuperAdmin
  { path: "/admin-login", component: SuperAdminLogin },
  { path: "/admin-logout", component: SuperAdminLogout },

  //Utility Pages
  { path: "/page-404", component: Page404 },
]

export { publicRoutes, authProtectedRoutes }
