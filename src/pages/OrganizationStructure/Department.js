import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOffices, getDepartments } from "store/actions"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { Card, CardBody, Col, Row } from "reactstrap"
import InRowAction from "components/InRowAction/InRowAction"
import EditDepartmentModal from "components/Modal/Department/EditDepartmentModal"
import DeleteDepartmentModal from "components/Modal/Department/DeleteDepartmentModal"
import AddDepartmentModal from "components/Modal/Department/AddDepartmentModal"
import TableOrgStruct from "components/Table/TableOrgStruct"
import { SelectColumnFilter } from "components/Filters/SelectColumnFilter"
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "../../components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/components/table.scss"

const Department = props => {
  const dispatch = useDispatch()

  const tblColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Department Name",
      accessor: "name",
    },
    {
      Header: "Code",
      accessor: "code",
    },
    {
      Header: "Office",
      accessor: "officeCode",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Description",
      accessor: "description",
      disableGlobalFilter: true,
    },
    {
      Header: "Actions",
      accessor: "",
      align: "center",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return (
          <InRowAction
            cell={cell}
            editModal={editModal}
            deleteModal={deleteModal}
          />
        )
      },
    },
  ]

  // data from getDepartments()
  const { departments, isLoading, error } = useSelector(state => ({
    departments: state.departmentList.departments,
    isLoading: state.departmentList.isLoading,
    error: state.departmentList.error,
  }))

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(() => departments, [departments])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Edit Modal
  const [showEdt, setShowEdt] = useState(false)

  const handleCloseEdt = () => setShowEdt(false)
  const handleShowEdt = () => setShowEdt(true)

  const editModal = rowData => {
    setModalData(rowData)
    handleShowEdt()
  }

  // Delete Modal
  const [showDel, setShowDel] = useState(false)

  const handleCloseDel = () => setShowDel(false)
  const handleShowDel = () => setShowDel(true)

  const deleteModal = rowData => {
    setModalData(rowData)
    handleShowDel()
  }

  // Add Department Modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  useEffect(() => {
    dispatch(getDepartments())
    dispatch(getOffices())
  }, [dispatch])

  return (
    <>
      <Can I="access" this="Organization_structure">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Department"
            />

            {error ? (
              <ToastrNotification toastType={"error"} notifMessage={error} />
            ) : null}

            <Row>
              <Col className="col-12">
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
                              <i className="fas fa-plus-square"></i> Add
                              Department
                            </button>
                          </div>
                        </div>
                        <TableOrgStruct columns={columns} data={data} />
                      </>
                    )}
                    <EditDepartmentModal
                      showEdt={showEdt}
                      modalData={modalData}
                      handleCloseEdt={handleCloseEdt}
                    />
                    <DeleteDepartmentModal
                      showDel={showDel}
                      modalData={modalData}
                      handleCloseDel={handleCloseDel}
                    />
                    <AddDepartmentModal
                      showAdd={showAdd}
                      handleCloseAdd={handleCloseAdd}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Can>

      <Can not I="access" this="Organization_structure">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </>
  )
}

Department.propTypes = {
  location: PropTypes.object,
}

export default Department
