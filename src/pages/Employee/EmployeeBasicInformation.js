import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmpHeaderInfo, fetchEmpBasicInfo } from 'store/actions'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'

import { Row, Col, Card, CardBody, Container } from 'reactstrap'
import Breadcrumb from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import BasicInformationView from 'components/PersonalDataSheet/Basic'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import EmployeeCard from 'components/Common/EmployeeCard'

const EmployeeBasicInformation = () => {
  const dispatch = useDispatch()
  const { employeeId } = useParams()

  const {
    loadingEmpBasicInfo,
    errorEmpBasicInfo,
    employeeHeaderInformation,
    loadingEmpHeaderInfo,
    errorEmpHeaderInfo,
  } = useSelector(state => ({
    loadingEmpBasicInfo: state.employee.isLoading,
    errorEmpBasicInfo: state.employee.error,

    employeeHeaderInformation: state.employee.employeeHeaderInformation.data,
    loadingEmpHeaderInfo: state.employee.employeeHeaderInformation.isLoading,
    errorEmpHeaderInfo: state.employee.employeeHeaderInformation.error,
  }))

  useEffect(() => {
    dispatch(fetchEmpHeaderInfo(employeeId))
    dispatch(fetchEmpBasicInfo(employeeId))
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Employees">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Employee"
              titleUrl="/employees"
              breadcrumbItem="Employee Basic Information"
            />

            {errorEmpBasicInfo ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorEmpBasicInfo}
              />
            ) : null}

            {errorEmpHeaderInfo ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorEmpHeaderInfo}
              />
            ) : null}

            {loadingEmpHeaderInfo ? (
              <LoadingIndicator />
            ) : (
              <EmployeeCard
                name={employeeHeaderInformation?.fullName}
                companyId={employeeHeaderInformation?.companyId}
                photoUrl={employeeHeaderInformation?.photoUrl}
                positionTitle={
                  employeeHeaderInformation?.assignment?.positionTitle
                }
                natureOfAppointment={employeeHeaderInformation?.userRole}
                width={100}
                height={100}
              />
            )}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {loadingEmpBasicInfo ? (
                      <LoadingIndicator />
                    ) : (
                      <BasicInformationView />
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

export default EmployeeBasicInformation
