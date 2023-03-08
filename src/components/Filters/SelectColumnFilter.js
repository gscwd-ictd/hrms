import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { Input, Label } from "reactstrap"

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
    // <label className="d-inline-flex align-items-center wd-select-filter">
    <div className="d-flex gap-1">
      <Label className="col-form-label">{render("Header")}: </Label>
      <Input
        type="select"
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
      </Input>
    </div>
    // </label>
  )
}

SelectColumnFilter.propTypes = {
  column: PropTypes.object,
}
