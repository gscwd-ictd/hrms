import "flatpickr/dist/themes/material_blue.css"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { fetchPlantillaPosition } from "store/actions"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Container,
  Row,
} from "reactstrap"

// extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import Breadcrumbs from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"

// styles
import "styles/custom_gscwd/pages/positionprofile.scss"

const PositionProfile = props => {
  const dispatch = useDispatch()

  const { positionDetails, isLoading, error } = useSelector(state => ({
    positionDetails: state.plantilla.plantillaPosition,
    isLoading: state.plantilla.isLoading,
    error: state.plantilla.error,
  }))

  useEffect(() => {
    dispatch(fetchPlantillaPosition(props.match.params.id))
  }, [dispatch])

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
                  titleUrl="/plantilla"
                  breadcrumbItem={positionDetails.itemNumber}
                  positionTitle={positionDetails.positionTitle}
                />

                {error ? (
                  <ToastrNotification
                    toastType={"error"}
                    notifMessage={error}
                  />
                ) : null}

                <Container fluid={true}>
                  <Row>
                    {/* Job Description */}
                    <Col lg={6}>
                      <Link
                        to={{
                          pathname: `${props.location.pathname}/job-description`,
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
                              Some quick example text to build on the card title
                              and make up the bulk of the card&quot;s content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>

                    {/* Duties and Responsibilities */}
                    <Col lg={6}>
                      <Link
                        to={{
                          pathname: `${props.location.pathname}/duties-and-responsibilities`,
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
                              Some quick example text to build on the card title
                              and make up the bulk of the card&quot;s content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>

                    {/* Qualification Standards */}
                    <Col lg={6}>
                      <Link
                        to={{
                          pathname: `${props.location.pathname}/qualification-standards`,
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
                              Some quick example text to build on the card title
                              and make up the bulk of the card&quot;s content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>

                    {/* Competencies */}
                    <Col lg={6}>
                      <Link
                        to={{
                          pathname: `${props.location.pathname}/competencies`,
                        }}
                      >
                        <Card className="d-flex flex-row text-dark">
                          <div className="ps-3 m-auto">
                            <i className="bx bx-bar-chart-square pp-grid-icon" />
                          </div>
                          <CardBody>
                            <CardTitle className="mb-2">Competencies</CardTitle>
                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card&quot;s content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </>
            )}
          </div>
        </div>
      </Can>

      <Can not I="access" this="Plantilla">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

PositionProfile.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
}

export default PositionProfile
