import React, { useState } from "react"
import { useSelector } from "react-redux"
import classnames from "classnames"
import dayjs from "dayjs"
import { isEmpty } from "lodash"
import { Link } from "react-router-dom"

import { NavItem, NavLink, TabContent, TabPane } from "reactstrap"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import PersonalInformationView from "./PersonalInformationView"
import FamilyBackgroundView from "./FamilyBackgroundView"
import EducationalBackgroundView from "./EducationalBackgroundView"
import EligibilityView from "./EligibilityView"
import WorkExperienceView from "./WorkExperienceView"
import VoluntaryWorkView from "./VoluntaryWorkView"
import LearningAndDevelopmentView from "./LearningAndDevelopmentView"
import OtherInformationView from "./OtherInformationView"

// style
import "styles/custom_gscwd/components/personaldatasheet.scss"

const PersonalDataSheetView = () => {
  const [activeTab, setActiveTab] = useState(1)

  // Redux state for applicant PDS
  const {
    personalInfo,
    permanentAddress,
    residentialAddress,
    governmentIssuedIds,
    spouse,
    parents,
    children,
    elementary,
    secondary,
    vocational,
    college,
    graduate,
    eligibility,
    workExperience,
    voluntaryWork,
    learningDevelopment,
    skills,
    recognitions,
    organizations,
    officeRelation,
    guiltyCharged,
    convicted,
    separatedService,
    candidateResigned,
    immigrant,
    indigenousPwdSoloParent,
    references,
    governmentIssuedId,
    isLoading,
  } = useSelector(state => ({
    personalInfo: state.applicants.pds.personalInfo,
    permanentAddress: state.applicants.pds.permanentAddress,
    residentialAddress: state.applicants.pds.residentialAddress,
    governmentIssuedIds: state.applicants.pds.governmentIssuedIds,
    spouse: state.applicants.pds.spouse,
    parents: state.applicants.pds.parents,
    children: state.applicants.pds.children,
    elementary: state.applicants.pds.elementary,
    secondary: state.applicants.pds.secondary,
    vocational: state.applicants.pds.vocational,
    college: state.applicants.pds.college,
    graduate: state.applicants.pds.graduate,
    eligibility: state.applicants.pds.eligibility,
    workExperience: state.applicants.pds.workExperience,
    voluntaryWork: state.applicants.pds.voluntaryWork,
    learningDevelopment: state.applicants.pds.learningDevelopment,
    skills: state.applicants.pds.skills,
    recognitions: state.applicants.pds.recognitions,
    organizations: state.applicants.pds.organizations,
    officeRelation: state.applicants.pds.officeRelation,
    guiltyCharged: state.applicants.pds.guiltyCharged,
    convicted: state.applicants.pds.convicted,
    separatedService: state.applicants.pds.separatedService,
    candidateResigned: state.applicants.pds.candidateResigned,
    immigrant: state.applicants.pds.immigrant,
    indigenousPwdSoloParent: state.applicants.pds.indigenousPwdSoloParent,
    references: state.applicants.pds.references,
    governmentIssuedId: state.applicants.pds.governmentIssuedId,
    isLoading: state.applicants.loading.loadingApplicant,
  }))

  // For toggling between tabs
  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 8) {
        setActiveTab(tab)
      }
    }
  }

  // Date formatter based on PDS document MM/DD/YYYY
  const formatDate = assignedDate => {
    if (!isEmpty(assignedDate)) {
      const date = new Date(assignedDate)
      return dayjs(date.toLocaleDateString()).format("MM/DD/YYYY")
    } else {
      return ""
    }
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="vertical-wizard wizard clearfix vertical">
          {/* Tab navigation */}
          <div className="steps clearfix">
            <ul>
              {/* Personal Information */}
              <NavItem
                className={classnames({
                  current: activeTab === 1,
                })}
              >
                <NavLink
                  className={classnames({ active: activeTab === 1 })}
                  onClick={() => {
                    setActiveTab(1)
                  }}
                >
                  <span className="number">01</span>{" "}
                  <span>Personal Information</span>
                </NavLink>
              </NavItem>

              {/* Family Background */}
              <NavItem
                className={classnames({
                  current: activeTab === 2,
                })}
              >
                <NavLink
                  className={classnames({ active: activeTab === 2 })}
                  onClick={() => {
                    setActiveTab(2)
                  }}
                >
                  <span className="number">02</span>{" "}
                  <span>Family Background</span>
                </NavLink>
              </NavItem>

              {/* Educational Background */}
              <NavItem
                className={classnames({
                  current: activeTab === 3,
                })}
              >
                <NavLink
                  className={classnames({ active: activeTab === 3 })}
                  onClick={() => {
                    setActiveTab(3)
                  }}
                >
                  <span className="number">03</span>{" "}
                  <span>Educational Background</span>
                </NavLink>
              </NavItem>

              {/* Eligibility */}
              <NavItem
                className={classnames({
                  current: activeTab === 4,
                })}
              >
                <NavLink
                  className={classnames({ active: activeTab === 4 })}
                  onClick={() => {
                    setActiveTab(4)
                  }}
                >
                  <span className="number">04</span> <span>Eligibility</span>
                </NavLink>
              </NavItem>

              {/* Work Experience */}
              <NavItem
                className={classnames({
                  current: activeTab === 5,
                })}
              >
                <NavLink
                  className={classnames({ active: activeTab === 5 })}
                  onClick={() => {
                    setActiveTab(5)
                  }}
                >
                  <span className="number">05</span>{" "}
                  <span>Work Experience</span>
                </NavLink>
              </NavItem>

              {/* Voluntary Work Or Involvement In Civic / Non-Government / People / Voluntary Organization/s */}
              <NavItem
                className={classnames({
                  current: activeTab === 6,
                })}
              >
                <NavLink
                  className={classnames({ active: activeTab === 6 })}
                  onClick={() => {
                    setActiveTab(6)
                  }}
                >
                  <span className="number">06</span> <span>Voluntary Work</span>
                </NavLink>
              </NavItem>

              {/* Learning And Development (L&D) Interventions/Training Programs Attended */}
              <NavItem
                className={classnames({
                  current: activeTab === 7,
                })}
              >
                <NavLink
                  className={classnames({ active: activeTab === 7 })}
                  onClick={() => {
                    setActiveTab(7)
                  }}
                >
                  <span className="number">07</span>{" "}
                  <span>Learning And Development</span>
                </NavLink>
              </NavItem>

              {/* Other Information */}
              <NavItem
                className={classnames({
                  current: activeTab === 8,
                })}
              >
                <NavLink
                  className={classnames({ active: activeTab === 8 })}
                  onClick={() => {
                    setActiveTab(8)
                  }}
                >
                  <span className="number">08</span>{" "}
                  <span>Other Information</span>
                </NavLink>
              </NavItem>

              {/* Assessment */}
              {/* <NavItem
                className={classnames({
                  current: activeTab === 9,
                })}
              >
                <NavLink
                  className={classnames({ active: activeTab === 9 })}
                  onClick={() => {
                    setActiveTab(9)
                  }}
                >
                  <span className="number">09</span> <span>Assessment</span>
                </NavLink>
              </NavItem> */}
            </ul>
          </div>

          {/* Tab content */}
          <div className="content clearfix">
            <TabContent
              activeTab={activeTab}
              className="twitter-bs-wizard-tab-content"
            >
              <TabPane tabId={1}>
                <PersonalInformationView
                  personalInfo={personalInfo}
                  permanentAddress={permanentAddress}
                  residentialAddress={residentialAddress}
                  governmentIssuedIds={governmentIssuedIds}
                  formatDate={formatDate}
                />
              </TabPane>

              <TabPane tabId={2}>
                <FamilyBackgroundView
                  spouse={spouse}
                  parents={parents}
                  childrenInfo={children}
                  formatDate={formatDate}
                />
              </TabPane>

              <TabPane tabId={3}>
                <EducationalBackgroundView
                  elementary={elementary}
                  secondary={secondary}
                  vocational={vocational}
                  college={college}
                  graduate={graduate}
                />
              </TabPane>

              <TabPane tabId={4}>
                <EligibilityView
                  eligibility={eligibility}
                  formatDate={formatDate}
                />
              </TabPane>

              <TabPane tabId={5}>
                <WorkExperienceView
                  workExperience={workExperience}
                  formatDate={formatDate}
                />
              </TabPane>

              <TabPane tabId={6}>
                <VoluntaryWorkView
                  voluntaryWork={voluntaryWork}
                  formatDate={formatDate}
                />
              </TabPane>

              <TabPane tabId={7}>
                <LearningAndDevelopmentView
                  learningDevelopment={learningDevelopment}
                  formatDate={formatDate}
                />
              </TabPane>

              <TabPane tabId={8}>
                <OtherInformationView
                  skills={skills}
                  recognitions={recognitions}
                  organizations={organizations}
                  officeRelation={officeRelation}
                  guiltyCharged={guiltyCharged}
                  convicted={convicted}
                  separatedService={separatedService}
                  candidateResigned={candidateResigned}
                  immigrant={immigrant}
                  indigenousPwdSoloParent={indigenousPwdSoloParent}
                  references={references}
                  governmentIssuedId={governmentIssuedId}
                  formatDate={formatDate}
                />
              </TabPane>
            </TabContent>
          </div>

          {/* Next and previous buttons */}
          <div className="actions clearfix">
            <ul>
              <li
                className={activeTab === 1 ? "previous disabled" : "previous"}
              >
                <Link
                  to="#"
                  onClick={() => {
                    toggleTab(activeTab - 1)
                  }}
                >
                  Previous
                </Link>
              </li>
              <li className={activeTab === 8 ? "next disabled" : "next"}>
                <Link
                  to="#"
                  onClick={() => {
                    toggleTab(activeTab + 1)
                  }}
                >
                  Next
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default PersonalDataSheetView
