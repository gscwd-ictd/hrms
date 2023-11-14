import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalaryGradeList, resetSalaryGradeResponses } from 'store/actions'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'

import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Table,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
  Button,
  TabContent,
} from 'reactstrap'
import UploadSalaryGradeListModal from 'components/Modal/SalaryGrade/UploadSalaryGradeListModal'
import Breadcrumbs from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/components/table.scss'
import PropTypes from 'prop-types'

const TableSalaryGrade = props => {
  const { tabs, currentTab } = props

  const { isLoading } = useSelector(state => ({
    isLoading: state.salaryGrade.loading.loadingSalaryGrade,
  }))

  return (
    <>
      <div>
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
                {tabs[currentTab].content.map((sGRow, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{sGRow[0]}</th>
                      <td>{sGRow[1] || '-'}</td>
                      <td>{sGRow[2] || '-'}</td>
                      <td>{sGRow[3] || '-'}</td>
                      <td>{sGRow[4] || '-'}</td>
                      <td>{sGRow[5] || '-'}</td>
                      <td>{sGRow[6] || '-'}</td>
                      <td>{sGRow[7] || '-'}</td>
                      <td>{sGRow[8] || '-'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  )
}

TableSalaryGrade.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object),
  currentTab: PropTypes.number,
}

export default TableSalaryGrade
