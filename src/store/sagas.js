import { all, fork } from "redux-saga/effects"

//public
// Front
import LayoutSaga from "./layout/saga"

// Authentication
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import SuperUserAuthSaga from "./auth/superuser-login/saga"

//Dashboard
import dashboardSaga from "./dashboard/saga"

//Dasboard saas
import dashboardSaasSaga from "./dashboard-saas/saga"

// organization structure
import officesSaga from "./organization-structure/office/saga"
import departmentsSaga from "./organization-structure/department/saga"
import divisionsSaga from "./organization-structure/division/saga"

// prf
import positionReqSaga from "./prf/saga"

// employee
import employeeSaga from "./employee/saga"

//plantilla
import plantillaSaga from "./plantilla/saga"
import jobDescriptionSaga from "./job-description/saga"

// duties and responsibilities
import dutiesResponsibilitiesSaga from "./duties-responsibilities/saga"

// pds
import pdsSaga from "./pds/saga"

// qualification standards
import qualificationStandardsSaga from "./qualification-standards/saga"

// occupations
import occupationsSaga from "./occupations/saga"

// salary grade
import salaryGradeSaga from "./salary-grade/saga"

// competency
import occupationalGroupCompetencySaga from "./competency/occupation/saga"
import positionCompetencySaga from "./competency/position/saga"
import competencyModelSaga from "./competency/model/saga"

// calendar
import calendarSaga from "./calendar/saga"

// Countries
import countriesSaga from "./countries/saga"

// Committee
import committeeSaga from "./committee/saga"

// Publication
import publicationsSaga from "./publication/saga"

// Personnel Selection Board
import personnelSelectionBoardSaga from "./personnel-selection-board/saga"

// Applicant
import applicantsSaga from "./applicants/saga"

// Officer-In-Charge
import officerInChargeSaga from "./officer-in-charge/saga"

// Users
import userSaga from "./users/saga"

// Modules
import moduleSaga from "./modules/saga"

// TEST
// import otpServiceSaga from "./test/otp/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(SuperUserAuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga),
    fork(officesSaga),
    fork(departmentsSaga),
    fork(divisionsSaga),
    fork(positionReqSaga),
    fork(employeeSaga),
    fork(plantillaSaga),
    fork(jobDescriptionSaga),
    fork(dutiesResponsibilitiesSaga),
    fork(pdsSaga),
    fork(qualificationStandardsSaga),
    fork(occupationsSaga),
    fork(salaryGradeSaga),
    fork(occupationalGroupCompetencySaga),
    fork(positionCompetencySaga),
    fork(competencyModelSaga),
    fork(calendarSaga),
    fork(countriesSaga),
    fork(committeeSaga),
    fork(publicationsSaga),
    fork(personnelSelectionBoardSaga),
    fork(applicantsSaga),
    fork(officerInChargeSaga),
    fork(userSaga),
    fork(moduleSaga),
    // fork(otpServiceSaga),
  ])
}
