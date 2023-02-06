import React, { useMemo } from "react"
import PropTypes from "prop-types"

import { Input, Label, Button } from "reactstrap"
import "styles/custom_gscwd/components/daterangefilter.scss"

export const DateRangeColumnFilter = props => {
  const {
    column: { filterValue, setFilter, preFilteredRows, id, render },
  } = props

  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0)
    let max = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0)

    preFilteredRows.forEach(row => {
      const rowDate = new Date(row.values[id])

      min = rowDate <= min ? rowDate : min
      max = rowDate >= max ? rowDate : max
    })

    return [min, max]
  }, [id, preFilteredRows])

  const resetDateInputs = () => {
    setFilter([])
  }

  return (
    <div className="daterange-wrapper d-flex gap-1">
      <Label className="col-form-label">{render("FilterName")}: </Label>
      <p className="col-form-label">from</p>
      <Input
        type="date"
        min={min.toISOString().slice(0, 10)}
        max={max.toISOString().slice(0, 10)}
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? val : undefined, old[1]])
        }}
        value={filterValue && filterValue[0] ? filterValue[0] : ""}
      />

      <p className="col-form-label">to</p>

      <Input
        type="date"
        min={filterValue && filterValue[0] ? filterValue[0] : ""}
        // max={max.toISOString().slice(0, 10)}
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [
            old[0],
            val ? val.concat("T23:59:59.999Z") : undefined,
          ])
        }}
        value={filterValue && filterValue[1] ? filterValue[1].slice(0, 10) : ""}
      />

      <Button color="dark" outline onClick={() => resetDateInputs()}>
        <i className="fas fa-sync"></i>
      </Button>
    </div>
  )
}

DateRangeColumnFilter.propTypes = {
  column: PropTypes.object,
}
