import React, { useMemo, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEmployeeList } from "store/actions"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect, Link } from "react-router-dom"

import { Container, Row, Col, Card, CardBody } from "reactstrap"

// modal components
import InRowAction from "components/InRowAction/InRowAction"
import PortalRegistrationModal from "components/Modal/Portal/PortalRegistrationModal"

// table components
import TableEmployeeList from "components/Table/TableEmployeeList"
import { SelectColumnFilter } from "components/Filters/SelectColumnFilter"

// extra components
import Breadcrumb from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const EmployeeList = props => {
  const dispatch = useDispatch()

  const tableColumns = [
    {
      Header: "ID",
      accessor: "employmentDetails.employeeId",
      disableGlobalFilter: true,
    },
    {
      Header: "Name",
      accessor: "personalDetails.fullName",
    },
    {
      Header: "Position Title",
      accessor: "employmentDetails.positionTitle",
    },
    {
      Header: "Assignment",
      accessor: "employmentDetails.assignment.name",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Actions",
      accessor: "",
      align: "center",
      disableGlobalFilter: true,
      disableSortBy: true,
      Cell: function ActionDropdown({ cell }) {
        return (
          <div className="d-flex">
            <Link
              to={`${
                props.location.pathname +
                "/" +
                cell.row.values["employmentDetails.employeeId"]
              }`}
              style={{ paddingRight: 5 }}
            >
              <button className="btn btn-info waves-effect waves-light">
                201
              </button>
            </Link>
          </div>
        )
      },
    },
  ]

  const { employeeListRes, isLoading, error } = useSelector(state => ({
    employeeListRes: state.employee.employeeListRes,
    isLoading: state.employee.isLoading,
    error: state.employee.error,
  }))

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => employeeListRes, [employeeListRes])

  // Register Employee to Portal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  useEffect(() => {
    dispatch(fetchEmployeeList())
    // dispatch(fetchPlantillaPositionsSelect())
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Employees">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Employee List"
            />

            {error ? (
              <ToastrNotification toastType={"error"} notifMessage={error} />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {isLoading ? (
                      <LoadingIndicator />
                    ) : (
                      <>
                        <div className="top-right-actions">
                          <div className="form-group add-btn">
                            <button
                              onClick={handleShowAdd}
                              className="btn btn-info waves-effect waves-light"
                            >
                              <i className="fas fa-plus-square"></i>&nbsp;
                              Employee Registration
                            </button>
                          </div>
                        </div>
                        <TableEmployeeList columns={columns} data={data} />
                      </>
                    )}

                    <PortalRegistrationModal
                      showAdd={showAdd}
                      handleCloseAdd={handleCloseAdd}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Employees">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

EmployeeList.propTypes = {
  location: PropTypes.object,
  cell: PropTypes.any,
}

export default EmployeeList
