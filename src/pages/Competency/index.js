import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOccupations, resetOGCompetencies } from "store/actions"
import { Can } from "casl/Can"
import { Navigate, useLocation } from "react-router-dom"

import { Card, CardBody, Col, Row } from "reactstrap"
import InRowAction from "components/InRowAction/InRowAction"
import TableOccupations from "components/Table/TableOccupations"
import Breadcrumbs from "components/Common/Breadcrumb"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

const Competency = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const occupationColumns = [
    {
      Header: "ID",
      accessor: "_id",
      disableGlobalFilter: true,
    },
    {
      Header: "Occupation Name",
      accessor: "occupationName",
    },
    {
      Header: "Actions",
      accessor: "",
      align: "center",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return (
          <div className="d-flex">
            <InRowAction
              buttonTitle={"Competencies"}
              editRedirectUrl={
                location.pathname + "/" + cell.row.values._id + "/competencies"
              }
            />{" "}
            <InRowAction
              buttonTitle={"Positions"}
              viewRedirectUrl={
                location.pathname + "/" + cell.row.values._id + "/positions"
              }
            />
          </div>
        )
      },
    },
  ]

  const { occupations, isLoading, error } = useSelector(state => ({
    occupations: state.Occupation.response.occupations,
    isLoading: state.Occupation.loading.occupationsLoading,
    error: state.Occupation.error.occupationsError,
  }))

  const columns = useMemo(() => occupationColumns, [])
  const data = useMemo(() => occupations, [occupations])

  useEffect(() => {
    dispatch(fetchOccupations())
    dispatch(resetOGCompetencies())
  }, [dispatch])

  return (
    <>
      <Can I="access" this="Competency">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs breadcrumbItem="Competencies" />

            {error ? (
              <ToastrNotification toastType={"error"} notifMessage={error} />
            ) : null}

            <Row>
              <Col>
                <Card className="card-table">
                  <CardBody>
                    {isLoading ? (
                      <LoadingIndicator />
                    ) : (
                      <TableOccupations columns={columns} data={data} />
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Can>

      <Can not I="access" this="Competency">
        <Navigate to="/page-404" />
      </Can>
    </>
  )
}

export default Competency
