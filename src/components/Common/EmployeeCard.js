import React from 'react'
import PropTypes from 'prop-types'
import EmployeeIcon from './EmployeeIcon'
import { Alert } from 'reactstrap'
import { isEmpty } from 'lodash'

const EmployeeCard = props => {
  const {
    width,
    height,
    name,
    companyId,
    photoUrl,
    positionTitle,
    natureOfAppointment,
  } = props

  const snakeCaseToCapitalize = text => {
    if (!isEmpty(text)) {
      return text
        .split('_')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
    } else {
      return
    }
  }

  return (
    <>
      {companyId && name ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1rem',
            backgroundColor: 'white',
            padding: '1rem',
          }}
        >
          <div style={{ height: '100%' }}>
            <EmployeeIcon
              avatarUrl={photoUrl}
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
              {name || ''}
            </p>
            <p
              style={{
                fontSize: '1rem',
                marginBottom: 0,
              }}
              className="fw-semibold"
            >
              {companyId || ''}
            </p>
            <p
              style={{
                fontSize: '1rem',
                marginBottom: 0,
              }}
            >
              {positionTitle || ''}
            </p>
            <p
              style={{
                fontSize: '1rem',
                marginBottom: 0,
              }}
              className="text-capitalize"
            >
              {snakeCaseToCapitalize(natureOfAppointment) || ''}
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

EmployeeCard.defaultProps = {
  name: '',
  companyId: '',
  photoUrl: '',
  positionTitle: '',
  natureOfAppointment: '',
}

EmployeeCard.propTypes = {
  name: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  companyId: PropTypes.string,
  photoUrl: PropTypes.string,
  positionTitle: PropTypes.string,
  natureOfAppointment: PropTypes.string,
}

export default EmployeeCard
