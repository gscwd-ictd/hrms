import { useState, React } from 'react'
import { Button, Table } from 'reactstrap'
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useTable,
  useSortBy,
} from 'react-table'
import { GlobalFilter } from 'components/Filters/GlobalFilter'
import PropTypes from 'prop-types'

// styles
import 'styles/custom_gscwd/components/table.scss'

const TableCompetencyModel = props => {
  const { columns, data, hasSelectFilter } = props

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: ['competencyId'],
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
    setAllFilters,
  } = tableInstance

  const { globalFilter, pageIndex, pageSize } = state

  const revertSelectFilter = event => {
    event.preventDefault()
    setAllFilters([])
  }

  return (
    <>
      {/* <div className="flex-container filters-wrapper items-center justify-between">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <div className="flex-container column-filters mx-3 items-center gap-5">
          {headerGroups.map(headerGroup =>
            headerGroup.headers.map((column, i) =>
              column.Filter ? (
                <div className={'sm:mt-0 filter-' + i} key={i}>
                  {column.render('Filter')}
                </div>
              ) : null
            )
          )}
          <button className="btn btn-primary" onClick={editModal}>
            <i className="fas fa-plus mr-1" />
            Add Competency
          </button>
        </div>
      </div> */}

      <div className="flex-container filters-wrapper">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>

      {hasSelectFilter && (
        <div className="container-fluid column-filters-row2 gap-2 my-4">
          <label className="col-md-2 col-form-label">Column Filters:</label>
          <div className="filters d-flex gap-3">
            {headerGroups.map(headerGroup =>
              headerGroup.headers.map(column =>
                column.Filter ? (
                  <div className="mt-1 filter-item" key={column.id}>
                    {column.render('Filter')}
                  </div>
                ) : null
              )
            )}
            <Button
              onClick={revertSelectFilter}
              color="light"
              outline
              className="btn-md waves-effect"
            >
              <i className="fas fa-undo"></i>
            </Button>
          </div>
        </div>
      )}
      <Table
        {...getTableProps()}
        className="table mb-0 wd-table tbl-competency-models"
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
                    <td {...cell.getCellProps()} key={ci}>
                      {cell.render('Cell')}
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
          <select
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
          </select>
        </div>
      </div>
    </>
  )
}

TableCompetencyModel.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  hasSelectFilter: PropTypes.bool,
}

export default TableCompetencyModel
