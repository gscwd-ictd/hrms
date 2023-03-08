import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSalaryGradeList } from "store/actions"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import { Card, CardBody, Col, Row, Container, Table } from "reactstrap"
import UploadSalaryGradeListModal from "components/Modal/SalaryGrade/UploadSalaryGradeListModal"
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/components/table.scss"

const SalaryGrade = props => {
  const dispatch = useDispatch()

  // redux state for salary grade table
  const { salaryGradeList, isLoading, error } = useSelector(state => ({
    salaryGradeList: state.salaryGrade.response.salaryGradeList,
    isLoading: state.salaryGrade.loading.loadingSalaryGrade,
    error: state.salaryGrade.error.errorSalaryGrade,
  }))

  useEffect(() => {
    dispatch(fetchSalaryGradeList())
  }, [dispatch])

  // Upload salary grade file modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  return (
    <>
      <Can I="access" this="Salary_grade">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Salary Grade"
            />

            {error ? (
              <ToastrNotification toastType={"error"} notifMessage={error} />
            ) : null}

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="card-table">
                    <div>
                      <div className="form-group add-btn">
                        <button
                          onClick={handleShowAdd}
                          className="btn btn-info waves-effect waves-light"
                        >
                          <i className="fas fa-file-upload"></i> &nbsp;&nbsp;
                          Upload SG Document
                        </button>
                      </div>
                    </div>

                    {isLoading ? (
                      <LoadingIndicator />
                    ) : (
                      <div className="table-responsive pt-3">
                        <Table className="table table-bordered mb-0">
                          <thead>
                            <tr>
                              <th></th>
                              <th>1</th>
                              <th>2</th>
                              <th>3</th>
                              <th>4</th>
                              <th>5</th>
                              <th>6</th>
                              <th>7</th>
                              <th>8</th>
                            </tr>
                          </thead>
                          <tbody>
                            {salaryGradeList.map((sGRow, index) => {
                              return (
                                <tr key={index}>
                                  <th scope="row">{sGRow[0]}</th>
                                  <td>{sGRow[1] || "-"}</td>
                                  <td>{sGRow[2] || "-"}</td>
                                  <td>{sGRow[3] || "-"}</td>
                                  <td>{sGRow[4] || "-"}</td>
                                  <td>{sGRow[5] || "-"}</td>
                                  <td>{sGRow[6] || "-"}</td>
                                  <td>{sGRow[7] || "-"}</td>
                                  <td>{sGRow[8] || "-"}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </Table>
                      </div>
                    )}

                    <UploadSalaryGradeListModal
                      showAdd={showAdd}
                      handleCloseAdd={handleCloseAdd}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Salary_grade">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </>
  )
}

SalaryGrade.propTypes = {
  location: PropTypes.object,
}

export default SalaryGrade
