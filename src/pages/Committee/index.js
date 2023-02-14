import React, { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCommittees } from "store/actions"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { Container, Row, Col, Card, CardBody } from "reactstrap"
import TableCommittee from "components/Table/TableCommittee"
import InRowAction from "components/InRowAction/InRowAction"
import AddCommitteeModal from "components/Modal/Committee/AddCommitteeModal"
import EditCommitteeModal from "components/Modal/Committee/EditCommitteeModal"
import DeleteCommitteeModal from "components/Modal/Committee/DeleteCommitteeModal"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import Breadcrumb from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"

const Committees = props => {
  const dispatch = useDispatch()

  const tableColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Name",
      accessor: "name",
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
      disableSortBy: true,
      Cell: function ActionDropdown({ cell }) {
        return (
          <div className="d-flex">
            <InRowAction
              buttonTitle={"Members"}
              editRedirectUrl={
                props.location.pathname + "/" + cell.row.values._id
              }
            />
            <InRowAction
              cell={cell}
              editModal={editModal}
              deleteModal={deleteModal}
            />
          </div>
        )
      },
    },
  ]

  const { committees, loadingCommittees, errorCommittees } = useSelector(
    state => ({
      committees: state.committee.response.committees,
      loadingCommittees: state.committee.loading.loadingCommittees,
      errorCommittees: state.committee.error.errorCommittees,
    })
  )

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => committees, [committees])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Edit committee modal
  const [showEdt, setShowEdt] = useState(false)
  const handleCloseEdt = () => setShowEdt(false)
  const handleShowEdt = () => setShowEdt(true)

  const editModal = rowData => {
    setModalData(rowData)
    handleShowEdt()
  }

  // Delete committee modal
  const [showDel, setShowDel] = useState(false)
  const handleCloseDel = () => setShowDel(false)
  const handleShowDel = () => setShowDel(true)

  const deleteModal = rowData => {
    setModalData(rowData)
    handleShowDel()
  }

  // Add committee modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  useEffect(() => {
    dispatch(fetchCommittees())
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Committees">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Committees"
            />

            {/* Error Notifications */}
            {errorCommittees ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorCommittees}
              />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {loadingCommittees ? (
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
                              Committee
                            </button>
                          </div>
                        </div>
                        <TableCommittee columns={columns} data={data} />
                      </>
                    )}

                    <AddCommitteeModal
                      showAdd={showAdd}
                      handleCloseAdd={handleCloseAdd}
                    />
                    <EditCommitteeModal
                      showEdt={showEdt}
                      modalData={modalData}
                      handleCloseEdt={handleCloseEdt}
                    />
                    <DeleteCommitteeModal
                      showDel={showDel}
                      modalData={modalData}
                      handleCloseDel={handleCloseDel}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Committees">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

Committees.propTypes = {
  location: PropTypes.object,
  cell: PropTypes.any,
}

export default Committees
