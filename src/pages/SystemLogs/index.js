import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSystemLogs } from "store/actions"
import dayjs from "dayjs"
import { isEmpty } from "lodash"

import { Card, CardBody, Col, Row } from "reactstrap"
import TableSystemLogs from "components/Table/TableSystemLogs"
import InRowAction from "components/InRowAction/InRowAction"
import Breadcrumbs from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ViewSystemLogModal from "components/Modal/SystemLogs/ViewSystemLogModal"
import { SelectColumnFilter } from "components/Filters/SelectColumnFilter"
import { DateRangeColumnFilter, dateBetweenFilterFn } from "components/Filters/DateRangeColumnFilter"

// style
import "styles/custom_gscwd/components/table.scss"

const SystemLogs = () => {
  const dispatch = useDispatch()

  const tableColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Date Logged",
      accessor: "dateLogged",
      FilterName: "Date",
      Filter: DateRangeColumnFilter,
      filter: dateBetweenFilterFn,
      Cell: function formateDate(cell) {
        return <>{formatDate(cell.value)}</>
      },
    },
    {
      Header: "Username",
      accessor: "userFullName",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Actions",
      accessor: "",
      align: "center",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return <InRowAction cell={cell} viewModal={viewModal} />
      },
    },
  ]

  // redux state for list of system log
  const { systemLogList, loadingList, errorList } = useSelector(state => ({
    systemLogList: state.systemLogs.systemLogList,
    loadingList: state.systemLogs.loading.loadingList,
    errorList: state.systemLogs.error.errorList,
  }))

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => systemLogList, [systemLogList])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Edit Modal
  const [showView, setShowView] = useState(false)
  const handleCloseView = () => setShowView(false)
  const handleShowView = () => setShowView(true)

  const viewModal = rowData => {
    setModalData(rowData)
    handleShowView()
  }

  // change date format
  const formatDate = assignedDate => {
    if (!isEmpty(assignedDate)) {
      const date = new Date(assignedDate)
      return dayjs(date).format("MM-DD-YYYY hh:mm:ss A")
    } else {
      return ""
    }
  }

  useEffect(() => {
    dispatch(fetchSystemLogs())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            titleUrl="/"
            breadcrumbItem="System Logs"
          />

          {/* Notifications */}
          {errorList ? (
            <ToastrNotification toastType={"error"} notifMessage={errorList} />
          ) : null}

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody className="card-table">
                  {loadingList ? (
                    <LoadingIndicator />
                  ) : (
                    <TableSystemLogs columns={columns} data={data} />
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
    </React.Fragment>
  )
}

export default SystemLogs
