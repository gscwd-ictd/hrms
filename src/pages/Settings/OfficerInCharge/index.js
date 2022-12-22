import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOICList } from "store/actions"

import { Row, Col, Card, CardBody, Container } from "reactstrap"
import TableBase from "components/Table/TableBase"
import Breadcrumbs from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import InRowAction from "components/InRowAction/InRowAction"
import AddOfficerInChargeModal from "components/Modal/OfficerInCharge/AddOfficerInChargeModal"
import DeleteOfficerInChargeModal from "components/Modal/OfficerInCharge/DeleteOfficerInChargeModal"

const OfficerInCharge = () => {
  const dispatch = useDispatch()

  const tableColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Employee Name",
      accessor: "employeeFullName",
    },
    {
      Header: "Position",
      accessor: "employeePosition",
    },
    {
      Header: "OIC Position",
      accessor: "oicPosition",
    },
    {
      Header: "OIC Assignment",
      accessor: "oicOrgName",
    },
    {
      Header: "Actions",
      accessor: "",
      align: "center",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return <InRowAction cell={cell} deleteModal={deleteModal} />
      },
    },
  ]

  // redux state for Officer-In-Charge list
  const { oicList, loadingOicList, errorOicList } = useSelector(state => ({
    oicList: state.officerInCharge.oicList,
    loadingOicList: state.officerInCharge.loading.loadingOicList,
    errorOicList: state.officerInCharge.error.errorOicList,
  }))

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => oicList, [oicList])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Assign OIC Modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  // Remove OIC Modal
  const [showDel, setShowDel] = useState(false)
  const handleCloseDel = () => setShowDel(false)
  const handleShowDel = () => setShowDel(true)

  const deleteModal = rowData => {
    setModalData(rowData)
    handleShowDel()
  }

  // Initial request for Officer-In-Charge list
  useEffect(() => {
    dispatch(fetchOICList())
  }, [dispatch])

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs
          title="Dashboard"
          titleUrl="/"
          breadcrumbItem="Officer-In-Charge"
        />

        {/* Notifications */}
        {errorOicList ? (
          <ToastrNotification toastType={"error"} notifMessage={errorOicList} />
        ) : null}

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody className="card-table">
                {loadingOicList ? (
                  <LoadingIndicator />
                ) : (
                  <>
                    <div className="top-right-actions">
                      <div className="form-group add-btn">
                        <button
                          onClick={handleShowAdd}
                          className="btn btn-info waves-effect waves-light"
                        >
                          <i className="fas fa-plus-square"></i> Assign OIC
                        </button>
                      </div>
                    </div>
                    <TableBase columns={columns} data={data} />
                  </>
                )}

                {/* Modal */}
                <AddOfficerInChargeModal
                  showAdd={showAdd}
                  handleCloseAdd={handleCloseAdd}
                />
                <DeleteOfficerInChargeModal
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

export default OfficerInCharge
