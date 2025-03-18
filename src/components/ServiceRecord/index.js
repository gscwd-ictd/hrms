import React, { useMemo, useState } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { isEmpty } from 'lodash'
import { dateFormatter } from 'functions/DateFormatter'
import TableBase from 'components/Table/TableBase'
import InRowAction from 'components/InRowAction/InRowAction'
import NosiModal from 'components/Modal/ServiceRecord/NosiModal'
import { useSelector } from 'react-redux'
import EmployeeSeparationModal from 'components/Modal/ServiceRecord/EmployeeSeparationModal'

const ServiceRecord = () => {
  const { serviceRecords, workExperience } = useSelector(state => ({
    serviceRecords: state.serviceRecord.serviceRecords,

    // temporary only
    workExperience: state.employee.pds.workExperience,
  }))

  const tableColumns = [
    {
      Header: 'ID',
      accessor: '_id',
      disableGlobalFilter: true,
    },
    {
      Header: 'From',
      accessor: 'from',
      Cell: cell => {
        return <p>{dateFormatter(cell.value, 'MM/DD/YYYY')}</p>
      },
    },
    {
      Header: 'To',
      accessor: 'to',
      Cell: cell => {
        return <p>{dateFormatter(cell.value, 'MM/DD/YYYY') || 'PRESENT'}</p>
      },
    },
    {
      Header: 'Position Title',
      accessor: 'positionTitle',
    },
    {
      Header: 'Monthly Salary',
      accessor: 'monthlySalary',
      Cell: cell => {
        return <p>₱ {cell.value}</p>
      },
    },
    {
      Header: 'SG and SI',
      accessor: 'salaryGrade',
      Cell: cell => {
        return <p>{cell.value || 'N/A'}</p>
      },
    },
    {
      Header: 'Appointment',
      accessor: 'appointmentStatus',
    },
    {
      Header: `Is Gov't Service?`,
      accessor: 'isGovernmentService',
      Cell: cell => {
        return <p>{cell.value ? 'Yes' : 'No'}</p>
      },
    },
  ]

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => workExperience, [workExperience])

  /**
   * Modal
   */
  // const [modalData, setModalData] = useState({})

  // Employee Separation Modal
  const [showEmpSeparation, setShowEmpSeparation] = useState(false)
  const toggleEmpSeparation = () => setShowEmpSeparation(!showEmpSeparation)

  return (
    <React.Fragment>
      <Row>
        <Col>
          <div className="form-group d-flex justify-content-end mb-4">
            <Button
              onClick={toggleEmpSeparation}
              className="btn btn-danger waves-effect waves-light"
            >
              <i className="fas fa-user-times"></i>&nbsp; Employee Separation
            </Button>
          </div>

          <TableBase columns={columns} data={data} />
        </Col>
      </Row>

      <EmployeeSeparationModal
        isOpen={showEmpSeparation}
        toggle={toggleEmpSeparation}
      />

      {/* CHANGE MODAL TO NOSI/NOSA DOCUMENT */}
      {/* <NosiModal
        showEmpSeparation={showEmpSeparation}
        handleCloseView={handleCloseView}
        modalData={modalData}
      /> */}
    </React.Fragment>
  )
}

export default ServiceRecord
