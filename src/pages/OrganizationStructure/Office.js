import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOffices } from "store/actions"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { Card, CardBody, Col, Row } from "reactstrap"
import InRowAction from "components/InRowAction/InRowAction"
import EditOfficeModal from "components/Modal/Office/EditOfficeModal"
import DeleteOfficeModal from "components/Modal/Office/DeleteOfficeModal"
import AddOfficeModal from "components/Modal/Office/AddOfficeModal"
import TableOrgStruct from "components/Table/TableOrgStruct"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import LoadingIndicator from "../../components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/components/table.scss"

const Office = props => {
  const dispatch = useDispatch()

  const tblColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Office Name",
      accessor: "name",
    },
    {
      Header: "Code",
      accessor: "code",
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

  const { offices, isLoading, error } = useSelector(state => ({
    offices: state.officeList.offices,
    isLoading: state.officeList.isLoading,
    error: state.officeList.error,
  }))

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(() => offices, [offices])

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

  // Add Office Modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  useEffect(() => {
    dispatch(getOffices())
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Organization_structure">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Offices"
            />

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody className="card-table">
                    {error ? (
                      <ToastrNotification
                        toastType={"error"}
                        notifMessage={error}
                      />
                    ) : null}

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
                              <i className="fas fa-plus-square"></i> Add Office
                            </button>
                          </div>
                        </div>
                        <TableOrgStruct columns={columns} data={data} />
                      </>
                    )}

                    <AddOfficeModal
                      showAdd={showAdd}
                      handleCloseAdd={handleCloseAdd}
                    />
                    <EditOfficeModal
                      showEdt={showEdt}
                      modalData={modalData}
                      handleCloseEdt={handleCloseEdt}
                    />
                    <DeleteOfficeModal
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

      <Can not I="access" this="Organization_structure">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

Office.propTypes = {
  location: PropTypes.object,
}

export default Office
