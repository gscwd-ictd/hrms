import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Input, Label } from 'reactstrap'
import { DateFormatter } from 'functions/DateFormatter'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'

export const SelectDateColumnFilter = props => {
  const {
    column: { filterValue, setFilter, preFilteredRows, id, render },
  } = props

  const utc = require('dayjs/plugin/utc')
  dayjs.extend(utc)

  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set()

    preFilteredRows.forEach(row => {
      if (!isEmpty(row.values[id])) {
        options.add(dayjs(row.values[id]).format('YYYY-MM-DD'))
      } else {
        options.add(row.values[id])
      }
    })

    const sortedStringsArray = [...options].sort((a, b) => {
      const date1 = dayjs(a)
      const date2 = dayjs(b)

      return date2.diff(date1, 'day')
    })

    const sortedStringsSet = new Set(sortedStringsArray)

    return [...sortedStringsSet.values()]
  }, [id, preFilteredRows])

  useEffect(() => {
    const currentDayMatch = options.find(interviewDate => {
      if (!isEmpty(interviewDate)) {
        const today = dayjs().format('YYYY-MM-DD')

        if (today === interviewDate) {
          return today
        }
      }
    })

    setFilter(currentDayMatch)
  }, [])

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
              {DateFormatter(option, 'MMMM DD, YYYY')}
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
