import React, { useEffect, useMemo, useState } from 'react'
import { Can } from 'casl/Can'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApplicants } from 'store/actions'
import { Card, CardBody, Col, Container, Row, Badge } from 'reactstrap'
import TableApplicants from 'components/Table/TableApplicants'
import InRowAction from 'components/InRowAction/InRowAction'
import ApplicantStatus from 'components/Modal/PersonnelSelection/Applicants/ApplicantStatus'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import Breadcrumb from 'components/Common/Breadcrumb'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const Applicants = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { publicationId } = useParams()

  const tblColumns = [
    {
      Header: 'ID',
      accessor: '_id',
      disableGlobalFilter: true,
    },
    {
      Header: 'Applicant ID',
      accessor: 'applicantId',
      disableGlobalFilter: true,
    },
    {
      Header: '#',
      accessor: '',
      disableGlobalFilter: true,
      Cell: function Status(cell) {
        return (
          <div className="avatar-xs">
            <span className="avatar-title rounded-circle">
              {cell.row.values.fullName.charAt(0)}
            </span>
          </div>
        )
      },
    },
    {
      Header: 'Name',
      accessor: 'fullName',
    },
    {
      Header: 'Type',
      accessor: 'applicantType',
    },
    {
      Header: 'Status',
      accessor: 'applicantStatus',
      Cell: function Status(cell) {
        if (cell.row.values.applicantStatus === 'For review') {
          return (
            <Badge className="me-2 bg-warning font-size-12">
              {cell.row.values.applicantStatus}
            </Badge>
          )
        } else if (cell.row.values.applicantStatus === 'Qualified') {
          return (
            <Badge className="me-2 bg-success font-size-12">
              {cell.row.values.applicantStatus}
            </Badge>
          )
        } else if (cell.row.values.applicantStatus === 'Not qualified') {
          return (
            <Badge className="me-2 bg-danger font-size-12">
              {cell.row.values.applicantStatus}
            </Badge>
          )
        }
      },
    },
    {
      Header: 'Actions',
      accessor: '',
      align: 'center',
      disableGlobalFilter: true,
      Cell: function RowActions(cell) {
        return (
          <div className="d-flex">
            <InRowAction
              buttonTitle="PDS & WES"
              viewRedirectUrl={
                location.pathname +
                '/' +
                cell.row.values.applicantId +
                '/' +
                cell.row.values._id +
                '/' +
                cell.row.values.applicantType
              }
            />

            <button
              onClick={() => changeApplicantStatus(cell.row.values)}
              className="btn btn-info waves-effect waves-light w-7"
            >
              Status <i className="fas fa-user-edit"></i>
            </button>
          </div>
        )
      },
    },
  ]

  // redux state for list of applicants
  const { applicantList, isLoading, error } = useSelector(state => ({
    applicantList: state.applicants.applicantList,
    isLoading: state.applicants.loading.loadingApplicants,
    error: state.applicants.error.errorApplicants,
  }))

  const columns = useMemo(() => tblColumns, [])
  const data = useMemo(() => applicantList, [applicantList])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Change applicant status modal
  const [showEdt, setShowEdt] = useState(false)

  const handleCloseEdt = () => setShowEdt(false)
  const handleShowEdt = () => setShowEdt(true)

  const changeApplicantStatus = rowData => {
    setModalData(rowData)
    handleShowEdt()
  }

  useEffect(() => {
    dispatch(fetchApplicants(publicationId))
  }, [dispatch])

  return (
    <React.Fragment>
      <Can I="access" this="Personnel_selection">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              title="Publication Positions"
              titleUrl={'/personnel-selection'}
              breadcrumbItem="Applicants"
            />

            {error ? (
              <ToastrNotification toastType={'error'} notifMessage={error} />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    {isLoading ? (
                      <LoadingIndicator />
                    ) : (
                      <>
                        <TableApplicants columns={columns} data={data} />
                      </>
                    )}
                    <ApplicantStatus
                      showEdt={showEdt}
                      handleCloseEdt={handleCloseEdt}
                      modalData={modalData}
                      publicationId={publicationId}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Personnel_selection">
        <Navigate to="/page-404" />
      </Can>
    </React.Fragment>
  )
}

export default Applicants
