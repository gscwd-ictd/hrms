import 'flatpickr/dist/themes/material_blue.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchPlantillaPosition,
  resetJobDescriptionResponse,
  fetchEmployeeDetailsByPlantilla,
} from 'store/actions'
import { Can } from 'casl/Can'
import { Navigate, useLocation, useParams } from 'react-router-dom'

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Container,
  Row,
} from 'reactstrap'

// extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import Breadcrumbs from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import ViewPDModal from 'components/Modal/Plantilla/ViewPDModal'

import EmployeeCard from 'components/Common/EmployeeCard'

// styles
import 'styles/custom_gscwd/pages/positionprofile.scss'

const PositionProfile = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { plantillaId } = useParams()

  const { positionDetails, employeeDetails, isLoading, error } = useSelector(
    state => ({
      positionDetails: state.plantilla.plantillaPosition,
      employeeDetails: state.plantilla.employeeDetails,
      isLoading: state.plantilla.isLoading,
      error: state.plantilla.error,
    })
  )

  // View Position Description Document Modal
  const [showPDFPreview, setShowPDFPreview] = useState(false)
  const handleCloseModal = () => setShowPDFPreview(false)
  const handleShowModal = () => setShowPDFPreview(true)

  useEffect(() => {
    dispatch(fetchPlantillaPosition(plantillaId))
    dispatch(fetchEmployeeDetailsByPlantilla(plantillaId))
    dispatch(resetJobDescriptionResponse())
  }, [])

  return (
    <React.Fragment>
      <Can I="access" this="Plantilla">
        <div className="page-content">
          <div className="container-fluid">
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <>
                <Breadcrumbs
                  title="Plantilla"
                  titleUrl="/plantilla/permanent"
                  breadcrumbItem={positionDetails.itemNumber}
                  positionTitle={positionDetails.positionTitle}
                />

                {error ? (
                  <ToastrNotification
                    toastType={'error'}
                    notifMessage={error}
                  />
                ) : null}

                <Container fluid={true}>
                  <EmployeeCard
                    avatarUrl={employeeDetails.photoUrl}
                    name={employeeDetails.name}
                    width={100}
                    height={100}
                    positionId={plantillaId}
                    employeeDetails={employeeDetails}
                  />
                  <Row>
                    {/* Job Description */}
                    <Col lg={6}>
                      <Link
                        to={{
                          pathname: `${location.pathname}/job-description`,
                        }}
                      >
                        <Card className="d-flex flex-row text-dark">
                          <div className="ps-3 m-auto">
                            <i className="bx bx-file pp-grid-icon" />
                          </div>
                          <CardBody>
                            <CardTitle className="mb-2">
                              Job Description
                            </CardTitle>
                            <CardText>
                              Initial details of a plantilla position including
                              salary grade, step increment and summary.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>

                    {/* Duties and Responsibilities */}
                    <Col lg={6}>
                      <Link
                        to={{
                          pathname: `${location.pathname}/duties-and-responsibilities`,
                        }}
                      >
                        <Card className="d-flex flex-row text-dark">
                          <div className="ps-3 m-auto">
                            <i className="bx bx-detail pp-grid-icon" />
                          </div>
                          <CardBody>
                            <CardTitle className="mb-2">
                              Duties and Responsibilities
                            </CardTitle>
                            <CardText>
                              Core and Support duties of a position. Assigned by
                              the manager with percentage per duty.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>

                    {/* Qualification Standards */}
                    <Col lg={6}>
                      <Link
                        to={{
                          pathname: `${location.pathname}/qualification-standards`,
                        }}
                      >
                        <Card className="d-flex flex-row text-dark">
                          <div className="ps-3 m-auto">
                            <i className="bx bx-list-check pp-grid-icon" />
                          </div>
                          <CardBody>
                            <CardTitle className="mb-2">
                              Qualification Standards
                            </CardTitle>
                            <CardText>
                              The minimum requirements necessary to perform work
                              of a particular occupation successfully and
                              safely.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>

                    {/* Competencies */}
                    <Col lg={6}>
                      <Link
                        to={{
                          pathname: `${location.pathname}/competencies`,
                        }}
                      >
                        <Card className="d-flex flex-row text-dark">
                          <div className="ps-3 m-auto">
                            <i className="bx bx-bar-chart-square pp-grid-icon" />
                          </div>
                          <CardBody>
                            <CardTitle className="mb-2">Competencies</CardTitle>
                            <CardText>
                              The measurable or observable knowledge, skills,
                              abilities, and behaviors critical to successful
                              job performance.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>

                    {/* PDF Modal */}
                    <Col lg={6}>
                      <Link onClick={handleShowModal}>
                        <Card className="d-flex flex-row text-dark">
                          <div className="ps-3 m-auto">
                            <i className="bx bxs-file-pdf pp-grid-icon" />
                          </div>
                          <CardBody>
                            <CardTitle className="mb-2">PDF Preview</CardTitle>
                            <CardText>
                              Document preview of HRD-014-4 or Position
                              Description. (Signatory not included)
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>
                  </Row>
                </Container>

                <ViewPDModal
                  showPDFPreview={showPDFPreview}
                  plantillaId={plantillaId}
                  handleCloseModal={handleCloseModal}
                />
              </>
            )}
          </div>
        </div>
      </Can>

      <Can not I="access" this="Plantilla">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default PositionProfile
