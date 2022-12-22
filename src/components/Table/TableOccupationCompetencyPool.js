import React from "react"
import { Table, Button } from "reactstrap"
import {
  useFilters,
  useGlobalFilter,
  useTable,
  usePagination,
} from "react-table"
import { GlobalFilter } from "components/Filters/GlobalFilter"
import PropTypes from "prop-types"

// styles
import "styles/custom_gscwd/components/table.scss"

const TableOccupationCompetencyPool = props => {
  const { columns, data, handleDeleteRows, disableDeleteBtn } = props

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: ["competencyId"],
      },
    },
    useFilters,
    useGlobalFilter,
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
      {/* <div className="column-filters mb-4">
        {headerGroups.map(headerGroup =>
          headerGroup.headers.map((column, i) =>
            column.Filter ? (
              <div className={"mt-2 sm:mt-0 filter-" + i} key={i}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
      </div> */}
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
                  {...column.getHeaderProps()}
                  key={hi}
                  className={"th_" + column.getHeaderProps("Header").key}
                >
                  {column.render("Header")}
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
                      {cell.render("Cell")}
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
          <Button
            className="btn btn-danger"
            onClick={() => handleDeleteRows()}
            disabled={disableDeleteBtn ? true : false}
          >
            <i className="fas fa-trash-alt"></i>
          </Button>
        </div>
        <div className="wd-pagination pagination justify-content-end">
          {/* Next and Previous button */}
          <div className="next-prev-btn-container">
            <button
              className="page-link"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"Previous"}
            </button>{" "}
            <button
              className="page-link"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {"Next"}
            </button>{" "}
          </div>

          {/* Page number */}
          <div className="pagenumber-container">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
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

TableOccupationCompetencyPool.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  handleDeleteRows: PropTypes.func,
  disableDeleteBtn: PropTypes.bool,
}

export default TableOccupationCompetencyPool
