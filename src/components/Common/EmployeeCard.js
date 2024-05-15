import React from 'react'
import PropTypes from 'prop-types'
import EmployeeIcon from './EmployeeIcon'
import { Alert } from 'reactstrap'

const EmployeeCard = props => {
  const { width, height, name, employeeDetails } = props

  return (
    <>
      {employeeDetails.companyId &&
      employeeDetails.name &&
      employeeDetails.photoUrl ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            backgroundColor: 'white',
            padding: '1rem',
          }}
        >
          <div style={{ height: '100%' }}>
            <EmployeeIcon
              avatarUrl={employeeDetails.photoUrl}
              name={name}
              width={width}
              height={height}
            />
          </div>
          <div>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '1.25rem',
                marginBottom: 0,
              }}
            >
              {employeeDetails.name}
            </p>
            <p
              style={{
                fontSize: '1rem',
                marginBottom: 0,
              }}
            >
              {employeeDetails.companyId}
            </p>
            <p
              style={{
                fontSize: '1rem',
                marginBottom: 0,
              }}
            >
              {employeeDetails.natureOfAppointment.charAt(0).toUpperCase() +
                employeeDetails.natureOfAppointment.slice(1)}
            </p>
          </div>
        </div>
      ) : (
        <Alert
          color="warning"
          role="alert"
          style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            fontSize: '1rem',
          }}
        >
          UNFILLED POSITION
        </Alert>
      )}
    </>
  )
}

EmployeeCard.propTypes = {
  name: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  employeeDetails: PropTypes.object,
}

export default EmployeeCard
