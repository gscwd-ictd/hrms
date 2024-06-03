import { combineReducers } from 'redux'

// Front
import Layout from './layout/reducer'

// Authentication
import Login from './auth/login/reducer'
import Account from './auth/register/reducer'
import ForgetPassword from './auth/forgetpwd/reducer'
import Profile from './auth/profile/reducer'

//Dashboard
import Dashboard from './dashboard/reducer'

//Dashboard saas
import DashboardSaas from './dashboard-saas/reducer'

// organization structure
import departmentList from './organization-structure/department/reducer'
import divisionList from './organization-structure/division/reducer'
import officeList from './organization-structure/office/reducer'

// prf
import positionRequest from './prf/reducer'

// employee
import employee from './employee/reducer'

//plantilla
import plantilla from './plantilla/reducer'
import jobDescription from './job-description/reducer'

// duties and responsibilities
import dutiesResponsibilities from './duties-responsibilities/reducer'

// pds
import pds from './pds/reducer'

// qualification standards
import qualificationStandards from './qualification-standards/reducer'

// occupations
import Occupation from './occupations/reducer'

// salary grade
import salaryGrade from './salary-grade/reducer'

// competency
import occupationCompetencySet from './competency/occupation/reducer'
import positionCompetencySet from './competency/position/reducer'
import competencyModel from './competency/model/reducer'

//Calendar
import calendar from './calendar/reducer'

// Countries
import countries from './countries/reducer'

// Committee
import committee from './committee/reducer'

// Publication
import publications from './publication/reducer'

// Personnel Selection Board
import personnelSelectionBoard from './personnel-selection-board/reducer'

// Applicant
import applicants from './applicants/reducer'

// Officer-In-Charge
import officerInCharge from './officer-in-charge/reducer'

// Users
import users from './users/reducer'

// Modules
import modules from './modules/reducer'

// System Logs
import systemLogs from './system-logs/reducer'

// Schedules
import schedules from './schedules/reducer'

// Temporary Assignment
import temporaryAssignment from './temporary-assignment/reducer'

// TEST
// import otpService from "./test/otp/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Dashboard,
  DashboardSaas,
  officeList,
  departmentList,
  divisionList,
  positionRequest,
  employee,
  plantilla,
  jobDescription,
  dutiesResponsibilities,
  pds,
  qualificationStandards,
  Occupation,
  salaryGrade,
  occupationCompetencySet,
  positionCompetencySet,
  competencyModel,
  calendar,
  countries,
  committee,
  publications,
  personnelSelectionBoard,
  applicants,
  officerInCharge,
  users,
  modules,
  systemLogs,
  schedules,
  temporaryAssignment,
  // otpService,
})

export default rootReducer
