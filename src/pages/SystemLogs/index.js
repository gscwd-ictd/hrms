import React, { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx'
import { Button, Card, CardBody, Col, Input, Label, Row } from 'reactstrap'
import InRowAction from 'components/InRowAction/InRowAction'
import 'styles/custom_gscwd/components/daterangefilter.scss'
import TableSystemLogs from 'components/Table/TableSystemLogs'
import Breadcrumbs from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ViewSystemLogModal from 'components/Modal/SystemLogs/ViewSystemLogModal'
import { getSystemLogs } from 'helpers/backend_helper'
import { useDispatch } from 'react-redux'
import { fetchSystemLog } from 'store/actions'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'
import 'styles/custom_gscwd/components/table.scss'

const formatLogged = dateLogged =>
  dateLogged ? dayjs(dateLogged).format('MMMM DD, YYYY hh:mm A') : ''

/** System Logs: who did what and when. Filters: date from / to (default: the last 30 days) and name. */
const SystemLogs = () => {
  const dispatch = useDispatch()

  // filters
  const defaultFrom = () => dayjs().subtract(30, 'day').format('YYYY-MM-DD')
  const defaultTo = () => dayjs().format('YYYY-MM-DD')
  const [dateFrom, setDateFrom] = useState(defaultFrom())
  const [dateTo, setDateTo] = useState(defaultTo())
  const resetDates = () => {
    setDateFrom(defaultFrom())
    setDateTo(defaultTo())
  }
  const [name, setName] = useState('')
  const validRange = !!dateFrom && !!dateTo && dateFrom <= dateTo

  // logs of the date range
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!validRange) return
    let cancelled = false
    setLoading(true)
    setError('')
    getSystemLogs({ date_from: dateFrom, date_to: dateTo })
      .then(data => !cancelled && setLogs(Array.isArray(data) ? data : []))
      .catch(err => !cancelled && setError(err?.message || 'Failed to load system logs'))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [dateFrom, dateTo])

  // name filter (employee name or "Super User")
  const nameOptions = useMemo(
    () => [...new Set(logs.map(log => log.userFullName).filter(Boolean))].sort(),
    [logs]
  )
  const filteredLogs = useMemo(
    () => (name ? logs.filter(log => log.userFullName === name) : logs),
    [logs, name]
  )

  // view modal
  const [modalData, setModalData] = useState({})
  const [showView, setShowView] = useState(false)
  const handleCloseView = () => setShowView(false)
  const viewModal = rowData => {
    setModalData(rowData)
    dispatch(fetchSystemLog(rowData._id))
    setShowView(true)
  }

  const tableColumns = [
    { Header: 'ID', accessor: '_id', disableGlobalFilter: true },
    { Header: 'Name', accessor: 'userFullName' },
    {
      Header: 'Date and Time Logged',
      accessor: 'dateLogged',
      Cell: function formatDate(cell) {
        return <>{formatLogged(cell.value)}</>
      },
    },
    {
      Header: 'Actions',
      accessor: 'action',
      Cell: function ActionCell(cell) {
        return (
          <div className="d-flex align-items-center justify-content-between gap-3">
            <span>{cell.value}</span>
            <InRowAction cell={cell} viewModal={viewModal} />
          </div>
        )
      },
    },
  ]
  const columns = useMemo(() => tableColumns, [])

  const downloadExcel = () => {
    const aoa = [
      ['SYSTEM LOGS'],
      [
        `${dayjs(dateFrom).format('MMMM DD, YYYY')} - ${dayjs(dateTo).format(
          'MMMM DD, YYYY'
        )}${name ? ` | Name: ${name}` : ''}`,
      ],
      [],
      ['No.', 'Name', 'Date and Time Logged', 'Actions'],
      ...filteredLogs.map((log, index) => [
        index + 1,
        log.userFullName,
        formatLogged(log.dateLogged),
        log.action,
      ]),
    ]
    const sheet = XLSX.utils.aoa_to_sheet(aoa)
    sheet['!cols'] = [{ wch: 6 }, { wch: 35 }, { wch: 28 }, { wch: 70 }]
    const book = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(book, sheet, 'System Logs')
    XLSX.writeFile(book, `System Logs ${dateFrom} to ${dateTo}.xlsx`)
  }

  return (
    <React.Fragment>
      <Can I="access" this="System_logs">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="System Logs"
            />

            {error ? (
              <ToastrNotification toastType={'error'} notifMessage={error} />
            ) : null}

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody className="card-table">
                    {/* Filters (same look as the other table filters) */}
                    <div className="column-filters d-flex flex-wrap align-items-start justify-content-between gap-4 mt-3">
                      <div className="d-flex flex-wrap gap-4">
                        <div className="daterange-wrapper d-flex gap-2">
                          <Label className="col-form-label">Date: </Label>
                          <p className="col-form-label">from</p>
                          <Input
                            type="date"
                            value={dateFrom}
                            max={dateTo || undefined}
                            onChange={e => setDateFrom(e.target.value)}
                          />
                          <p className="col-form-label">to</p>
                          <Input
                            type="date"
                            value={dateTo}
                            min={dateFrom || undefined}
                            max={defaultTo()}
                            onChange={e => setDateTo(e.target.value)}
                          />
                          <Button
                            onClick={resetDates}
                            color="light"
                            outline
                            title="Last 30 days"
                          >
                            <i className="fas fa-undo"></i>
                          </Button>
                        </div>

                        <div className="d-flex gap-1 column-filter-inner">
                          <Label className="col-form-label text-nowrap">
                            Name:
                          </Label>
                          <Input
                            type="select"
                            className="dropdown-col-filter"
                            value={name}
                            onChange={e => setName(e.target.value)}
                          >
                            <option value="">All</option>
                            {nameOptions.map(option => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Input>
                        </div>
                      </div>

                      <Button
                        color="success"
                        disabled={filteredLogs.length === 0}
                        onClick={downloadExcel}
                      >
                        <i className="mdi mdi-microsoft-excel" /> Download
                        Excel
                      </Button>
                    </div>

                    {!validRange ? (
                      <p className="text-danger">
                        Date from must be on or before date to.
                      </p>
                    ) : loading ? (
                      <LoadingIndicator />
                    ) : (
                      <TableSystemLogs columns={columns} data={filteredLogs} />
                    )}

                    <ViewSystemLogModal
                      modalData={modalData}
                      showView={showView}
                      handleCloseView={handleCloseView}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Can>

      <Can not I="access" this="System_logs">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default SystemLogs