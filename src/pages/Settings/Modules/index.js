import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHrmsModules, resetModuleResponse } from 'store/actions'

import { Row, Col, Card, CardBody, Container } from 'reactstrap'
import TableBase from 'components/Table/TableBase'
import Breadcrumbs from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import InRowAction from 'components/InRowAction/InRowAction'
import AddModuleModal from 'components/Modal/Modules/AddModuleModal'
import EditModuleModal from 'components/Modal/Modules/EditModuleModal'

const Modules = () => {
  const dispatch = useDispatch()

  const tableColumns = [
    {
      Header: 'ID',
      accessor: '_id',
      disableGlobalFilter: true,
    },
    {
      Header: 'Module Name',
      accessor: 'module',
    },
    {
      Header: 'Slug',
      accessor: 'slug',
    },
    {
      Header: 'URL',
      accessor: 'url',
    },
    {
      Header: 'Actions',
      accessor: '',
      align: 'center',
      disableGlobalFilter: true,
      disableSortBy: true,
      Cell: function ActionDropdown(cell) {
        return (
          <div className="d-flex">
            <InRowAction
              cell={cell}
              // buttonTitle={"Roles"}
              editModal={editModal}
            />
          </div>
        )
      },
    },
  ]

  // redux state for user list
  const { modulesList, loadingModuleList, errorResponse } = useSelector(
    state => ({
      modulesList: state.modules.modulesList,
      loadingModuleList: state.modules.loading.loadingModuleList,
      errorResponse: state.modules.error.errorResponse,
    })
  )

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => modulesList, [modulesList])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Add Module
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  // Edit Module Details
  const [showEdt, setShowEdt] = useState(false)
  const handleCloseEdt = () => setShowEdt(false)
  const handleShowEdt = () => setShowEdt(true)

  const editModal = rowData => {
    setModalData(rowData)
    handleShowEdt()
  }

  // Initial request for user list
  useEffect(() => {
    dispatch(fetchHrmsModules())
  }, [dispatch])

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Dashboard" titleUrl="/" breadcrumbItem="Modules" />

        {/* Notifications */}
        {errorResponse ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorResponse}
          />
        ) : null}

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody className="card-table">
                {loadingModuleList ? (
                  <LoadingIndicator />
                ) : (
                  <>
                    <div className="top-right-actions">
                      <div className="form-group add-btn">
                        <button
                          onClick={handleShowAdd}
                          className="btn btn-info waves-effect waves-light"
                        >
                          <i className="fas fa-plus-square"></i> Add Module
                        </button>
                      </div>
                    </div>
                    <TableBase columns={columns} data={data} />
                  </>
                )}

                {/* Modal */}
                <AddModuleModal
                  showAdd={showAdd}
                  handleCloseAdd={handleCloseAdd}
                />

                <EditModuleModal
                  showEdt={showEdt}
                  handleCloseEdt={handleCloseEdt}
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

export default Modules
