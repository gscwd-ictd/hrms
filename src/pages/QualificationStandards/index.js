import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchQualificationStandardsList } from "store/actions"

import { Card, CardBody, Col, Row } from "reactstrap"
import InRowAction from "components/InRowAction/InRowAction"
import EditQSModal from "components/Modal/QualificationStandards/EditQSModal"
import DeleteQSModal from "components/Modal/QualificationStandards/DeleteQSModal"
import TableQualificationStandard from "components/Table/TableQualificationStandard"
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/components/table.scss"

const QualificationStandards = () => {
  const dispatch = useDispatch()

  const tableColumns = [
    {
      Header: "ID",
      accessor: "positionId",
      disableGlobalFilter: true,
    },
    {
      Header: "Item No.",
      accessor: "itemNumber",
    },
    {
      Header: "Position Title",
      accessor: "positionTitle",
    },
    {
      Header: "Eligibility",
      accessor: "eligibility",
    },
    {
      Header: "Education",
      accessor: "education",
    },
    {
      Header: "Experience",
      accessor: "experience",
    },
    {
      Header: "Training",
      accessor: "training",
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
            // deleteModal={deleteModal}
          />
        )
      },
    },
  ]

  // data from fetchQualificationStandardsList()
  const {
    qualificationStandardsList,
    loadingQualificationStandardsList,
    errorQualificationStandardsList,
  } = useSelector(state => ({
    qualificationStandardsList:
      state.qualificationStandards.qualificationStandardsList,
    loadingQualificationStandardsList:
      state.qualificationStandards.loading.loadingQualificationStandardsList,
    errorQualificationStandardsList:
      state.qualificationStandards.error.errorQualificationStandardsList,
  }))

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(
    () => qualificationStandardsList,
    [qualificationStandardsList]
  )

  useEffect(() => {
    dispatch(fetchQualificationStandardsList())
  }, [dispatch])

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

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            titleUrl="/"
            breadcrumbItem="Qualification Standards"
          />

          {/* Notifications */}
          {errorQualificationStandardsList ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorQualificationStandardsList}
            />
          ) : null}

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody className="card-table">
                  {loadingQualificationStandardsList ? (
                    <LoadingIndicator />
                  ) : (
                    <TableQualificationStandard columns={columns} data={data} />
                  )}

                  <EditQSModal
                    showEdt={showEdt}
                    modalData={modalData}
                    handleCloseEdt={handleCloseEdt}
                  />
                  <DeleteQSModal
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
    </React.Fragment>
  )
}

export default QualificationStandards
