import React from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import { Row, Col } from 'reactstrap'
import OutlinedBox from 'components/OutlinedBox'

// style
import 'styles/custom_gscwd/components/personaldatasheet.scss'

const BasicInformationView = () => {
  const { employeeBasicInformation } = useSelector(state => ({
    employeeBasicInformation: state.employee.employeeBasicInformation,
  }))

  // Date formatter based on PDS document MM/DD/YYYY
  const formatDate = assignedDate => {
    if (!isEmpty(assignedDate)) {
      const date = new Date(assignedDate)
      return dayjs(date.toLocaleDateString()).format('MM/DD/YYYY')
    } else {
      return ''
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Row>
            <Col md={4} className="mt-3">
              <OutlinedBox
                label={'Last Name'}
                value={employeeBasicInformation.lastName || 'N/A'}
              />
            </Col>
            <Col md={4} className="mt-3">
              <OutlinedBox
                label={'First Name'}
                value={employeeBasicInformation.firstName || 'N/A'}
              />
            </Col>
            <Col md={4} className="mt-3">
              <OutlinedBox
                label={'Middle Name'}
                value={employeeBasicInformation.middleName || 'N/A'}
              />
            </Col>
            <Col md={4} className="mt-3">
              <OutlinedBox
                label={'Name Extension'}
                value={employeeBasicInformation.nameExtension || 'N/A'}
              />
            </Col>
            <Col md={4} className="mt-3">
              <OutlinedBox
                label={'Title Prefix'}
                value={employeeBasicInformation.titlePrefix || 'N/A'}
              />
            </Col>
            <Col md={4} className="mt-3">
              <OutlinedBox
                label={'Title Suffix'}
                value={employeeBasicInformation.titleSuffix || 'N/A'}
              />
            </Col>
          </Row>

          <hr className="my-4"></hr>

          <Row>
            <Col md={3} className="mt-3">
              <OutlinedBox
                label={'Date of Birth'}
                value={formatDate(employeeBasicInformation.birthday)}
              />
            </Col>

            <Col md={3} className="mt-3">
              <OutlinedBox
                label={'Sex'}
                value={employeeBasicInformation.sex || 'N/A'}
              />
            </Col>

            {!isEmpty(employeeBasicInformation.civilStatus) ? (
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={'Civil Status'}
                  value={employeeBasicInformation.civilStatus || 'N/A'}
                />
              </Col>
            ) : null}

            <Col md={3} className="mt-3">
              <OutlinedBox
                label={'Phone Number'}
                value={employeeBasicInformation.phoneNumber || 'N/A'}
              />
            </Col>

            <Col md={3} className="mt-3">
              <OutlinedBox
                label={'Email'}
                value={employeeBasicInformation.email || 'N/A'}
              />
            </Col>

            {!isEmpty(employeeBasicInformation.dailyRate) ? (
              <Col md={3} className="mt-3">
                <OutlinedBox
                  label={'Daily Rate'}
                  value={employeeBasicInformation.dailyRate || 'N/A'}
                />
              </Col>
            ) : null}
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default BasicInformationView
