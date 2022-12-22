import React, { useState, useEffect } from "react"
import { NavItem, NavLink, TabContent, TabPane } from "reactstrap"
import { useSelector } from "react-redux"
import classnames from "classnames"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

// extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"

// Tab Components
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
  const [activeTab, setactiveTab] = useState(1)

  const {
    basicInfo,
    familyInfo,
    educationInfo,
    eligibilityInfo,
    workExperienceInfo,
    voluntaryWorkInfo,
    learningDevelopmentInfo,
    otherInfo,
    isLoading,
  } = useSelector(state => ({
    basicInfo: state.applicants.applicant.basicInfo,
    familyInfo: state.applicants.applicant.family,
    educationInfo: state.applicants.applicant.education,
    eligibilityInfo: state.applicants.applicant.eligibility,
    workExperienceInfo: state.applicants.applicant.workExperience,
    voluntaryWorkInfo: state.applicants.applicant.voluntaryWork,
    learningDevelopmentInfo: state.applicants.applicant.learningDevelopment,
    otherInfo: state.applicants.applicant.otherInfo,
    isLoading: state.applicants.loading.loadingApplicant,
  }))

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 8) {
        setactiveTab(tab)
      }
    }
  }

  const formatDate = assignedDate => {
    const date = new Date(assignedDate)
    return dayjs(date.toLocaleDateString()).format("MM/DD/YYYY")
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="vertical-wizard wizard clearfix vertical">
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
                    setactiveTab(1)
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
                    setactiveTab(2)
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
                    setactiveTab(3)
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
                    setactiveTab(4)
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
                    setactiveTab(5)
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
                    setactiveTab(6)
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
                    setactiveTab(7)
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
                    setactiveTab(8)
                  }}
                >
                  <span className="number">08</span>{" "}
                  <span>Other Information</span>
                </NavLink>
              </NavItem>
            </ul>
          </div>

          <div className="content clearfix">
            <TabContent
              activeTab={activeTab}
              className="twitter-bs-wizard-tab-content"
            >
              <TabPane tabId={1}>
                <PersonalInformationView
                  basicInfo={basicInfo}
                  formatDate={formatDate}
                />
              </TabPane>
              <TabPane tabId={2}>
                <FamilyBackgroundView
                  familyInfo={familyInfo}
                  formatDate={formatDate}
                />
              </TabPane>
              <TabPane tabId={3}>
                <EducationalBackgroundView educationInfo={educationInfo} />
              </TabPane>
              <TabPane tabId={4}>
                <EligibilityView
                  eligibilityInfo={eligibilityInfo}
                  formatDate={formatDate}
                />
              </TabPane>
              <TabPane tabId={5}>
                <WorkExperienceView
                  workExperienceInfo={workExperienceInfo}
                  formatDate={formatDate}
                />
              </TabPane>
              <TabPane tabId={6}>
                <VoluntaryWorkView
                  voluntaryWorkInfo={voluntaryWorkInfo}
                  formatDate={formatDate}
                />
              </TabPane>
              <TabPane tabId={7}>
                <LearningAndDevelopmentView
                  learningDevelopmentInfo={learningDevelopmentInfo}
                  formatDate={formatDate}
                />
              </TabPane>
              <TabPane tabId={8}>
                <OtherInformationView
                  otherInfo={otherInfo}
                  formatDate={formatDate}
                />
              </TabPane>
            </TabContent>
          </div>
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
