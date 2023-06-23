import React, { useEffect, useState } from "react"
import { isEmpty } from "lodash"
import { Can } from "casl/Can"
import { Navigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { fetchPositionDuties, fetchPlantillaPosition } from "store/actions"

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/components/table.scss"

const PositionDutiesResponsibilities = () => {
  const dispatch = useDispatch()
  const { plantillaId } = useParams()

  const [corePercentage, setCorePercentage] = useState(0)
  const [supportPercentage, setSupportPercentage] = useState(0)

  const {
    positionDutyResponsibilities,
    loadingPositionDuties,
    errorPositionDuties,
  } = useSelector(state => ({
    positionDutyResponsibilities:
      state.dutiesResponsibilities.response.positionDutyResponsibilities,
    loadingPositionDuties:
      state.dutiesResponsibilities.loading.loadingPositionDuties,
    errorPositionDuties: state.dutiesResponsibilities.error.errorPositionDuties,
  }))

  const { positionDetails, pdIsLoading, pdError } = useSelector(state => ({
    positionDetails: state.plantilla.plantillaPosition,
    pdIsLoading: state.plantilla.isLoading,
    pdError: state.plantilla.error,
  }))

  useEffect(() => {
    if (plantillaId) {
      dispatch(fetchPositionDuties(plantillaId))
      dispatch(fetchPlantillaPosition(plantillaId))
    }
  }, [dispatch])

  useEffect(() => {
    if (!isEmpty(positionDutyResponsibilities.duties.core)) {
      let totalPercent = 0
      positionDutyResponsibilities.duties.core.forEach(duty => {
        totalPercent = totalPercent + parseFloat(duty.percentage)
      })
      setCorePercentage(totalPercent)
    }

    if (!isEmpty(positionDutyResponsibilities.duties.support)) {
      let totalPercent = 0
      positionDutyResponsibilities.duties.support.forEach(duty => {
        totalPercent = totalPercent + parseFloat(duty.percentage)
      })
      setSupportPercentage(totalPercent)
    }
  }, [positionDutyResponsibilities])

  return (
    <React.Fragment>
      <Can I="access" this="Plantilla">
        <div className="page-content">
          <div className="container-fluid">
            {/* Notifications */}
            {errorPositionDuties ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorPositionDuties}
              />
            ) : null}
            {pdError ? (
              <ToastrNotification toastType={"error"} notifMessage={pdError} />
            ) : null}

            {loadingPositionDuties && pdIsLoading ? (
              <LoadingIndicator />
            ) : (
              <>
                <Breadcrumbs
                  title={positionDetails.itemNumber}
                  titleUrl={`/plantilla/permanent/${plantillaId}`}
                  breadcrumbItem="Duties and Responsibilities"
                  positionTitle={positionDetails.positionTitle}
                />

                <Container fluid={true}>
                  <Row>
                    <Col className="col-6">
                      <Card>
                        <CardBody>
                          <CardTitle>Core Functions</CardTitle>
                          <CardSubtitle className="mb-3">
                            {corePercentage}% out of 100% allocated
                          </CardSubtitle>

                          <div className="table-responsive">
                            <Table className="table mb-0">
                              <thead className="thead-light">
                                <tr>
                                  <th>Percentage</th>
                                  <th>Duty Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {!isEmpty(
                                  positionDutyResponsibilities.duties.core
                                ) ? (
                                  positionDutyResponsibilities.duties.core.map(
                                    (duty, i) => {
                                      return (
                                        <tr key={i}>
                                          <td>{duty.percentage}%</td>
                                          <td>{duty.description}</td>
                                        </tr>
                                      )
                                    }
                                  )
                                ) : (
                                  <tr>
                                    <td colSpan="2" className="ta-center">
                                      No Duties Assigned
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col className="col-6">
                      <Card>
                        <CardBody>
                          <CardTitle>Support Functions</CardTitle>
                          <CardSubtitle className="mb-3">
                            {supportPercentage}% out of 100% allocated
                          </CardSubtitle>

                          <div className="table-responsive">
                            <Table className="table mb-0">
                              <thead className="thead-light">
                                <tr>
                                  <th>Percentage</th>
                                  <th>Duty Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {!isEmpty(
                                  positionDutyResponsibilities.duties.support
                                ) ? (
                                  positionDutyResponsibilities.duties.support.map(
                                    (duty, i) => {
                                      return (
                                        <tr key={i}>
                                          <td>{duty.percentage}%</td>
                                          <td>{duty.description}</td>
                                        </tr>
                                      )
                                    }
                                  )
                                ) : (
                                  <tr>
                                    <td colSpan="2" className="ta-center">
                                      No Duties Assigned
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
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

export default PositionDutiesResponsibilities
