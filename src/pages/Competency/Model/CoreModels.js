import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCoreCompetencies } from 'store/actions'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'

import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap'
import InRowAction from 'components/InRowAction/InRowAction'
import TableCompetencyModel from 'components/Table/TableCompetencyModel'
import { SelectColumnFilter } from 'components/Filters/SelectColumnFilter'
import Breadcrumbs from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/global.scss'

// Competency Modals
import AddCompetencyModelModal from 'components/Modal/Competency/AddCompetencyModelModal'
import EditCompetencyModelModal from 'components/Modal/Competency/EditCompetencyModelModal'
import DeleteCompetencyModelModal from 'components/Modal/Competency/DeleteCompetencyModelModal'

const CoreModels = () => {
  const { competencyDomains } = useSelector(state => ({
    competencyDomains: state.competencyModel.competencyDomains,
  }))

  const coreModelComp = competencyDomains.find(
    competencyType => competencyType.type === 'Core'
  )

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
        return (
          <InRowAction
            cell={cell}
            editModal={editModal}
            deleteModal={deleteModal}
          />
        )
      },
    },
  ]

  const hasSelectFilter = tblColumns.some(
    column => column.Filter === SelectColumnFilter
  )

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

  // Add Modal
  const [showAdd, setShowAdd] = useState(false)

  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  const addModal = rowData => {
    setModalData(rowData)
    handleShowAdd()
  }

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

  const domainId = coreModelComp ? coreModelComp._id : null

  return (
    <React.Fragment>
      <Can I="access" this="Competency_models">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs
              title="Model"
              breadcrumbItem="Core Competency Models"
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
                            data={coreModelData}
                            hasSelectFilter={hasSelectFilter}
                          />
                        </>
                      )}

                      <AddCompetencyModelModal
                        showAdd={showAdd}
                        modalData={modalData}
                        handleCloseAdd={handleCloseAdd}
                        _id={domainId}
                      />

                      <EditCompetencyModelModal
                        showEdt={showEdt}
                        modalData={modalData}
                        handleCloseEdt={handleCloseEdt}
                      />

                      <DeleteCompetencyModelModal
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
        </div>
      </Can>

      <Can not I="access" this="Competency_models">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default CoreModels
