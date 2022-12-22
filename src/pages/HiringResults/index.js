import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { fetchPublicationsWithHiredApplicants } from "store/actions"

import TableHiringResults from "components/Table/TableHiringResults"
import { Container, Row, Col, Card, CardBody, Button, Input } from "reactstrap"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import Breadcrumb from "components/Common/Breadcrumb"
import ToastrNotification from "components/Notifications/ToastrNotification"
import HiredApplicants from "components/Modal/HiringResults/HiredApplicants"

// style
import "styles/custom_gscwd/components/table.scss"

const HiringResults = props => {
  const dispatch = useDispatch()

  // current state of input for appointment effectivity
  // const [printRoH, setPrintRoH] = useState(false) // state to check if table has content then user can print
  // const [appointmentEffectivityDate, setAppointmentEffectivityDate] =
  //   useState("")

  const hiredApplicantsColumns = [
    {
      Header: "ID",
      accessor: "vppId",
      disableGlobalFilter: true,
      vertical: "middle",
    },
    {
      Header: "Position Title",
      accessor: "positionTitle",
      vertical: "middle",
    },
    {
      Header: "Assigned To",
      accessor: "assignedTo",
      vertical: "middle",
    },
    {
      Header: "Plantilla No/s.",
      accessor: "plantillaNumber",
      vertical: "middle",
    },
    {
      Header: "Selected Applicant/s",
      accessor: "selected",
      vertical: "middle",
    },
    {
      Header: "Effectivity Date",
      accessor: "effectivityDate",
      vertical: "middle",
    },
    // {
    //   Header: "SELECTED APPLICANT/S",
    //   accessor: "selected",
    //   vertical: "middle",
    // },

    {
      Header: "Actions",
      accessor: "",
      align: "center",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return (
          <Button
            onClick={() => openHiredApplicantsModal(cell.row.values)}
            className="btn btn-info waves-effect waves-light"
          >
            <i className="fas fa-user-check"></i> Applicants
          </Button>

          // <Link
          //   to={
          //     props.location.pathname +
          //     "/results-of-hiring-pdf/" +
          //     cell.row.original.effectivityDate
          //   }
          // >
          //   <Button className="btn btn-info waves-effect waves-light">
          //     DBM-CSC Additional Data
          //   </Button>
          // </Link>
        )
      },
    },
  ]

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

  const columns = useMemo(() => hiredApplicantsColumns, [])
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
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Dashboard"
            titleUrl="/"
            breadcrumbItem="Hiring Results"
          />

          {errorPublicationsWithHiredApplicants ? (
            <ToastrNotification
              toastType={"error"}
              notifMessage={errorPublicationsWithHiredApplicants}
            />
          ) : null}
          <Card>
            <CardBody className="card-table">
              {loadingPublicationsWithHiredApplicants ? (
                <LoadingIndicator />
              ) : (
                <>
                  <div className="multi-select-top-right-actions">
                    {/* <Row className="justify-content-end">
                      <Col md={8}>
                        <Input
                          type="date"
                          onChange={e =>
                            setInputAppointmentDate(e.target.value)
                          }
                        />
                      </Col>
                      <Col md={2}>
                        <Button
                          className="btn btn-info w-100"
                          onClick={() => handleFetchHiredApplicants()}
                          disabled={
                            !isEmpty(inputAppointmentDate) ? false : true
                          }
                        >
                          Search
                        </Button>
                      </Col>
                    </Row> */}
                  </div>

                  <TableHiringResults columns={columns} data={data} />
                </>
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
    </React.Fragment>
  )
}

HiringResults.propTypes = {
  location: PropTypes.object,
  cell: PropTypes.any,
}

export default HiringResults
