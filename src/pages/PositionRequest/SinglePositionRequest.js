import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { Can } from 'casl/Can'
import { Link, Navigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getSinglePRF, fetchPRFTrail } from 'store/actions'

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
} from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import Breadcrumbs from 'components/Common/Breadcrumb'
import PrfSignatory from 'components/Trail/PrfSignatory/PrfSignatory'

import 'flatpickr/dist/themes/material_blue.css'

const SinglePositionRequest = props => {
  const dispatch = useDispatch()
  const { prfId } = useParams()

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

  const formatDate = assignedDate => dayjs(assignedDate).format('MMMM DD, YYYY')

  const renderStatus = status => {
    if (status === 'Pending') {
      return (
        <Alert
          color="warning"
          role="alert"
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
        >
          {status}
        </Alert>
      )
    } else if (status === 'For Signing') {
      return (
        <Alert
          color="info"
          role="alert"
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
        >
          {status}
        </Alert>
      )
    } else if (status === 'Disapproved') {
      return (
        <Alert
          color="danger"
          role="alert"
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
        >
          {status}
        </Alert>
      )
    } else if (status === 'Approved') {
      return (
        <Alert
          color="success"
          role="alert"
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
        >
          {status}
        </Alert>
      )
    } else {
      return (
        <Alert
          color="info"
          role="alert"
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
        >
          {status}
        </Alert>
      )
    }
  }

  useEffect(() => {
    dispatch(getSinglePRF(prfId))
    dispatch(fetchPRFTrail(prfId))
  }, [dispatch])

  useEffect(() => {
    console.log(prfDetails)
  }, [prfDetails])

  return (
    <React.Fragment>
      <Can I="access" this="Prf_list">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Position Request List"
              titleUrl="/prf-list"
              breadcrumbItem="Position Request Details"
            />

            {/* Notifications */}
            {errorPrf ? (
              <ToastrNotification toastType={'error'} notifMessage={errorPrf} />
            ) : null}

            {errorPrfTrail ? (
              <ToastrNotification
                toastType={'error'}
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
                        {/* 
                        <div className="table-responsive">
                          <Table className="table-nowrap mb-0">
                            <tbody>
                              <tr>
                                <th scope="row">PRF No. :</th>
                                <td>{prfDetails.prfNo}</td>
                              </tr>
                              <tr>
                                <th scope="row">Date Requested :</th>
                                <td>{formatDate(prfDetails.dateRequested)}</td>
                              </tr>
                              <tr>
                                <th scope="row">With examination :</th>
                                <td>{prfDetails.withExam ? 'Yes' : 'No'}</td>
                              </tr>
                              <tr>
                                <th scope="row">For : </th>
                                <td>{prfDetails.for.name}</td>
                              </tr>
                              <tr>
                                <th scope="row">From : </th>
                                <td>{prfDetails.from.name}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div> */}

                        {/* <Col md={4}>
                              <Row>
                                <Col md={3}>
                                  <p>PRF No. :</p>
                                </Col>
                                <Col md={9}>
                                  <h5>{prfDetails.prfNo}</h5>
                                </Col>
                              </Row>
                            </Col> */}

                        <div className="p-2">
                          <Row>
                            <Col md={4}>
                              <div>
                                <p className="text-muted mb-1"> PRF No. :</p>
                                <h5 className="font-size-16 ps-3">
                                  {prfDetails.prfNo}
                                </h5>
                              </div>
                            </Col>

                            <Col md={4}>
                              <div>
                                <p className="text-muted mb-1">
                                  {' '}
                                  Date Requested :
                                </p>
                                <h5 className="font-size-16 ps-3">
                                  {formatDate(prfDetails.dateRequested)}
                                </h5>
                              </div>
                            </Col>

                            <Col md={4}>
                              <div>
                                <p className="text-muted mb-1">
                                  {' '}
                                  With examination :
                                </p>
                                <h5 className="font-size-16 ps-3">
                                  {prfDetails.withExam ? 'Yes' : 'No'}
                                </h5>
                              </div>
                            </Col>
                          </Row>

                          <hr></hr>

                          <Row>
                            <Col md={4}>
                              <div>
                                <p className="text-muted mb-1"> For :</p>
                                <h5 className="font-size-16 ps-3">
                                  {prfDetails.for.name}
                                </h5>
                              </div>
                            </Col>

                            <Col md={4}>
                              <div>
                                <p className="text-muted mb-1"> From :</p>
                                <h5 className="font-size-16 ps-3">
                                  {prfDetails.from.name}
                                </h5>
                              </div>
                            </Col>

                            {!isEmpty(prfDetails.disapprovedRemarks) ? (
                              <Col md={4}>
                                <div>
                                  <p className="text-muted mb-1">
                                    {' '}
                                    With examination :
                                  </p>
                                  <h5 className="font-size-16 ps-3">
                                    {prfDetails.disapprovedRemarks}
                                  </h5>
                                </div>
                              </Col>
                            ) : null}
                          </Row>
                        </div>
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {/* PRF Trail */}
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                    {loadingPrfTrail ? (
                      <LoadingIndicator />
                    ) : (
                      <PrfSignatory
                        prfTrail={prfTrail}
                        prfDetails={prfDetails}
                        formatDate={formatDate}
                      />
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              {/* Requested Positions */}
              <Col lg={6}>
                <Card>
                  <h5 className="card-header bg-transparent border-bottom">
                    Requested Positions
                  </h5>
                  <CardBody>
                    <Row className="mt-2">
                      {!isEmpty(prfDetails.prfPositions) ? (
                        <>
                          {prfDetails.prfPositions.map(position => (
                            <Col md={12} key={position.positionId}>
                              <Link
                                to={{
                                  pathname: `/plantilla/permanent/${position.positionId}`,
                                }}
                                className="text-dark"
                                target="_blank"
                              >
                                <Card
                                  outline
                                  color="primary"
                                  className="border"
                                >
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

              {/* Printables */}
              {prfDetails.status === 'Approved' ? (
                <Col lg={6}>
                  <Card>
                    <h5 className="card-header bg-transparent border-bottom">
                      Printable Files
                    </h5>
                    <CardBody>
                      <div className="table-responsive">
                        <Table className="table-nowrap align-middle table-hover mb-0">
                          <tbody>
                            {/* PRF PDF */}
                            <tr>
                              <td style={{ width: '45px' }}>
                                <div className="avatar-sm">
                                  <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-24">
                                    <i className="bx bxs-file-pdf" />
                                  </span>
                                </div>
                              </td>
                              <td>
                                <h5 className="font-size-14 mb-1">
                                  <Link
                                    to={{
                                      pathname: `/prf-pdf/${prfId}`,
                                    }}
                                    className="text-dark"
                                    target="_blank"
                                  >
                                    HRD-001-4
                                  </Link>
                                </h5>
                                <small> Position Request Form</small>
                              </td>
                              <td>
                                <div className="text-center">
                                  <Link
                                    to={{
                                      pathname: `/prf-pdf/${prfId}`,
                                    }}
                                    className="text-dark"
                                    target="_blank"
                                  >
                                    <i className="bx bx-download h3 m-0" />
                                  </Link>
                                </div>
                              </td>
                            </tr>

                            {/* PUBLICATION PDF */}
                            <tr>
                              <td style={{ width: '45px' }}>
                                <div className="avatar-sm">
                                  <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-24">
                                    <i className="bx bxs-file-pdf" />
                                  </span>
                                </div>
                              </td>
                              <td>
                                <h5 className="font-size-14 mb-1">
                                  <Link
                                    to={{
                                      pathname: `/publication-pdf/${prfId}`,
                                    }}
                                    className="text-dark"
                                    target="_blank"
                                  >
                                    CS Form No. 9
                                  </Link>
                                </h5>
                                <small>Publication</small>
                              </td>
                              <td>
                                <div className="text-center">
                                  <Link
                                    to={{
                                      pathname: `/publication-pdf/${prfId}`,
                                    }}
                                    className="text-dark"
                                    target="_blank"
                                  >
                                    <i className="bx bx-download h3 m-0" />
                                  </Link>
                                </div>
                              </td>
                            </tr>

                            {/* PD PDF */}
                            {prfDetails.prfPositions.map(position => (
                              <tr key={'_file_' + position.positionId}>
                                <td style={{ width: '45px' }}>
                                  <div className="avatar-sm">
                                    <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-24">
                                      <i className="bx bxs-file-pdf" />
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <h5 className="font-size-14 mb-1">
                                    <Link
                                      to={{
                                        pathname: `/position-description-pdf/${prfId}/${position.positionId}`,
                                      }}
                                      className="text-dark"
                                      target="_blank"
                                    >
                                      {position.itemNumber}
                                    </Link>
                                  </h5>
                                  <small>Position Description</small>
                                </td>
                                <td>
                                  <div className="text-center">
                                    <Link
                                      to={{
                                        pathname: `/position-description-pdf/${prfId}/${position.positionId}`,
                                      }}
                                      className="text-dark"
                                      target="_blank"
                                    >
                                      <i className="bx bx-download h3 m-0" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ) : null}
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Prf_list">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default SinglePositionRequest
