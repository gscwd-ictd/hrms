import React, { useState, useEffect } from "react"
import { useAsyncDebounce } from "react-table"
import { InputGroup, InputGroupText, Input } from 'reactstrap'
import PropTypes from 'prop-types'

export const GlobalFilter = ( props ) => {
  const { preGlobalFilteredRows, globalFilter, setGlobalFilter } = props
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const [placeHolder, setPlaceHolder] = useState("")

  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 300)

  useEffect(() => {
    if(preGlobalFilteredRows.length <= 0){
      setPlaceHolder('No records available')
    }else{
      setPlaceHolder(`${count} records...`)
    }
  }, [preGlobalFilteredRows])

  return (
    <div className="form-group col-sm-3 search-box">
      <InputGroup>
        <InputGroupText>
          <i className="fas fa-search"></i>
        </InputGroupText>
        <Input  
          value={value || ""}
          onChange={e => {
            setValue(e.target.value)
            onChange(e.target.value)
          }}
          // placeholder={`${count} records...`}
          placeholder={placeHolder}
          className="wd-table-search-input "
          type="search"/>
      </InputGroup>
    </div>
  )
}

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array,
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func,
}