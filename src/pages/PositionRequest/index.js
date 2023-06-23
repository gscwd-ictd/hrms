import React, { useEffect, useMemo } from "react"
import dayjs from "dayjs"
import { useDispatch, useSelector } from "react-redux"
import { getPRFList } from "store/prf/actions"
import { Can } from "casl/Can"
import { Navigate, useLocation } from "react-router-dom"

import { Card, CardBody, Col, Row, Badge } from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import InRowAction from "components/InRowAction/InRowAction"
import TablePrfList from "components/Table/TablePrfList"
import { SelectColumnFilter } from "components/Filters/SelectColumnFilter"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/components/table.scss"

const PrfList = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const prfListColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "PRF No",
      accessor: "prfNo",
    },
    {
      Header: "Date Requested",
      accessor: "dateRequested",
      Cell: function DateRequested(cell) {
        return (
          <>
            {dayjs(cell.row.original.dateRequested, "MMMM DD, YYYY").format(
              "MMMM DD, YYYY"
            )}
          </>
        )
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Filter: SelectColumnFilter,
      Cell: function Status(cell) {
        if (cell.row.original.status === "Pending") {
          return (
            <Badge className="me-2 bg-warning font-size-12">
              {cell.row.original.status}
            </Badge>
          )
        } else if (cell.row.original.status === "For Signing") {
          return (
            <Badge className="me-2 bg-info font-size-12">
              {cell.row.original.status}
            </Badge>
          )
        } else if (cell.row.original.status === "Disapproved") {
          return (
            <Badge className="me-2 bg-danger font-size-12">
              {cell.row.original.status}
            </Badge>
          )
        } else if (cell.row.original.status === "Approved") {
          return (
            <Badge className="me-2 bg-success font-size-12">
              {cell.row.original.status}
            </Badge>
          )
        } else {
          return (
            <Badge className="me-2 font-size-12">
              {cell.row.original.status}
            </Badge>
          )
        }
      },
    },
    {
      Header: "For",
      accessor: "for",
    },
    {
      Header: "Requested by",
      accessor: "from",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Actions",
      accessor: "",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return (
          <InRowAction
            viewRedirectUrl={location.pathname + "/" + cell.row.values._id}
          />
        )
      },
    },
  ]

  const { prflist, loadingPrf, errorPrf } = useSelector(state => ({
    prflist: state.positionRequest.prflist,
    loadingPrf: state.positionRequest.loading.loadingPrf,
    errorPrf: state.positionRequest.error.errorPrf,
  }))

  const columns = useMemo(() => prfListColumns, [])
  const data = useMemo(() => prflist, [prflist])

  useEffect(() => {
    dispatch(getPRFList())
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Prf_list">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs breadcrumbItem="Position Request List" />

            {/* Notifications */}
            {errorPrf ? (
              <ToastrNotification toastType={"error"} notifMessage={errorPrf} />
            ) : null}

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody className="card-table">
                    {loadingPrf ? (
                      <LoadingIndicator />
                    ) : (

                      <TablePrfList columns={columns} data={data} />

                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Can>

      <Can not I="access" this="Prf_list">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default PrfList
