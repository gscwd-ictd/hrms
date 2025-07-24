import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Input, Label } from 'reactstrap'
import { DateFormatter } from 'functions/DateFormatter'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'

export const SelectDateColumnFilter = props => {
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

    const sortedStringsArray = [...options].sort((a, b) => {
      const date1 = dayjs(a)
      const date2 = dayjs(b)

      return date2.diff(date1)
      // new Date(b) - new Date(a)
    })
    const sortedStringsSet = new Set(sortedStringsArray)

    return [...sortedStringsSet.values()]
  }, [id, preFilteredRows])

  return (
    <div className="d-flex gap-1 column-filter-inner">
      <Label className="col-form-label text-nowrap">{render('Header')}:</Label>
      <Input
        type="select"
        className="dropdown-col-filter"
        title={id}
        name={id}
        value={filterValue || 'All'}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {/* !== undefined || option !== null */}
        {options.map((option, i) =>
          !isEmpty(option) ? (
            <option
              key={i}
              value={option}
              style={{ textTransform: 'capitalize' }}
            >
              {DateFormatter(option, 'MMMM DD, YYYY hh:mm A')}
            </option>
          ) : null
        )}
      </Input>
    </div>
  )
}

SelectDateColumnFilter.propTypes = {
  column: PropTypes.object,
}
