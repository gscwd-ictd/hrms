import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, resetUserResponse } from "store/actions"

import { Row, Col, Card, CardBody, Container } from "reactstrap"
import TableBase from "components/Table/TableBase"
import Breadcrumbs from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import InRowAction from "components/InRowAction/InRowAction"
import AddUserModal from "components/Modal/Users/AddUserModal"
import EditUserModal from "components/Modal/Users/EditUserModal"
import DeleteUserModal from "components/Modal/Users/DeleteUserModal"

const Users = () => {
  const dispatch = useDispatch()

  const tableColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Name",
      accessor: "fullName",
    },
    {
      Header: "Actions",
      accessor: "",
      align: "center",
      disableGlobalFilter: true,
      disableSortBy: true,
      Cell: function ActionDropdown(cell) {
        return (
          <div className="d-flex">
            <InRowAction
              cell={cell}
              // buttonTitle={"Roles"}
              editModal={editModal}
            />
            <InRowAction cell={cell} deleteModal={deleteModal} />
          </div>
        )
      },
    },
  ]

  // redux state for user list
  const { userList, loadingUserList, errorUserList } = useSelector(state => ({
    userList: state.users.userList,
    loadingUserList: state.users.loading.loadingUserList,
    errorUserList: state.users.error.errorUserList,
  }))

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => userList, [userList])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Add User Modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  // Remove User Modal
  const [showDel, setShowDel] = useState(false)
  const handleCloseDel = () => setShowDel(false)
  const handleShowDel = () => setShowDel(true)

  const deleteModal = rowData => {
    setModalData(rowData)
    handleShowDel()
  }

  // Edit User Roles
  const [showEdt, setShowEdt] = useState(false)
  const handleCloseEdt = () => setShowEdt(false)
  const handleShowEdt = () => setShowEdt(true)

  const editModal = rowData => {
    setModalData(rowData)
    handleShowEdt()
  }

  // Initial request for user list
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Dashboard" titleUrl="/" breadcrumbItem="Users" />

        {/* Notifications */}
        {errorUserList ? (
          <ToastrNotification
            toastType={"error"}
            notifMessage={errorUserList}
          />
        ) : null}

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody className="card-table">
                {loadingUserList ? (
                  <LoadingIndicator />
                ) : (
                  <>
                    <div className="top-right-actions">
                      <div className="form-group add-btn">
                        <button
                          onClick={handleShowAdd}
                          className="btn btn-info waves-effect waves-light"
                        >
                          <i className="fas fa-plus-square"></i> Add User
                        </button>
                      </div>
                    </div>
                    <TableBase columns={columns} data={data} />
                  </>
                )}

                {/* Modal */}
                <AddUserModal
                  showAdd={showAdd}
                  handleCloseAdd={handleCloseAdd}
                />

                <EditUserModal
                  showEdt={showEdt}
                  handleCloseEdt={handleCloseEdt}
                  modalData={modalData}
                />

                <DeleteUserModal
                  showDel={showDel}
                  handleCloseDel={handleCloseDel}
                  modalData={modalData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Users
