import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { fetchEmployeePds, resetEmployeeErrorLog } from "store/actions"

import { Row, Col, Card, CardBody, Container } from "reactstrap"
import Breadcrumb from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"
import PersonalDataSheet from "components/PersonalDataSheet/Employee"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"

const EmployeePds = props => {
  const dispatch = useDispatch()

  const { isLoading, error } = useSelector(state => ({
    error: state.employee.error,
    isLoading: state.employee.isLoading,
  }))

  useEffect(() => {
    dispatch(fetchEmployeePds(props.match.params.id))
  }, [dispatch])

  useEffect(() => {
    if (!isEmpty(error)) {
      dispatch(resetEmployeeErrorLog())
    }
  }, [error])

  return (
    <React.Fragment>
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
                    <PersonalDataSheet employeeId={props.match.params.id} />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

EmployeePds.propTypes = {
  match: PropTypes.object,
}

export default EmployeePds
