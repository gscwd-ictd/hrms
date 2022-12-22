import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import { fetchFunctionalCompetencies } from "store/actions"

// modal components
import InRowAction from "components/InRowAction/InRowAction"
import EditCompetencyModelModal from "components/Modal/Competency/EditCompetencyModelModal"

// table components
import TableCompetencyModel from "components/Table/TableCompetencyModel"
import { SelectColumnFilter } from "components/Filters/SelectColumnFilter"

// extra components
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/global.scss"

const FunctionalModels = () => {
  const dispatch = useDispatch()

  const tblColumns = [
    {
      Header: "ID",
      accessor: "competencyId",
      disableGlobalFilter: true,
    },
    {
      Header: "Occupation Code",
      accessor: "occupationCode",
      Filter: SelectColumnFilter,
      filter: "includes",
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
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return <InRowAction cell={cell} editCompetencyModel={editModal} />
      },
    },
  ]

  const { functionalModels, isLoading, error } = useSelector(state => ({
    functionalModels: state.competencyModel.functionalModels,
    isLoading: state.competencyModel.loading.loadingFunctionalModels,
    error: state.competencyModel.error.errorFunctionalModels,
  }))

  const columns = useMemo(() => tblColumns, [])
  const functionalModelData = useMemo(
    () => functionalModels,
    [functionalModels]
  )

  useEffect(() => {
    dispatch(fetchFunctionalCompetencies())
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
          <Breadcrumbs
            title="Model"
            breadcrumbItem="Functional Competency Models"
          />
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
                        data={functionalModelData}
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

export default FunctionalModels
