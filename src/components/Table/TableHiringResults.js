import React, { useState } from 'react'

import PropTypes from 'prop-types'

import { Table } from 'reactstrap'
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useTable,
  useSortBy,
} from 'react-table'
import { GlobalFilter } from 'components/Filters/GlobalFilter'
import { Button } from 'reactstrap'
import PrintResultsOfHiring from 'components/Modal/HiringResults/PrintResultsOfHiring'
import PrintReportOnAppointmentsIssued from 'components/Modal/HiringResults/PrintReportOnAppointmentsIssued'

// style
import '../../styles/custom_gscwd/components/table.scss'

const TableHiringResults = props => {
  const { columns, data } = props

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: ['vppId'],
        pageSize: 20,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = tableInstance

  const { globalFilter, pageIndex, pageSize } = state

  /**
   * Modal
   */
  const [showPrintRoH, setShowPrintRoH] = useState(false)
  const handleClosePrintRoH = () => setShowPrintRoH(false)
  const handleShowPrintRoH = () => setShowPrintRoH(true)

  const [showPrintRAI, setShowPrintRAI] = useState(false)
  const handleClosePrintRAI = () => setShowPrintRAI(false)
  const handleShowPrintRAI = () => setShowPrintRAI(true)

  return (
    <>
      <div className="flex-container filters-wrapper">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <div className="column-filters">
          {headerGroups.map(headerGroup =>
            headerGroup.headers.map(column =>
              column.Filter ? (
                <div className="mt-2 sm:mt-0" key={column.id}>
                  {column.render('Filter')}
                </div>
              ) : null
            )
          )}
        </div>
      </div>

      <Table
        {...getTableProps()}
        className="table mb-0 wd-table"
        hover
        responsive
      >
        <thead className="thead-light">
          {headerGroups.map((headerGroup, hGi) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={hGi}>
              {headerGroup.headers.map((column, hi) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={hi}
                  className={'th_' + column.getHeaderProps('Header').key}
                >
                  {column.render('Header')}
                  {/* Sort */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="bx bx-up-arrow pl-1"></i>
                      ) : (
                        <i className="bx bx-down-arrow pl-1"></i>
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, ri) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={ri}>
                {row.cells.map((cell, ci) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={ci}
                      style={
                        cell.column.vertical
                          ? {
                              verticalAlign: 'middle',
                            }
                          : {}
                      }
                    >
                      <div
                        style={
                          cell.column.align
                            ? {
                                width: 'fit-content',
                                margin: 'auto',
                              }
                            : {}
                        }
                      >
                        <p>{cell.render('Cell')}</p>
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>

      <div className="table-footer">
        <div className="left-footer-container">
          <div className="d-flex flex-wrap gap-2">
            <Button
              onClick={handleShowPrintRoH}
              className="btn btn-info waves-effect waves-light"
            >
              <i className="bx bx-printer"></i> Results of Hiring
            </Button>

            <Button
              onClick={handleShowPrintRAI}
              className="btn btn-info waves-effect waves-light"
            >
              <i className="bx bx-printer"></i> Report on Appointments Issued
            </Button>
          </div>

          {/* <Link
            style={
              printRoH
                ? { pointerEvents: "inherit" }
                : { pointerEvents: "none" }
            }
            to={
              "/results-of-hiring-pdf/" + formatDate(appointmentEffectivityDate)
            }
            target="_blank"
          >
            <Button
              className="btn btn-info waves-effect waves-light"
              disabled={printRoH ? false : true}
            >
              <i className="bx bx-printer"></i> Results of Hiring PDF
            </Button>
          </Link> */}
        </div>
        <div className="wd-pagination pagination justify-content-end">
          {/* Next and Previous button */}
          <div className="next-prev-btn-container">
            <button
              className="page-link"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {'Previous'}
            </button>{' '}
            <button
              className="page-link"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {'Next'}
            </button>{' '}
          </div>

          {/* Page number */}
          <div className="pagenumber-container">
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </div>

          {/* Dropdown page size */}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
            className="form-control wd-filter-pagesize"
          >
            {[20, 30, 40, 50].map((pageSize, i) => (
              <option key={i} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      <PrintResultsOfHiring
        showPrintRoH={showPrintRoH}
        handleClosePrintRoH={handleClosePrintRoH}
      />

      <PrintReportOnAppointmentsIssued
        showPrintRAI={showPrintRAI}
        handleClosePrintRAI={handleClosePrintRAI}
      />
    </>
  )
}

TableHiringResults.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
}

export default TableHiringResults
