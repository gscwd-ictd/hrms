import React, { useMemo, useState } from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"

import TableBase from "components/Table/TableBase"
import InRowAction from "components/InRowAction/InRowAction"
import ViewEligibilityModal from "components/Modal/PersonalDataSheet/ViewEligibilityModal"

const EligibilityView = props => {
  const { eligibility, formatDate } = props

  const tableColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Eligibility Name",
      accessor: "name",
    },
    {
      Header: "Rating",
      accessor: "rating",
    },
    {
      Header: "License Number",
      accessor: "licenseNumber",
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
  const data = useMemo(() => eligibility, [eligibility])

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
          {!isEmpty(eligibility) ? (
            <>
              <TableBase columns={columns} data={data} />
            </>
          ) : (
            <Row className="my-2">
              <Col md={12}>
                <p className="text-danger">Not Applicable</p>
              </Col>
            </Row>
          )}
        </Col>
      </Row>

      <ViewEligibilityModal
        showView={showView}
        handleCloseView={handleCloseView}
        modalData={modalData}
        formatDate={formatDate}
      />
    </React.Fragment>
  )
}

EligibilityView.propTypes = {
  eligibility: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.string,
      examDate: PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
      }),
      examPlace: PropTypes.string,
      licenseNumber: PropTypes.string,
      validity: PropTypes.string,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default EligibilityView
