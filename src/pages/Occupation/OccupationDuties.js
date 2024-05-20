import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchOccupation,
  fetchOccupationDuties,
  fetchAvailableDuties,
  addAssignOccupationDuties,
  removeUnassignOccupationDuties,
  resetOccupationResponses,
  resetDutiesResponse,
  selectDutyCheckBox,
  unselectDutyCheckBox,
  resetDutyCheckBoxes,
} from 'store/actions'
import PropTypes from 'prop-types'
import { Can } from 'casl/Can'
import { Navigate, useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'

import Select from 'react-select'
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button,
  Input,
  Spinner,
} from 'reactstrap'
import TableOccupationDuties from 'components/Table/TableOccupationDuties'
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

const OccupationDuties = props => {
  const dispatch = useDispatch()
  const { occupationId } = useParams()

  const [selectedDuties, setSelectedDuties] = useState([])
  const [disableDeleteBtn, setDisableDeleteBtn] = useState(true)
  const [hideDeleteBtn, setHideDeleteBtn] = useState(false)
  const [disableAssignBtn, setDisableAssignBtn] = useState(true)

  // Redux state for specific occupation details
  const { occupation } = useSelector(state => ({
    occupation: state.Occupation.response.occupation.get,
  }))

  // Redux state for current positions under the occupation
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

  //  Redux state for Multi-Select. Duties without occupation assignment
  const {
    availableDutyResponsibilities,
    loadingAvailableDutyResponsibilities,
    errorAvailableDutyResponsibilities,
  } = useSelector(state => ({
    availableDutyResponsibilities:
      state.dutiesResponsibilities.response.availableDutyResponsibilities,
    loadingAvailableDutyResponsibilities:
      state.dutiesResponsibilities.loading.loadingAvailableDutyResponsibilities,
    errorAvailableDutyResponsibilities:
      state.dutiesResponsibilities.error.errorAvailableDutyResponsibilities,
  }))

  // Redux state for assigning and unassigning positions to occupations
  const { assignedDutyResponsibilities, unassignedDutyResponsibilities } =
    useSelector(state => ({
      assignedDutyResponsibilities:
        state.dutiesResponsibilities.response.assignedDutyResponsibilities,
      unassignedDutyResponsibilities:
        state.dutiesResponsibilities.response.unassignedDutyResponsibilities,
    }))

  // Reducer state for checked rows
  const { selectedRows } = useSelector(state => ({
    selectedRows: state.dutiesResponsibilities.selectedRows,
  }))

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

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(
    () => occupationDutyResponsibilities,
    [occupationDutyResponsibilities]
  )

  // Multi-select dropdown
  const handleMultiSelect = selectedMulti => {
    let array = []
    selectedMulti.map(option => {
      const dutyResponsibilityId = option.value.dutyResponsibilityId
      array.push(dutyResponsibilityId)
    })
    setSelectedDuties(array)
  }

  // Checkbox action
  const handleCheckBox = (cellRowValues, isChecked) => {
    if (isChecked) {
      dispatch(selectDutyCheckBox(cellRowValues.values.odrId))
    } else {
      dispatch(unselectDutyCheckBox(cellRowValues.values.odrId))
    }
  }

  // Assigning of duties to occupation
  const handleAssignPositions = () => {
    const dutyResponsibilityIds = {
      dutyResponsibilityIds: selectedDuties,
    }
    dispatch(addAssignOccupationDuties(occupationId, dutyResponsibilityIds))
  }

  // Unassigning of duties from occupation
  const handleDeleteRows = () => {
    if (!isEmpty(selectedRows)) {
      const odrIds = {
        odrIds: selectedRows,
      }

      dispatch(removeUnassignOccupationDuties(odrIds))
      setDisableDeleteBtn(true)
    }
  }

  // get specific occupation details
  useEffect(() => {
    dispatch(fetchOccupation(occupationId))
    dispatch(resetOccupationResponses())
  }, [occupationId])

  // Get duties & responsibilities assigned to the occupation
  useEffect(() => {
    if (occupationId) {
      dispatch(fetchOccupationDuties(occupationId))
      dispatch(fetchAvailableDuties(occupationId))
    }
  }, [dispatch])

  // Trigger when assigning position is success
  useEffect(() => {
    if (
      !isEmpty(assignedDutyResponsibilities) ||
      !isEmpty(unassignedDutyResponsibilities)
    ) {
      dispatch(fetchOccupationDuties(occupationId))
      dispatch(fetchAvailableDuties(occupationId))

      dispatch(resetDutiesResponse())
      dispatch(resetDutyCheckBoxes())
      setSelectedDuties([])
    }
  }, [assignedDutyResponsibilities, unassignedDutyResponsibilities])

  // Enable/Disable assign button if there is a option selected
  useEffect(() => {
    if (!isEmpty(selectedDuties)) {
      setDisableAssignBtn(false)
    } else {
      setDisableAssignBtn(true)
    }
  }, [selectedDuties])

  // Enable/Disable delete button if there is a row checked
  useEffect(() => {
    if (!isEmpty(selectedRows)) {
      setDisableDeleteBtn(false)
    } else {
      setDisableDeleteBtn(true)
    }
  }, [selectedRows])

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
                    />
                    <DeleteDutyModal
                      showDel={showDel}
                      modalData={modalData}
                      handleCloseDel={handleCloseDel}
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
