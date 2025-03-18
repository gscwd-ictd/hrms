import React, { useMemo, useState } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { isEmpty } from 'lodash'
import { dateFormatter } from 'functions/DateFormatter'
import TableBase from 'components/Table/TableBase'
import { useSelector } from 'react-redux'

const LearningAndDevelopment = () => {
  const { employeeTrainings, learningDevelopment } = useSelector(state => ({
    employeeTrainings: state.learningDevelopment.employeeTrainings,

    learningDevelopment: state.employee.pds.learningDevelopment,
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
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Conducted By(LSP)',
      accessor: 'conductedBy',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },

    {
      Header: 'Number of Hours',
      accessor: 'numberOfHours',
    },
  ]

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => learningDevelopment, [learningDevelopment]) // CHANGE TO employeeTrainings

  return (
    <React.Fragment>
      <Row>
        <Col>
          <TableBase columns={columns} data={data} />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default LearningAndDevelopment
