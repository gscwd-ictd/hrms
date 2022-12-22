import React, { useMemo } from "react"
import PropTypes from "prop-types"

export const SelectColumnFilter = props => {
  const {
    column: { filterValue, setFilter, preFilteredRows, id, render },
  } = props

  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <label className="d-inline-flex align-items-center wd-select-filter">
      <span className="">{render("Header")}: </span>
      <select
        className="form-control dropdown-col-filter"
        name={id}
        id={id}
        value={filterValue || "All"}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) =>
          option !== undefined ? (
            <option key={i} value={option}>
              {option}
            </option>
          ) : null
        )}
      </select>
    </label>
  )
}

SelectColumnFilter.propTypes = {
  column: PropTypes.object,
}
