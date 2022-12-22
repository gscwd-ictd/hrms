import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import { fetchCoreCompetencies } from "store/actions"

// modal components
import InRowAction from "components/InRowAction/InRowAction"
import EditCompetencyModelModal from "components/Modal/Competency/EditCompetencyModelModal"

// table components
import TableCompetencyModel from "components/Table/TableCompetencyModel"

// extra components
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/global.scss"

const CoreModels = () => {
  const dispatch = useDispatch()

  const tblColumns = [
    {
      Header: "ID",
      accessor: "competencyId",
      disableGlobalFilter: true,
    },
    {
      Header: "Code",
      accessor: "code",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Definition",
      accessor: "desc",
    },
    {
      Header: "Actions",
      accessor: "",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return <InRowAction cell={cell} editCompetencyModel={editModal} />
      },
    },
  ]

  const { coreModels, isLoading, error } = useSelector(state => ({
    coreModels: state.competencyModel.coreModels,
    isLoading: state.competencyModel.loading.loadingCoreModels,
    error: state.competencyModel.error.errorCoreModels,
  }))

  const columns = useMemo(() => tblColumns, [])
  const coreModelData = useMemo(() => coreModels, [coreModels])

  useEffect(() => {
    dispatch(fetchCoreCompetencies())
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
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Model" breadcrumbItem="Core Competency Models" />
          <Container fluid={true}>
            <Row>
              <Col>
                <Card className="card-table tabular">
                  <CardBody>
                    {error ? (
                      <ToastrNotification
                        toastType={"error"}
                        notifMessage={error}
                      />
                    ) : null}

                    {isLoading ? (
                      <LoadingIndicator />
                    ) : (
                      <TableCompetencyModel
                        columns={columns}
                        data={coreModelData}
                      />
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <EditCompetencyModelModal
        showEdt={showEdt}
        modalData={modalData}
        handleCloseEdt={handleCloseEdt}
      />
    </React.Fragment>
  )
}

export default CoreModels
