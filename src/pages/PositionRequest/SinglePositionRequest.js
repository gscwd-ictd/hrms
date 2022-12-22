import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import dayjs from "dayjs"
import { isEmpty } from "lodash"

import { useDispatch, useSelector } from "react-redux"
import { getSinglePRF, fetchPRFTrail } from "store/actions"

import {
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Row,
  Table,
  Alert,
  Button,
} from "reactstrap"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"
import SimpleBar from "simplebar-react"
import Breadcrumbs from "components/Common/Breadcrumb"

import "flatpickr/dist/themes/material_blue.css"

const SinglePositionRequest = props => {
  const dispatch = useDispatch()

  // redux state for PRF details
  const { prfDetails, loadingPrf, errorPrf } = useSelector(state => ({
    prfDetails: state.positionRequest.prfDetails,
    loadingPrf: state.positionRequest.loading.loadingPrf,
    errorPrf: state.positionRequest.error.errorPrf,
  }))

  // redux state for PRF trail
  const { prfTrail, loadingPrfTrail, errorPrfTrail } = useSelector(state => ({
    prfTrail: state.positionRequest.prfTrail,
    loadingPrfTrail: state.positionRequest.loading.loadingPrfTrail,
    errorPrfTrail: state.positionRequest.error.errorPrfTrail,
  }))

  const formatDate = assignedDate => dayjs(assignedDate).format("MMMM DD, YYYY")

  const renderStatus = status => {
    if (status === "Pending") {
      return (
        <Alert
          color="warning"
          role="alert"
          style={{ textAlign: "center", textTransform: "uppercase" }}
        >
          {status}
        </Alert>
      )
    } else if (status === "For Signing") {
      return (
        <Alert
          color="info"
          role="alert"
          style={{ textAlign: "center", textTransform: "uppercase" }}
        >
          {status}
        </Alert>
      )
    } else if (status === "Disapproved") {
      return (
        <Alert
          color="danger"
          role="alert"
          style={{ textAlign: "center", textTransform: "uppercase" }}
        >
          {status}
        </Alert>
      )
    } else if (status === "Approved") {
      return (
        <Alert
          color="success"
          role="alert"
          style={{ textAlign: "center", textTransform: "uppercase" }}
        >
          {status}
        </Alert>
      )
    } else {
      return (
        <Alert
          color="info"
          role="alert"
          style={{ textAlign: "center", textTransform: "uppercase" }}
        >
          {status}
        </Alert>
      )
    }
  }

  useEffect(() => {
    dispatch(getSinglePRF(props.match.params.prfId))
    dispatch(fetchPRFTrail(props.match.params.prfId))
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Position Request List"
            titleUrl="/prf-list"
            breadcrumbItem="Position Request Details"
          />

          {/* Notifications */}
          {errorPrf ? (
            <ToastrNotification toastType={"error"} notifMessage={errorPrf} />
          ) : null}

          {errorPrfTrail ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorPrfTrail}
            />
          ) : null}

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {loadingPrf ? (
                    <LoadingIndicator />
                  ) : (
                    <>
                      {renderStatus(prfDetails.status)}

                      <div className="table-responsive ">
                        <Table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                              <td>
                                <span className="fw-medium">PRF No.: </span>
                                &nbsp;{prfDetails.prfNo}
                              </td>
                              <td>
                                <span className="fw-medium">
                                  Date Requested:{" "}
                                </span>
                                &nbsp;{formatDate(prfDetails.dateRequested)}
                              </td>
                              <td>
                                <span className="fw-medium">Date Needed: </span>
                                &nbsp;{formatDate(prfDetails.dateNeeded)}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span className="fw-medium">
                                  With examination:{" "}
                                </span>
                                &nbsp;{prfDetails.withExam ? "Yes" : "No"}
                              </td>
                              <td>
                                <span className="fw-medium">For: </span>
                                &nbsp;{prfDetails.for.name}
                              </td>
                              <td>
                                <span className="fw-medium">From: </span>
                                &nbsp;{prfDetails.from.name}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Requested Positions */}
          <Row>
            <Col lg={12}>
              <Card>
                <h5 className="card-header bg-transparent border-bottom">
                  Requested Positions
                </h5>
                <CardBody>
                  <Row className="mt-2">
                    {!isEmpty(prfDetails.prfPositions) ? (
                      <>
                        {prfDetails.prfPositions.map(position => (
                          <Col md={4} key={position.positionId}>
                            <Link
                              to={{
                                pathname: `/plantilla/${position.positionId}`,
                              }}
                              className="text-dark"
                              target="_blank"
                            >
                              <Card outline color="primary" className="border">
                                <CardBody>
                                  <h5 className="bg-transparent border-bottom pb-2">
                                    {position.positionTitle}
                                  </h5>
                                  <CardText className="mb-0">
                                    {position.itemNumber}
                                  </CardText>
                                  <CardText>{position.designation}</CardText>
                                </CardBody>
                              </Card>
                            </Link>
                          </Col>
                        ))}
                      </>
                    ) : null}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            {/* PRF Trail */}
            <Col md={7}>
              <Card>
                <h5 className="card-header bg-transparent border-bottom">
                  Trail
                </h5>
                <CardBody>
                  {loadingPrfTrail ? (
                    <LoadingIndicator />
                  ) : (
                    <SimpleBar style={{ maxHeight: "350px" }}>
                      <div className="mt-2">
                        <ul className="verti-timeline list-unstyled">
                          {/* Division */}

                          {prfTrail.division.status !== "N/A" ? (
                            <li
                              className={
                                prfTrail.division.status === "For approval"
                                  ? "event-list active"
                                  : "event-list"
                              }
                            >
                              <div className="event-timeline-dot">
                                <i
                                  className={
                                    prfTrail.division.status === "For approval"
                                      ? "bx bxs-right-arrow-circle font-size-18 bx-fade-right"
                                      : prfTrail.division.status === "Pending"
                                      ? "bx bx-right-arrow-circle font-size-18"
                                      : "bx bxs-right-arrow-circle font-size-18"
                                  }
                                ></i>
                              </div>
                              <div className="d-flex">
                                <div className="me-3">
                                  <h5 className="font-size-14">
                                    {formatDate(prfDetails.dateRequested)}

                                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i>
                                  </h5>
                                </div>
                                <div className="flex-grow-1">
                                  <div>
                                    <span className="font-weight-semibold">
                                      {prfTrail.division.name}
                                    </span>
                                    {" | "}
                                    {prfTrail.division.position}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ) : null}

                          {prfTrail.department.status !== "N/A" ? (
                            <li
                              className={
                                prfTrail.department.status === "For approval"
                                  ? "event-list active"
                                  : "event-list"
                              }
                            >
                              <div className="event-timeline-dot">
                                <i
                                  className={
                                    prfTrail.department.status ===
                                    "For approval"
                                      ? "bx bxs-right-arrow-circle font-size-18 bx-fade-right"
                                      : prfTrail.department.status === "Pending"
                                      ? "bx bx-right-arrow-circle font-size-18"
                                      : "bx bxs-right-arrow-circle font-size-18"
                                  }
                                ></i>
                              </div>
                              <div className="d-flex">
                                <div className="me-3">
                                  <h5 className="font-size-14">
                                    {prfTrail.department.updatedAt
                                      ? formatDate(
                                          prfTrail.department.updatedAt
                                        )
                                      : prfTrail.department.status ===
                                          "For approval" ||
                                        prfTrail.department.status === "Pending"
                                      ? "---"
                                      : formatDate(prfDetails.dateRequested)}

                                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i>
                                  </h5>
                                </div>
                                <div className="flex-grow-1">
                                  <div>
                                    <span className="font-weight-semibold">
                                      {prfTrail.department.name}
                                    </span>
                                    {" | "}
                                    {prfTrail.department.position}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ) : null}

                          {prfTrail.agm.status !== "N/A" ? (
                            <li
                              className={
                                prfTrail.agm.status === "For approval"
                                  ? "event-list active"
                                  : "event-list"
                              }
                            >
                              <div className="event-timeline-dot">
                                <i
                                  className={
                                    prfTrail.agm.status === "For approval"
                                      ? "bx bxs-right-arrow-circle font-size-18 bx-fade-right"
                                      : prfTrail.agm.status === "Pending"
                                      ? "bx bx-right-arrow-circle font-size-18"
                                      : "bx bxs-right-arrow-circle font-size-18"
                                  }
                                ></i>
                              </div>
                              <div className="d-flex">
                                <div className="me-3">
                                  <h5 className="font-size-14">
                                    {prfTrail.agm.updatedAt
                                      ? formatDate(prfTrail.agm.updatedAt)
                                      : prfTrail.agm.status ===
                                          "For approval" ||
                                        prfTrail.agm.status === "Pending"
                                      ? "---"
                                      : formatDate(prfDetails.dateRequested)}

                                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i>
                                  </h5>
                                </div>
                                <div className="flex-grow-1">
                                  <div>
                                    <span className="font-weight-semibold">
                                      {prfTrail.agm.name}
                                    </span>
                                    {" | "}
                                    {prfTrail.agm.position}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ) : null}

                          {prfTrail.admin.status !== "N/A" ? (
                            <li
                              className={
                                prfTrail.admin.status === "For approval"
                                  ? "event-list active"
                                  : "event-list"
                              }
                            >
                              <div className="event-timeline-dot">
                                <i
                                  className={
                                    prfTrail.admin.status === "For approval"
                                      ? "bx bxs-right-arrow-circle font-size-18 bx-fade-right"
                                      : prfTrail.admin.status === "Pending"
                                      ? "bx bx-right-arrow-circle font-size-18"
                                      : "bx bxs-right-arrow-circle font-size-18"
                                  }
                                ></i>
                              </div>
                              <div className="d-flex">
                                <div className="me-3">
                                  <h5 className="font-size-14">
                                    {prfTrail.admin.updatedAt
                                      ? formatDate(prfTrail.admin.updatedAt)
                                      : prfTrail.admin.status ===
                                          "For approval" ||
                                        prfTrail.admin.status === "Pending"
                                      ? "---"
                                      : formatDate(prfDetails.dateRequested)}

                                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i>
                                  </h5>
                                </div>
                                <div className="flex-grow-1">
                                  <div>
                                    <span className="font-weight-semibold">
                                      {prfTrail.admin.name}
                                    </span>
                                    {" | "}
                                    {prfTrail.admin.position}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ) : null}

                          {prfTrail.gm.status !== "N/A" ? (
                            <li
                              className={
                                prfTrail.gm.status === "For approval"
                                  ? "event-list active"
                                  : "event-list"
                              }
                            >
                              <div className="event-timeline-dot">
                                <i
                                  className={
                                    prfTrail.gm.status === "For approval"
                                      ? "bx bxs-right-arrow-circle font-size-18 bx-fade-right"
                                      : prfTrail.gm.status === "Pending"
                                      ? "bx bx-right-arrow-circle font-size-18"
                                      : "bx bxs-right-arrow-circle font-size-18"
                                  }
                                ></i>
                              </div>
                              <div className="d-flex">
                                <div className="me-3">
                                  <h5 className="font-size-14">
                                    {prfTrail.gm.updatedAt
                                      ? formatDate(prfTrail.gm.updatedAt)
                                      : prfTrail.gm.status === "For approval" ||
                                        prfTrail.gm.status === "Pending"
                                      ? "---"
                                      : formatDate(prfDetails.dateRequested)}

                                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i>
                                  </h5>
                                </div>
                                <div className="flex-grow-1">
                                  <div>
                                    <span className="font-weight-semibold">
                                      {prfTrail.gm.name}
                                    </span>
                                    {" | "}
                                    {prfTrail.gm.position}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    </SimpleBar>
                  )}
                </CardBody>
              </Card>
            </Col>

            {/* Printables */}
            {prfDetails.status === "Approved" ? (
              <Col md={5}>
                <Card>
                  <h5 className="card-header bg-transparent border-bottom">
                    Printables
                  </h5>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        <Row>
                          <Col md={6}>
                            <Link
                              to={{
                                pathname: `/prf-pdf/${props.match.params.prfId}`,
                              }}
                              target="_blank"
                            >
                              <Button
                                color="info"
                                className="btn-block"
                                style={{ width: "100%" }}
                              >
                                Position Request Form
                              </Button>
                            </Link>
                          </Col>
                          <Col md={6}>
                            <Link
                              to={{
                                pathname: `/publication-pdf/${props.match.params.prfId}`,
                              }}
                              target="_blank"
                            >
                              <Button
                                color="info"
                                className="btn-block"
                                style={{ width: "100%" }}
                              >
                                Publication
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                        <ul className="list-unstyled">
                          <li></li>

                          <li className="mt-3"></li>

                          <li className="mt-3">
                            <h6>Position Descriptions</h6>
                          </li>

                          {prfDetails.prfPositions.map(position => (
                            <li key={position.positionId} className="mt-1">
                              <Link
                                to={{
                                  pathname: `/position-description-pdf/${props.match.params.prfId}/${position.positionId}`,
                                }}
                                target="_blank"
                              >
                                <Button
                                  color="info"
                                  className="btn-block"
                                  style={{ width: "100%" }}
                                >
                                  {position.itemNumber}
                                </Button>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            ) : null}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

SinglePositionRequest.propTypes = {
  match: PropTypes.object,
}

export default SinglePositionRequest
