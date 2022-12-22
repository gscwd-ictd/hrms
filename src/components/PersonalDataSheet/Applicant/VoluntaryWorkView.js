import React, { useMemo, useState } from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"

import TableBase from "components/Table/TableBase"
import InRowAction from "components/InRowAction/InRowAction"
import ViewVolWorkModal from "components/Modal/PersonalDataSheet/ViewVolWorkModal"

const VoluntaryWorkView = props => {
  const { voluntaryWork, formatDate } = props

  const tableColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Organization Name",
      accessor: "organizationName",
    },
    {
      Header: "Position",
      accessor: "position",
    },
    {
      Header: "Actions",
      accessor: "",
      align: "center",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return <InRowAction cell={cell} viewModal={viewModal} />
      },
    },
  ]

  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => voluntaryWork, [voluntaryWork])

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Edit Modal
  const [showView, setShowView] = useState(false)
  const handleCloseView = () => setShowView(false)
  const handleShowView = () => setShowView(true)

  const viewModal = rowData => {
    setModalData(rowData)
    handleShowView()
  }
  return (
    <React.Fragment>
      <Row>
        <Col>
          {!isEmpty(voluntaryWork) ? (
            <>
              <TableBase columns={columns} data={data} />
            </>
          ) : (
            <Row className="mt-2">
              <Col md={12}>
                <p className="text-danger">Not Applicable</p>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <ViewVolWorkModal
        showView={showView}
        handleCloseView={handleCloseView}
        modalData={modalData}
        formatDate={formatDate}
      />
    </React.Fragment>
  )
}

VoluntaryWorkView.propTypes = {
  voluntaryWork: PropTypes.arrayOf(
    PropTypes.shape({
      organizationName: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      numberOfHours: PropTypes.number,
      position: PropTypes.string,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default VoluntaryWorkView
