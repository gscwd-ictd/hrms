import React from 'react'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { Container } from 'reactstrap'
import { PDFViewer } from '@react-pdf/renderer'
import EmployeeDetailsDocument from './EmployeeDetailsDocument'

// Extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const EmployeeDetailsPdf = () => {
  const { employeeDetails, loadingEmployeeDetails, errorEmployeeDetails } =
    useSelector(state => ({
      employeeDetails: state.employee.employeeDetails,
      loadingEmployeeDetails: state.employee.isLoading,
      errorEmployeeDetails: state.employee.error,
    }))

  return (
    <React.Fragment>
      <Can I="access" this="Reports">
        <div className="page-content">
          <Container fluid={true}>
            {/* Notifications */}

            {errorEmployeeDetails ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorEmployeeDetails}
              />
            ) : null}

            {loadingEmployeeDetails ? (
              <LoadingIndicator />
            ) : (
              <PDFViewer width={'100%'} height={700} showToolbar>
                <EmployeeDetailsDocument employeeDetails={employeeDetails} />
              </PDFViewer>
            )}
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Reports">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default EmployeeDetailsPdf
