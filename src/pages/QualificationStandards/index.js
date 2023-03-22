import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchQualificationStandardsList,
  resetQualificationStandards,
} from "store/actions"
import { Can } from "casl/Can"
import { Navigate } from "react-router-dom"

import { Card, CardBody, Col, Row } from "reactstrap"
import InRowAction from "components/InRowAction/InRowAction"
import EditQSModal from "components/Modal/QualificationStandards/EditQSModal"
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
        return <InRowAction cell={cell} editModal={editModal} />
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
    dispatch(resetQualificationStandards())
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

  return (
    <React.Fragment>
      <Can I="access" this="Qualification_standards">
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
                      <TableQualificationStandard
                        columns={columns}
                        data={data}
                      />
                    )}

                    <EditQSModal
                      showEdt={showEdt}
                      modalData={modalData}
                      handleCloseEdt={handleCloseEdt}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Can>

      <Can not I="access" this="Qualification_standards">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default QualificationStandards
