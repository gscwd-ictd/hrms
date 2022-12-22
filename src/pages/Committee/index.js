import React, { useEffect, useState, useMemo } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import { fetchCommittees } from "store/actions"

// table components
import TableCommittee from "components/Table/TableCommittee"

// modal components
import InRowAction from "components/InRowAction/InRowAction"
import AddCommitteeModal from "components/Modal/Committee/AddCommitteeModal"
import EditCommitteeModal from "components/Modal/Committee/EditCommitteeModal"
import DeleteCommitteeModal from "components/Modal/Committee/DeleteCommitteeModal"

// extra components
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

  const { committees, loadingCommittees, errorCommittess } = useSelector(
    state => ({
      committees: state.committee.response.committees,
      loadingCommittees: state.committee.loading.loadingCommittees,
      errorCommittess: state.committee.error.errorCommittess,
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

  // Delete committe modal
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
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Dashboard"
            titleUrl="/"
            breadcrumbItem="Committees"
          />

          {/* Error Notifications */}
          {errorCommittess ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorCommittess}
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
                            <i className="fas fa-plus-square"></i> Add Committee
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
    </React.Fragment>
  )
}

Committees.propTypes = {
  location: PropTypes.object,
  cell: PropTypes.any,
}

export default Committees
