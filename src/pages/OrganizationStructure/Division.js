import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardBody, Col, Row, Table } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { getDepartments, getDivisions } from "store/actions"

// modal components
import InRowAction from "../../components/InRowAction/InRowAction"
import EditDivisionModal from "../../components/Modal/Division/EditDivisionModal"
import DeleteDivisionModal from "../../components/Modal/Division/DeleteDivisionModal"
import AddDivisionModal from "components/Modal/Division/AddDivisionModal"

// table components
import TableOrgStruct from "components/Table/TableOrgStruct"
import { SelectColumnFilter } from "components/Filters/SelectColumnFilter"

// extra components
import LoadingIndicator from "../../components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/components/table.scss"

const Division = () => {
  const dispatch = useDispatch()

  const tblColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Division Name",
      accessor: "name",
    },
    {
      Header: "Code",
      accessor: "code",
    },
    {
      Header: "Department",
      accessor: "departmentCode",
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

  // data from getDivisions()
  const { divisions, isLoading, error } = useSelector(state => ({
    divisions: state.divisionList.divisions,
    isLoading: state.divisionList.isLoading,
    error: state.divisionList.error,
  }))

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(() => divisions, [divisions])

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

  // Add Division Modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  useEffect(() => {
    dispatch(getDivisions())
    dispatch(getDepartments())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            titleUrl="/"
            breadcrumbItem="Divisions"
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
                            <i className="fas fa-plus-square"></i> Add Division
                          </button>
                        </div>
                      </div>
                      <TableOrgStruct columns={columns} data={data} />
                    </>
                  )}
                  <EditDivisionModal
                    showEdt={showEdt}
                    modalData={modalData}
                    handleCloseEdt={handleCloseEdt}
                  />
                  <DeleteDivisionModal
                    showDel={showDel}
                    modalData={modalData}
                    handleCloseDel={handleCloseDel}
                  />
                  <AddDivisionModal
                    showAdd={showAdd}
                    handleCloseAdd={handleCloseAdd}
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

export default Division
