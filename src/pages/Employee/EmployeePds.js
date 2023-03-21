import React, { useEffect } from "react"
import { isEmpty } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { fetchEmployeePds, resetEmployeeErrorLog } from "store/actions"
import { Can } from "casl/Can"
import { Navigate, useParams } from "react-router-dom"

import { Row, Col, Card, CardBody, Container } from "reactstrap"
import Breadcrumb from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"
import PersonalDataSheet from "components/PersonalDataSheet/Employee"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"

const EmployeePds = () => {
  const dispatch = useDispatch()
  const { employeeId } = useParams()

  const { isLoading, error } = useSelector(state => ({
    error: state.employee.error,
    isLoading: state.employee.isLoading,
  }))

  useEffect(() => {
    dispatch(fetchEmployeePds(employeeId))
  }, [dispatch])

  useEffect(() => {
    if (!isEmpty(error)) {
      dispatch(resetEmployeeErrorLog())
    }
  }, [error])

  return (
    <React.Fragment>
      <Can I="access" this="Employees">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Employee"
              titleUrl="/employees"
              breadcrumbItem="Personal Data Sheet"
            />

            {error ? (
              <ToastrNotification toastType={"error"} notifMessage={error} />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {isLoading ? (
                      <LoadingIndicator />
                    ) : (
                      <PersonalDataSheet employeeId={employeeId} />
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Employees">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default EmployeePds
