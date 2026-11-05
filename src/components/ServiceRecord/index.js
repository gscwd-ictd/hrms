import React, { useMemo, useState } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { DateFormatter } from 'functions/DateFormatter'
import TableBase from 'components/Table/TableBase'
import NosiModal from 'components/Modal/ServiceRecord/NosiModal'
import { useSelector } from 'react-redux'
import EmployeeSeparationModal from 'components/Modal/ServiceRecord/EmployeeSeparationModal'
import AddServiceRecordModal from 'components/Modal/ServiceRecord/AddServiceRecordModal'

const ServiceRecord = () => {
  const { serviceRecords } = useSelector(state => ({
    serviceRecords: state.serviceRecord.serviceRecords,
  }))

  const tableColumns = [
    {
      Header: 'ID',
      accessor: '_id',
      disableGlobalFilter: true,
    },
    {
      Header: 'From',
      accessor: 'dateFrom',
      Cell: cell => {
        return <p>{DateFormatter(cell.value, 'MM/DD/YYYY')}</p>
      },
    },
    {
      Header: 'To',
      accessor: 'dateTo',
      Cell: cell => {
        return <p>{DateFormatter(cell.value, 'MM/DD/YYYY') || 'PRESENT'}</p>
      },
    },
    {
      Header: 'Position Title',
      accessor: 'positionTitle',
    },
    {
      Header: 'Monthly Salary',
      accessor: 'adjustedAmount',
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
      accessor: 'appointment',
    },
    {
      Header: `Is Gov't Service?`,
      accessor: 'isGovernmentService',
      Cell: cell => {
        return <p>{cell.value}</p>
        // return <p>{cell.value ? 'Yes' : 'No'}</p>
      },
    },
  ]

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => serviceRecords, [serviceRecords]) // CHANGE TO serviceRecords

  /**
   * Modal
   */
  // const [modalData, setModalData] = useState({})

  // Add Service Record
  const [showAddRecord, setShowAddRecord] = useState(false)
  const toggleAddRecord = () => setShowAddRecord(!showAddRecord)

  // Employee Separation Modal
  const [showEmpSeparation, setShowEmpSeparation] = useState(false)
  const toggleEmpSeparation = () => setShowEmpSeparation(!showEmpSeparation)

  return (
    <React.Fragment>
      <Row>
        <Col>
          <div className="form-group d-flex justify-content-end mt-3 mb-4 gap-2">
            <Button
              onClick={toggleAddRecord}
              className="btn btn-info waves-effect waves-light"
            >
              <i className="fas fa-user-plus"></i>&nbsp; Add Service Record
            </Button>

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

      <AddServiceRecordModal isOpen={showAddRecord} toggle={toggleAddRecord} />

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
