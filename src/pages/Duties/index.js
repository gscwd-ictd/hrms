import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDutyResponsibilities } from "store/actions"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Navigate } from "react-router-dom"

import { Card, CardBody, Col, Row } from "reactstrap"
import InRowAction from "components/InRowAction/InRowAction"
import AddDutyModal from "components/Modal/Duties/AddDutyModal"
import EditDutyModal from "components/Modal/Duties/EditDutyModal"
import DeleteDutyModal from "components/Modal/Duties/DeleteDutyModal"
import TableDutiesResponsibilities from "components/Table/TableDutiesResponsibilities"
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "../../components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/components/table.scss"

const Duties = () => {
  const dispatch = useDispatch()

  const tblColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Description",
      accessor: "description",
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

  // Redux state for list of duties and responsibilities
  const {
    dutiesResponsibilities,
    loadingDutyResponsibilities,
    errorDutyResponsibilities,
  } = useSelector(state => ({
    dutiesResponsibilities:
      state.dutiesResponsibilities.response.dutyResponsibilities,
    loadingDutyResponsibilities:
      state.dutiesResponsibilities.loading.loadingDutyResponsibilities,
    errorDutyResponsibilities:
      state.dutiesResponsibilities.error.errorDutyResponsibilities,
  }))

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(() => dutiesResponsibilities, [dutiesResponsibilities])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Add Modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

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

  useEffect(() => {
    dispatch(fetchDutyResponsibilities())
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Duties_responsibilities">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Duties and Responsibilities"
            />

            {/* Error Notifications */}
            {errorDutyResponsibilities ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorDutyResponsibilities}
              />
            ) : null}

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody className="card-table">
                    {loadingDutyResponsibilities ? (
                      <LoadingIndicator />
                    ) : (
                      <>
                        <div className="top-right-actions">
                          <div className="form-group add-btn">
                            <button
                              onClick={handleShowAdd}
                              className="btn btn-info waves-effect waves-light"
                            >
                              <i className="fas fa-plus-square"></i> Add Duty &
                              Responsibility
                            </button>
                          </div>
                        </div>
                        <TableDutiesResponsibilities
                          columns={columns}
                          data={data}
                        />
                      </>
                    )}
                    <AddDutyModal
                      showAdd={showAdd}
                      handleCloseAdd={handleCloseAdd}
                    />
                    <EditDutyModal
                      showEdt={showEdt}
                      modalData={modalData}
                      handleCloseEdt={handleCloseEdt}
                    />
                    <DeleteDutyModal
                      showDel={showDel}
                      modalData={modalData}
                      handleCloseDel={handleCloseDel}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Can>

      <Can not I="access" this="Duties_responsibilities">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default Duties
