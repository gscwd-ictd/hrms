import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOGPositions, fetchOccupation } from "store/actions"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Navigate, useParams } from "react-router-dom"

import { Card, CardBody, Col, Container, Row } from "reactstrap"
import InRowAction from "components/InRowAction/InRowAction"
import EditPositionProficiencyLevelModal from "components/Modal/Competency/EditPositionProficiencyLevelModal"
import EditPositionFunctionalCompetenciesModal from "components/Modal/Competency/EditPositionFunctionalCompetenciesModal"
import TableOccupationalGroup from "components/Table/TableOccupationalGroup"
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/global.scss"

const PositionsInOccupation = props => {
  const dispatch = useDispatch()
  const { occupationId } = useParams()

  const [hideDeleteBtn, setHideDeleteBtn] = useState(true)

  const tblColumns = [
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
      Header: "Salary Grade",
      accessor: "salaryGrade",
    },
    {
      Header: "Actions",
      accessor: "",
      align: "center",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return (
          <div className="d-flex">
            <InRowAction
              cell={cell}
              buttonTitle={"Competency Setting"}
              editModal={editFuncCompetencyModal}
            />
            <InRowAction
              cell={cell}
              buttonTitle={"Proficiency Level"}
              editModal={editProficiencyLvlModal}
            />
          </div>
        )
      },
    },
  ]

  const { positions, loadingOGPositions, errorOGPositions } = useSelector(
    state => ({
      positions: state.Occupation.response.occupationalGroup,
      loadingOGPositions: state.Occupation.loading.occupationalGroupLoading,
      errorOGPositions: state.Occupation.error.occupationalGroupError,
    })
  )

  const { occupationDetails } = useSelector(state => ({
    occupationDetails: state.Occupation.response.occupation.get,
  }))

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(() => positions, [positions])

  useEffect(() => {
    dispatch(fetchOGPositions(occupationId))
    dispatch(fetchOccupation(occupationId))
  }, [dispatch])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Edit Proficiency Level Modal
  const [showProficiencyLvlEdt, setShowProficiencyLvlEdt] = useState(false)
  const handleCloseProficiencyLvlEdt = () => {
    setShowProficiencyLvlEdt(false)
    setModalData({})
  }
  const handleShowProficiencyLvlEdt = () => setShowProficiencyLvlEdt(true)

  const editProficiencyLvlModal = rowData => {
    setModalData(rowData)
    handleShowProficiencyLvlEdt()
  }

  // Edit Functional Competency Modal
  const [showFuncCompetencyEdt, setShowFuncCompetencyEdt] = useState(false)
  const handleCloseFuncCompetencyEdt = () => {
    setShowFuncCompetencyEdt(false)
    setModalData({})
  }
  const handleShowFuncCompetencyEdt = () => setShowFuncCompetencyEdt(true)

  const editFuncCompetencyModal = rowData => {
    setModalData(rowData)
    handleShowFuncCompetencyEdt()
  }

  return (
    <React.Fragment>
      <Can I="access" this="Competency">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs
              title="Competency"
              titleUrl="/competency"
              breadcrumbItem={occupationDetails.occupationName}
            />

            {errorOGPositions ? (
              <ToastrNotification
                toastType={"error"}
                notifMessage={errorOGPositions}
              />
            ) : null}

            <Container fluid={true}>
              <Row>
                <Col>
                  <Card className="card-table">
                    <CardBody>
                      {loadingOGPositions ? (
                        <LoadingIndicator />
                      ) : (
                        <TableOccupationalGroup
                          columns={columns}
                          data={data}
                          hideDeleteBtn={hideDeleteBtn}
                        />
                      )}

                      <EditPositionFunctionalCompetenciesModal
                        showEdt={showFuncCompetencyEdt}
                        handleCloseEdt={handleCloseFuncCompetencyEdt}
                        modalData={modalData}
                      />

                      <EditPositionProficiencyLevelModal
                        showEdt={showProficiencyLvlEdt}
                        handleCloseEdt={handleCloseProficiencyLvlEdt}
                        modalData={modalData}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Can>

      <Can not I="access" this="Competency">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default PositionsInOccupation
