import React, { useMemo, useState } from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"

import TableBase from "components/Table/TableBase"
import InRowAction from "components/InRowAction/InRowAction"
import ViewLearnAndDevModal from "components/Modal/PersonalDataSheet/ViewLearnAndDevModal"

const LearningAndDevelopmentView = props => {
  const { learningDevelopment, formatDate } = props

  const tableColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Conducted By",
      accessor: "conductedBy",
    },
    {
      Header: "Type",
      accessor: "type",
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
  const data = useMemo(() => learningDevelopment, [learningDevelopment])

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
          {!isEmpty(learningDevelopment) ? (
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

      <ViewLearnAndDevModal
        showView={showView}
        handleCloseView={handleCloseView}
        modalData={modalData}
        formatDate={formatDate}
      />
    </React.Fragment>
  )
}

LearningAndDevelopmentView.propTypes = {
  learningDevelopment: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      type: PropTypes.string,
      numberOfHours: PropTypes.number,
      conductedBy: PropTypes.string,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default LearningAndDevelopmentView
