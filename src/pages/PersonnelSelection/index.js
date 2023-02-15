import React, { useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Link, Redirect } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { getApprovedPRFList } from "store/actions"

import TablePrfList from "components/Table/TablePrfList"

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap"
import InterviewScheduleCalendar from "./InterviewScheduleCalendar"
import ApplicationChart from "./ApplicationChart"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import Breadcrumb from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/components/table.scss"

const PersonnelSelection = props => {
  const dispatch = useDispatch()

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
      Header: "Requested by",
      accessor: "from",
    },
    {
      Header: "Positions",
      accessor: "positionTitles",
    },
    {
      Header: "Actions",
      accessor: "",
      align: "center",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return (
          <Link
            className="dropdown-item"
            to={
              props.location.pathname +
              "/publication-positions/" +
              cell.row.values._id
            }
          >
            <Button className="btn btn-info waves-effect waves-light">
              Requested Positions
            </Button>
          </Link>
        )
      },
    },
  ]

  // Redux state of list of prf that was approved
  const { prflist, loadingPrf, errorPrf } = useSelector(state => ({
    prflist: state.positionRequest.prflist,
    loadingPrf: state.positionRequest.loading.loadingPrf,
    errorPrf: state.positionRequest.error.errorPrf,
  }))

  const columns = useMemo(() => prfListColumns, [])
  const data = useMemo(() => prflist, [prflist])

  useEffect(() => {
    dispatch(getApprovedPRFList())
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Personnel_selection">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Personnel Selection"
            />

            {errorPrf ? (
              <ToastrNotification toastType={"error"} notifMessage={errorPrf} />
            ) : null}
            <Row>
              <Col lg={12}>
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

            <Row>
              <Col md={6}>
                <Card>
                  <CardBody className="card-table">
                    <CardTitle>Interview/Examination Schedule</CardTitle>
                    <InterviewScheduleCalendar />
                  </CardBody>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <CardBody className="card-table">
                    <CardTitle>
                      Application Data for C.Y. {new Date().getFullYear()}
                    </CardTitle>
                    <ApplicationChart />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Personnel_selection">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

PersonnelSelection.propTypes = {
  location: PropTypes.object,
  cell: PropTypes.any,
}

export default PersonnelSelection
