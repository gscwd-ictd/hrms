import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOccupation, fetchOccupationDuties } from 'store/actions'
import PropTypes from 'prop-types'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import Breadcrumbs from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// reworked duties and responsibilities
import AddDutyModal from 'components/Modal/Duties/AddDutyModal'
import EditDutyModal from 'components/Modal/Duties/EditDutyModal'
import DeleteDutyModal from 'components/Modal/Duties/DeleteDutyModal'
import TableDutiesResponsibilities from 'components/Table/TableDutiesResponsibilities'
import InRowAction from 'components/InRowAction/InRowAction'

// style
import 'styles/custom_gscwd/global.scss'

const OccupationDuties = () => {
  const dispatch = useDispatch()
  const { occupationId } = useParams()

  const tblColumns = [
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Actions',
      accessor: '',
      align: 'center',
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

  // Redux state for specific occupation details
  const { occupation } = useSelector(state => ({
    occupation: state.Occupation.response.occupation.get,
  }))

  // Redux state for current duties under the occupation
  const {
    occupationDutyResponsibilities,
    loadingOccupationDutyResponsibilities,
    errorOccupationDutyResponsibilities,
  } = useSelector(state => ({
    occupationDutyResponsibilities:
      state.dutiesResponsibilities.response.occupationDutyResponsibilities,
    loadingOccupationDutyResponsibilities:
      state.dutiesResponsibilities.loading
        .loadingOccupationDutyResponsibilities,
    errorOccupationDutyResponsibilities:
      state.dutiesResponsibilities.error.errorOccupationDutyResponsibilities,
  }))

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(
    () => occupationDutyResponsibilities,
    [occupationDutyResponsibilities]
  )

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Add Modal
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

  // Delete Modal
  const [showDel, setShowDel] = useState(false)
  const handleCloseDel = () => setShowDel(false)
  const handleShowDel = () => setShowDel(true)

  const deleteModal = rowData => {
    setModalData(rowData)
    handleShowDel()
  }

  // get specific occupation details
  useEffect(() => {
    dispatch(fetchOccupation(occupationId))
    dispatch(fetchOccupationDuties(occupationId))
  }, [occupationId, dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Occupations">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Occupations"
              titleUrl="/occupations"
              breadcrumbItem={
                occupation ? occupation.occupationName : 'Occupation Duties'
              }
            />

            {/* Notifications */}
            {errorOccupationDutyResponsibilities ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorOccupationDutyResponsibilities}
              />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {loadingOccupationDutyResponsibilities ? (
                      <LoadingIndicator />
                    ) : (
                      <>
                        <div className="top-right-actions">
                          <div className="form-group add-btn">
                            <button
                              onClick={handleShowAdd}
                              className="btn btn-info waves-effect waves-light"
                            >
                              <i className="fas fa-plus-square"></i> Add Duty &
                              Responsibility
                            </button>
                          </div>
                        </div>
                        <TableDutiesResponsibilities
                          columns={columns}
                          data={data}
                        />
                      </>
                    )}
                    <AddDutyModal
                      showAdd={showAdd}
                      handleCloseAdd={handleCloseAdd}
                      occupationId={occupationId}
                    />
                    <EditDutyModal
                      showEdt={showEdt}
                      modalData={modalData}
                      handleCloseEdt={handleCloseEdt}
                      occupationId={occupationId}
                    />
                    <DeleteDutyModal
                      showDel={showDel}
                      handleCloseDel={handleCloseDel}
                      modalData={modalData}
                      occupationId={occupationId}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Occupations">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

OccupationDuties.propTypes = {
  cell: PropTypes.any,
}

export default OccupationDuties
