import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOccupations, resetOccupationResponses } from 'store/actions'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'

import { Card, CardBody, Col, Row } from 'reactstrap'
import InRowAction from 'components/InRowAction/InRowAction'
import AddOccupationModal from 'components/Modal/Occupation/AddOccupationModal'
import EditOccupationModal from 'components/Modal/Occupation/EditOccupationModal'
import TableOccupations from 'components/Table/TableOccupations'
import Breadcrumbs from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/components/table.scss'

const Occupation = () => {
  const dispatch = useDispatch()

  const occupationColumns = [
    {
      Header: 'ID',
      accessor: '_id',
      disableGlobalFilter: true,
    },
    {
      Header: 'Occupation Name',
      accessor: 'occupationName',
    },
    {
      Header: 'Actions',
      align: 'center',
      accessor: '',
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return (
          <div className="d-flex">
            <InRowAction
              buttonTitle={'Positions'}
              viewRedirectUrl={'/occupational-group/' + cell.row.values._id}
            />
            <InRowAction
              buttonTitle={'Duties'}
              viewRedirectUrl={'/occupation-duties/' + cell.row.values._id}
            />
            <InRowAction cell={cell} editModal={editModal} />
          </div>
        )
      },
    },
  ]

  const { occupations, isLoading, error } = useSelector(state => ({
    occupations: state.Occupation.response.occupations,
    isLoading: state.Occupation.loading.occupationsLoading,
    error: state.Occupation.error.occupationsError,
  }))

  const columns = useMemo(() => occupationColumns, [])
  const data = useMemo(() => occupations, [occupations])

  useEffect(() => {
    dispatch(fetchOccupations())
    dispatch(resetOccupationResponses())
  }, [dispatch])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Add Occupation Modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  // Edit Modal
  const [showEdt, setShowEdt] = useState(false)

  const handleCloseEdt = () => setShowEdt(false)
  const handleShowEdt = () => setShowEdt(true)

  const editModal = rowData => {
    setModalData(rowData)
    handleShowEdt()
  }

  return (
    <>
      <Can I="access" this="Occupations">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs breadcrumbItem="Occupations" />

            {error ? (
              <ToastrNotification toastType={'error'} notifMessage={error} />
            ) : null}

            <Row>
              <Col>
                <Card>
                  <CardBody className="card-table">
                    {isLoading ? (
                      <LoadingIndicator />
                    ) : (
                      <>
                        <div className="top-right-actions">
                          <div className="form-group add-btn">
                            <button
                              onClick={handleShowAdd}
                              className="btn btn-info waves-effect waves-light"
                            >
                              <i className="fas fa-plus-square"></i> Add
                              Occupation
                            </button>
                          </div>
                        </div>
                        <TableOccupations columns={columns} data={data} />
                      </>
                    )}

                    <AddOccupationModal
                      showAdd={showAdd}
                      handleCloseAdd={handleCloseAdd}
                    />
                    <EditOccupationModal
                      showEdt={showEdt}
                      modalData={modalData}
                      handleCloseEdt={handleCloseEdt}
                    />
                    {/* <DeleteOccupationModal
                      showDel={showDel}
                      modalData={modalData}
                      handleCloseDel={handleCloseDel}
                    /> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Can>

      <Can not I="access" this="Occupations">
        <Navigate to="/page-404" />
      </Can>
    </>
  )
}

export default Occupation
