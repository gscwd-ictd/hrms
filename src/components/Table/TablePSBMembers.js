import React from "react"
import { Table, Button } from "reactstrap"
import {
  useFilters,
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table"
import { GlobalFilter } from "components/Filters/GlobalFilter"
import PropTypes from "prop-types"

// styles
import "styles/custom_gscwd/components/table.scss"

const TablePSBMembers = props => {
  const { columns, data, handleDeleteRows, disableDeleteBtn } = props

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: ["employeeId"],
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
                  className={"th_" + column.getHeaderProps("Header").key}
                >
                  {column.render("Header")}
                  {/* Sort */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="bx bx-up-arrow pl-1"></i>
                      ) : (
                        <i className="bx bx-down-arrow pl-1"></i>
                      )
                    ) : (
                      ""
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
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>

      {/* <div className="table-footer">
        <div className="left-footer-container">
          <Button
            className="btn btn-danger"
            onClick={() => handleDeleteRows()}
            disabled={disableDeleteBtn ? true : false}
          >
            <i className="fas fa-trash-alt"></i>
          </Button>
        </div>
      </div> */}
    </>
  )
}

TablePSBMembers.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  handleDeleteRows: PropTypes.func,
  disableDeleteBtn: PropTypes.bool,
}

export default TablePSBMembers
