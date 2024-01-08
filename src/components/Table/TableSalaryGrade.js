import React from 'react'
import { useSelector } from 'react-redux'

import { Table } from 'reactstrap'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'

// style
import 'styles/custom_gscwd/components/table.scss'
import PropTypes from 'prop-types'

const TableSalaryGrade = props => {
  const { tabs, currentTab } = props

  const { isLoading } = useSelector(state => ({
    isLoading: state.salaryGrade.loading.loadingSalaryGrade,
  }))

  const content = tabs[currentTab] ? tabs[currentTab].content : []

  return (
    <>
      <div>
        {isLoading ? (
          <LoadingIndicator />
        ) : content.length > 0 ? (
          <div className="table-responsive pt-3">
            <Table className="table table-bordered mb-0" key={content.length}>
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
                {content.map((sGRow, index) => {
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
        ) : (
          <LoadingIndicator />
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