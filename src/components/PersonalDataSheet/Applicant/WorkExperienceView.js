import React, { useMemo, useState } from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"

import TableBase from "components/Table/TableBase"
import InRowAction from "components/InRowAction/InRowAction"
import ViewWorkExpModal from "components/Modal/PersonalDataSheet/ViewWorkExpModal"

const WorkExperienceView = props => {
  const { workExperience, formatDate } = props

  const tableColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Position Title",
      accessor: "positionTitle",
    },
    {
      Header: "Company Name",
      accessor: "companyName",
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
  const data = useMemo(() => workExperience, [workExperience])

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
          {!isEmpty(workExperience) ? (
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

      <ViewWorkExpModal
        showView={showView}
        handleCloseView={handleCloseView}
        modalData={modalData}
        formatDate={formatDate}
      />
    </React.Fragment>
  )
}

WorkExperienceView.propTypes = {
  workExperience: PropTypes.arrayOf(
    PropTypes.shape({
      positionTitle: PropTypes.string,
      companyName: PropTypes.string,
      monthlySalary: PropTypes.number,
      salaryGrade: PropTypes.string,
      appointmentStatus: PropTypes.string,
      isGovernmentService: PropTypes.number,
      from: PropTypes.string,
      to: PropTypes.string,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default WorkExperienceView
