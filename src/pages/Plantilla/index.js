import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardBody, Col, Row, Container } from "reactstrap"
import { fetchPlantilla } from "store/actions"
import PropTypes from "prop-types"

// modal components
import InRowAction from "components/InRowAction/InRowAction"
import AddPositionModal from "components/Modal/Plantilla/AddPositionModal"

// table components
import TablePlantilla from "components/Table/TablePlantilla"
import { SelectColumnFilter } from "components/Filters/SelectColumnFilter"

// extra components
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/components/table.scss"

const PlantillaTable = props => {
  const dispatch = useDispatch()

  const plantillaColumns = [
    {
      Header: "ID",
      accessor: "positionId",
      disableGlobalFilter: true,
    },
    {
      Header: "Item No.",
      accessor: "itemNumber",
      sortType: "basic",
    },
    {
      Header: "Position Title",
      accessor: "positionTitle",
    },
    {
      Header: "Assigned To",
      accessor: "assignedTo",
    },
    {
      Header: "Occupation",
      accessor: "occupationName",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Actions",
      accessor: "",
      disableGlobalFilter: true,
      disableSortBy: true,
      Cell: function ActionDropdown({ cell }) {
        return (
          <InRowAction
            viewRedirectUrl={
              props.location.pathname + "/" + cell.row.values.positionId
            }
          />
        )
      },
    },
  ]

  const { plantilla, isLoading, error } = useSelector(state => ({
    plantilla: state.plantilla.list,
    isLoading: state.plantilla.isLoading,
    error: state.plantilla.error,
  }))

  const columns = useMemo(() => plantillaColumns, [])
  const data = useMemo(() => plantilla, [plantilla])

  useEffect(() => {
    dispatch(fetchPlantilla())
  }, [dispatch])

  // Add Plantilla Modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Dashboard"
            titleUrl="/"
            breadcrumbItem="Plantilla"
          />

          {error ? (
            <ToastrNotification toastType={"error"} notifMessage={error} />
          ) : null}

          <Row>
            <Col lg={12}>
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
                            <i className="fas fa-plus-square"></i> Add New
                            Position
                          </button>
                        </div>
                      </div>
                      <TablePlantilla columns={columns} data={data} />
                    </>
                  )}

                  <AddPositionModal
                    showAdd={showAdd}
                    handleCloseAdd={handleCloseAdd}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

PlantillaTable.propTypes = {
  location: PropTypes.object,
  cell: PropTypes.any,
}

export default PlantillaTable
