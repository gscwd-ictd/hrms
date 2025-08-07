import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPublicationsWithHiredApplicants } from 'store/actions'
import TableHiringResults from 'components/Table/TableHiringResults'
import { Container, Card, CardBody, Button } from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import Breadcrumb from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import HiredApplicants from 'components/Modal/HiringResults/HiredApplicants'
import { CapitalizeEachWord } from 'functions/CapitalizeEachWord'

// style
import 'styles/custom_gscwd/components/table.scss'

const HiringResults = () => {
  const dispatch = useDispatch()

  const tableColumns = [
    {
      Header: 'ID',
      accessor: 'vppId',
      disableGlobalFilter: true,
      vertical: 'middle',
    },
    {
      Header: 'Position Title',
      accessor: 'positionTitle',
      vertical: 'middle',
    },
    {
      Header: 'Assigned To',
      accessor: 'assignedTo',
      vertical: 'middle',
    },
    {
      Header: 'Plantilla No/s.',
      accessor: 'plantillaNumber',
      vertical: 'middle',
    },
    {
      Header: 'Selected Applicant/s',
      accessor: 'selected',
      vertical: 'middle',
    },
    {
      Header: 'Effectivity Date',
      accessor: 'effectivityDate',
      vertical: 'middle',
    },
    {
      Header: 'Actions',
      accessor: '',
      align: 'center',
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return (
          <Button
            onClick={() => openHiredApplicantsModal(cell.row.values)}
            className="btn btn-info waves-effect waves-light"
          >
            <i className="fas fa-user-check"></i> Applicants
          </Button>
        )
      },
    },
  ]

  // redux state for publications with hired applicants
  const {
    publicationsWithHiredApplicants,
    loadingPublicationsWithHiredApplicants,
    errorPublicationsWithHiredApplicants,
  } = useSelector(state => ({
    publicationsWithHiredApplicants:
      state.publications.publicationsWithHiredApplicants,
    loadingPublicationsWithHiredApplicants:
      state.publications.loading.loadingPublicationsWithHiredApplicants,
    errorPublicationsWithHiredApplicants:
      state.publications.error.errorPublicationsWithHiredApplicants,
  }))

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(
    () => publicationsWithHiredApplicants,
    [publicationsWithHiredApplicants]
  )

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Open modal for hired applicants
  const [showHiredApplicants, setShowHiredApplicants] = useState(false)
  const handleCloseHiredApplicantsModal = () => setShowHiredApplicants(false)
  const handleShowHiredApplicantsModal = () => setShowHiredApplicants(true)

  const openHiredApplicantsModal = rowData => {
    setModalData(rowData)
    handleShowHiredApplicantsModal()
  }

  useEffect(() => {
    dispatch(fetchPublicationsWithHiredApplicants())
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Results_of_hiring">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Hiring Results"
            />

            {errorPublicationsWithHiredApplicants ? (
              <ToastrNotification
                toastType={'error'}
                notifMessage={errorPublicationsWithHiredApplicants}
              />
            ) : null}

            <Card>
              <CardBody className="card-table">
                {loadingPublicationsWithHiredApplicants ? (
                  <LoadingIndicator />
                ) : (
                  <TableHiringResults columns={columns} data={data} />
                )}

                <HiredApplicants
                  modalData={modalData}
                  showHiredApplicants={showHiredApplicants}
                  handleCloseHiredApplicantsModal={
                    handleCloseHiredApplicantsModal
                  }
                />
              </CardBody>
            </Card>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Results_of_hiring">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

HiringResults.propTypes = {
  cell: PropTypes.any,
}

export default HiringResults
