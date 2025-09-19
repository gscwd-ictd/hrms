import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { NavItem, NavLink, TabContent, TabPane, Row, Col } from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import OutlinedBox from 'components/OutlinedBox'

// style
import 'styles/custom_gscwd/components/personaldatasheet.scss'

const WorkExperienceSheetView = () => {
  const [activeTab, setActiveTab] = useState(1)

  // Redux state for applicant PDS
  const { applicantWes, isLoading } = useSelector(state => ({
    applicantWes: state.applicants.wes,
    isLoading: state.applicants.loading.laodingApplicantWes,
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
      return dayjs(date.toLocaleDateString()).format('DD/MM/YYYY')
    } else {
      return ''
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
              {applicantWes.map((wes, index) => (
                <NavItem
                  className={classnames({
                    current: activeTab === index + 1,
                  })}
                  key={index}
                >
                  <NavLink
                    className={classnames({ active: activeTab === index + 1 })}
                    onClick={() => {
                      setActiveTab(index + 1)
                    }}
                  >
                    <span className="number">0{index + 1}</span>{' '}
                    <span>{wes.positionTitle}</span>
                  </NavLink>
                </NavItem>
              ))}
            </ul>
          </div>

          {/* Tab content */}
          <div className="content clearfix">
            <TabContent
              activeTab={activeTab}
              className="twitter-bs-wizard-tab-content"
            >
              {applicantWes.map((wes, index) => (
                <TabPane tabId={index + 1} key={index}>
                  <Row>
                    <Col md={6} className="mt-3">
                      <OutlinedBox
                        label={'Position Title'}
                        value={wes.positionTitle || 'N/A'}
                      />
                    </Col>
                    <Col md={6} className="mt-3">
                      <OutlinedBox
                        label={'Company Name'}
                        value={wes.companyName || 'N/A'}
                      />
                    </Col>

                    <Col md={6} className="mt-3">
                      <OutlinedBox
                        label={'Office/Department/Division'}
                        value={wes.office || 'N/A'}
                      />
                    </Col>
                    <Col md={6} className="mt-3">
                      <OutlinedBox
                        label={'Supervisor'}
                        value={wes.supervisor || 'N/A'}
                      />
                    </Col>

                    <Col md={6} className="mt-3">
                      <OutlinedBox
                        label={'From'}
                        value={formatDate(wes.from) || 'N/A'}
                      />
                    </Col>
                    <Col md={6} className="mt-3">
                      <OutlinedBox
                        label={'To'}
                        value={formatDate(wes.to) || 'PRESENT'}
                      />
                    </Col>

                    <Col md={4} className="mt-3">
                      <OutlinedBox
                        label={`Gov't Service?`}
                        value={wes.isGovernmentService === true ? 'YES' : 'NO'}
                      />
                    </Col>
                    <Col md={4} className="mt-3">
                      <OutlinedBox
                        label={'Appointment'}
                        value={wes.appointmentStatus || 'N/A'}
                      />
                    </Col>
                    <Col md={4} className="mt-3">
                      <OutlinedBox
                        label={'To'}
                        value={wes.monthlySalary || 'N/A'}
                      />
                    </Col>
                  </Row>

                  <hr className="my-4"></hr>

                  <h5>Accomplishment</h5>
                  {wes.accomplishments.map((accomp, aidx) => (
                    <Row className="mt-2" key={aidx}>
                      <Col md={12} className="mt-3">
                        <OutlinedBox
                          label={`${aidx + 1}`}
                          value={accomp.accomplishment || 'N/A'}
                        />
                      </Col>
                    </Row>
                  ))}

                  <hr className="my-4"></hr>

                  <h5>Duties</h5>
                  {wes.duties.map((duty, didx) => (
                    <Row className="mt-2" key={didx}>
                      <Col md={12} className="mt-3">
                        <OutlinedBox
                          label={`${didx + 1}`}
                          value={duty.duty || 'N/A'}
                        />
                      </Col>
                    </Row>
                  ))}
                </TabPane>
              ))}
            </TabContent>
          </div>

          {/* Next and previous buttons */}
          <div className="actions clearfix">
            <ul>
              <li
                className={activeTab === 1 ? 'previous disabled' : 'previous'}
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
              <li className={activeTab === 8 ? 'next disabled' : 'next'}>
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

export default WorkExperienceSheetView
