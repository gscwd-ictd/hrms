import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { updateSalaryGradeList, fetchSalaryGradeList } from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'

import {
  Col,
  Row,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Card,
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import { useDropzone } from 'react-dropzone'
import ToastrNotification from 'components/Notifications/ToastrNotification'

const UploadSalaryGradeListModal = props => {
  const { showAdd, handleCloseAdd } = props
  const dispatch = useDispatch()

  const [salaryGradeListFromExcel, setSalaryGradeListFromExcel] = useState([])
  const [loadingExcelToJSON, setLoadingExcelToJSON] = useState(false)
  const [sendSGInJSON, setSendSGInJSON] = useState(false)

  // redux state for salary grade response
  const { salaryGradeResponse, loadingSalaryGrade, errorSalaryGrade } =
    useSelector(state => ({
      salaryGradeResponse: state.salaryGrade.response.salaryGrade.put,
      loadingSalaryGrade: state.salaryGrade.loading.loadingSalaryGrade,
      errorSalaryGrade: state.salaryGrade.error.errorSalaryGrade,
    }))

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      'application/application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
  })

  const handleSubmit = e => {
    // e.stopPropagation()
    e.preventDefault()
    setLoadingExcelToJSON(true)

    var XLSX = require('xlsx')

    /* f is a File */
    var file = acceptedFiles[0]

    var reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')

    reader.onload = function (e) {
      var data = e.target.result
      /* reader.readAsArrayBuffer(file) -> data will be an ArrayBuffer */

      /* DO SOMETHING WITH workbook HERE */
      var workbook = XLSX.read(data, {
        type: rABS ? 'binary' : 'array',
      })
      var sheet_name_list = workbook.SheetNames[0]
      var jsonFromExcel = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list],
        {
          header: 1,
          blankrows: false,
        }
      )

      let idCount = 1
      // Create a object structure of a single salary grade details
      for (let x = 1; x <= jsonFromExcel.length; x++) {
        var salaryGradeRow = jsonFromExcel[x]

        if (salaryGradeRow) {
          const stepIncrementValue = Object.keys(salaryGradeRow)

          stepIncrementValue.map((value, index) => {
            if (index > 0) {
              const stepIncrement = {
                _id: idCount,
                salaryGrade: x,
                stepIncrement: index,
                amount: salaryGradeRow[value],
              }
              idCount = idCount + 1
              // mainArray.push(stepIncrement)
              pushStepIncremenetDetailsToArray(stepIncrement)
            }
          })
        }
      }
    }

    reader.readAsArrayBuffer(file)
  }

  // Push sg & si to one array and send to request upon
  const pushStepIncremenetDetailsToArray = stepIncrementDetails => {
    setSalaryGradeListFromExcel(prevArray => [
      ...prevArray,
      stepIncrementDetails,
    ])

    if (stepIncrementDetails._id == 258) {
      setLoadingExcelToJSON(false)
      setSendSGInJSON(true)
    }
  }

  // View for the accepted files from the drag drop area
  const acceptedFileItems = acceptedFiles.map((file, index) => {
    return (
      <Card
        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
        key={index + '-file'}
      >
        <div className="p-2">
          <Row className="align-items-center">
            <Col className="col-auto">
              <i
                className="fas fa-file-excel"
                style={{ fontSize: '2.5em' }}
              ></i>
            </Col>
            <Col>
              <Link to="#" className="text-muted font-weight-bold">
                {file.name}
              </Link>
              <p className="mb-0">
                <strong>{formatBytes(file.size)}</strong>
              </p>
            </Col>
          </Row>
        </div>
      </Card>
    )
  })

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  useEffect(() => {
    if (sendSGInJSON) {
      const salaryGradePut = {
        salaryGradeList: salaryGradeListFromExcel,
      }

      dispatch(updateSalaryGradeList(salaryGradePut))
    } else {
      setSendSGInJSON(false)
    }
  }, [sendSGInJSON])

  useEffect(() => {
    if (!isEmpty(salaryGradeResponse)) {
      dispatch(fetchSalaryGradeList())
      handleCloseAdd()
    }
  }, [salaryGradeResponse])

  return (
    <>
      <Modal isOpen={showAdd} toggle={handleCloseAdd} size="lg" centered>
        <ModalHeader toggle={handleCloseAdd}>
          Upload Salary Grade File
        </ModalHeader>

        {/* Notifications */}
        {loadingExcelToJSON ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Extracting Data
            from Excel
          </Alert>
        ) : null}

        {loadingSalaryGrade ? (
          <Alert
            color="info"
            className="alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="mdi mdi-loading mdi-spin me-2 "></i> Sending Request
          </Alert>
        ) : null}

        {errorSalaryGrade ? (
          <ToastrNotification
            toastType={'error'}
            notifMessage={errorSalaryGrade}
          />
        ) : null}

        {!isEmpty(salaryGradeResponse) ? (
          <ToastrNotification
            toastType={'success'}
            notifMessage={'Salary Grade List Updated!'}
          />
        ) : null}

        <ModalBody>
          <Form onSubmit={e => handleSubmit(e)} id="uploadSalaryGradeForm">
            <FormGroup>
              <div {...getRootProps({ className: 'dropzone' })}>
                <div className="dz-message needsclick mt-2" {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragAccept && <h5>File will be accepted</h5>}

                  {isDragReject && <h5>File will be rejected</h5>}

                  {!isDragActive && (
                    <>
                      <div className="mb-3">
                        <i className="display-4 text-muted bx bxs-cloud-upload" />
                      </div>
                      <h4>Drop a file here or click to upload.</h4>
                      <h6>(Only .xls & .xlsx files can be accepted)</h6>
                    </>
                  )}
                </div>
              </div>

              <div className="dropzone-previews mt-3" id="file-previews">
                {acceptedFileItems}
              </div>
            </FormGroup>
            <Label for="effectivity-Input">Effectivity Date</Label>
            <Input
              name="effectivity"
              type="date"
              style={{ width: '35%' }}
              id="effectivity-Input"
              onChange={null}
              onBlur={null}
              value={undefined}
              invalid={null}
            />
            {'' ? <FormFeedback type="invalid">{''}</FormFeedback> : null}
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" form="uploadSalaryGradeForm" color="info">
            Upload File
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

UploadSalaryGradeListModal.propTypes = {
  showAdd: PropTypes.bool,
  handleCloseAdd: PropTypes.func,
  history: PropTypes.object,
}

export default UploadSalaryGradeListModal
