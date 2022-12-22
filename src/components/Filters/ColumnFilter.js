import React from "react"

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter, preFilteredRows, id } = column

  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <div className="form-group wd-select-filter">
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        className="form-control"
      >
        <option value="">Select All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
