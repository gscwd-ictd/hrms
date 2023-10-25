import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchManagerialCompetencies } from 'store/actions'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'

import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import InRowAction from 'components/InRowAction/InRowAction'
import EditCompetencyModelModal from 'components/Modal/Competency/EditCompetencyModelModal'
import TableCompetencyModel from 'components/Table/TableCompetencyModel'
import { SelectColumnFilter } from 'components/Filters/SelectColumnFilter'
import Breadcrumbs from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/global.scss'

// Competency Modals
import AddCompetencyModelModal from 'components/Modal/Competency/AddCompetencyModelModal'
import EditCompetencyModelModal2 from 'components/Modal/Competency/EditCompetencyModelModal2'

const ManagerialModels = () => {
  const dispatch = useDispatch()

  const tblColumns = [
    {
      Header: 'ID',
      accessor: 'competencyId',
      disableGlobalFilter: true,
    },
    {
      Header: 'Code',
      accessor: 'code',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Definition',
      accessor: 'desc',
    },
    {
      Header: 'Actions',
      accessor: '',
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return <InRowAction cell={cell} editCompetencyModel={editModal} />
      },
    },
  ]

  const hasSelectFilter = tblColumns.some(
    column => column.Filter === SelectColumnFilter
  )

  const { managerialModels, isLoading, error } = useSelector(state => ({
    managerialModels: state.competencyModel.managerialModels,
    isLoading: state.competencyModel.loading.loadingManagerialModels,
    error: state.competencyModel.error.errorManagerialModels,
  }))

  const columns = useMemo(() => tblColumns, [])
  const managerialModelData = useMemo(
    () => managerialModels,
    [managerialModels]
  )

  useEffect(() => {
    dispatch(fetchManagerialCompetencies())
  }, [dispatch])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Edit Modal
  const [showEdt, setShowEdt] = useState(false)

  // Add Modal
  const [showAdd, setShowAdd] = useState(false)

  const handleCloseEdt = () => setShowEdt(false)
  const handleShowEdt = () => setShowEdt(true)

  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  const editModal = rowData => {
    setModalData(rowData)
    handleShowEdt()
  }

  const addModal = rowData => {
    setModalData(rowData)
    handleShowAdd()
  }

  return (
    <React.Fragment>
      <Can I="access" this="Competency_models">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs
              title="Model"
              breadcrumbItem="Managerial Competency Models"
            />
            <Container fluid={true}>
              <Row>
                <Col>
                  <Card>
                    <CardBody className="card-table">
                      {error ? (
                        <ToastrNotification
                          toastType={'error'}
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
                                onClick={addModal}
                                className="btn btn-info waves-effect waves-light"
                              >
                                <i className="fas fa-plus-square"></i>&nbsp; Add
                                Competency
                              </button>
                            </div>
                          </div>

                          <TableCompetencyModel
                            columns={columns}
                            data={managerialModelData}
                            hasSelectFilter={hasSelectFilter}
                          />
                        </>
                      )}

                      <EditCompetencyModelModal2
                        showEdt={showEdt}
                        modalData={modalData}
                        handleCloseEdt={handleCloseEdt}
                      />

                      <AddCompetencyModelModal
                        showAdd={showAdd}
                        modalData={modalData}
                        handleCloseAdd={handleCloseAdd}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Can>

      <Can not I="access" this="Competency_models">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default ManagerialModels
