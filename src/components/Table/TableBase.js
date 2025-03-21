import React from 'react'
import { Table } from 'reactstrap'
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useTable,
  useSortBy,
} from 'react-table'
import { GlobalFilter } from 'components/Filters/GlobalFilter'
import PropTypes from 'prop-types'

const TableBase = props => {
  const { columns, data } = props

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: ['_id'],
        pageSize: 15,
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

  return (
    <>
      <div className="flex-container filters-wrapper">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
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
                  style={{ textAlign: column.align ? 'center' : 'left' }}
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
              <tr
                {...row.getRowProps()}
                key={ri}
                style={{ verticalAlign: 'middle' }}
              >
                {row.cells.map((cell, ci) => {
                  return (
                    <td {...cell.getCellProps()} key={ci}>
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
                        {cell.render('Cell')}
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
        <div className="left-footer-container"></div>
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
          {/* <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
            className="form-control wd-filter-pagesize"
          >
            {[10, 20, 30, 40, 50].map((pageSize, i) => (
              <option key={i} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select> */}
        </div>
      </div>
    </>
  )
}

TableBase.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
}

export default TableBase
