import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import {
  Button,
  Col,
  Row,
  Table,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap"
import TextareaAutosize from "react-textarea-autosize"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchProficiencyKeyActions,
  updateKeyActionDetails,
  resetCompetencyResponse,
} from "store/actions"
import PropTypes from "prop-types"

// extra components
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/components/table.scss"

const EditCompetencyModelModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [definition, setDefinition] = useState("")

  const dispatch = useDispatch()
  const { proficiencyKeyActions, isLoading, error } = useSelector(state => ({
    proficiencyKeyActions: state.competencyModel.proficiencyKeyActions,
    isLoading: state.competencyModel.loading.loadingProficiencyKeyActions,
    error: state.competencyModel.error.errorProficiencyKeyActions,
  }))

  // Update redux state value for specific proficiency level
  const updateValue = (e, index) => {
    dispatch(updateKeyActionDetails(index, e.target.value))
  }

  // Update competency model details
  const handleUpdateModel = () => {
    const modelData = {
      code: code,
      name: name,
      desc: definition,
      proficiencyKeyActions,
    }
    // modalData.competencyId use to identify which competency model to update
    console.log(modelData)
  }

  // Initial dispatch request upon opening of modal
  useEffect(() => {
    if (showEdt) {
      dispatch(fetchProficiencyKeyActions(modalData.competencyId))
    } else {
      dispatch(resetCompetencyResponse())
    }
  }, [showEdt])

  return (
    <React.Fragment>
      <Modal show={showEdt} onHide={handleCloseEdt} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? (
            <ToastrNotification toastType={"error"} notifMessage={error} />
          ) : null}
          <Row>
            <Col>
              <FormGroup>
                <Label for="modelCode-Input">Code</Label>
                <Input
                  type="text"
                  className="form-control"
                  name="modelCode"
                  id="modelCode-Input"
                  defaultValue={modalData.code}
                  onChange={e => setCode(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="modelName-Input">Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  name="modelName"
                  id="modelName-Input"
                  defaultValue={modalData.name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="modelDefinition-Input">Definition</Label>
                <TextareaAutosize
                  id="modelDefinition-Input"
                  className="form-control"
                  name="modelDefinition"
                  defaultValue={modalData.desc}
                  minRows={3}
                  onChange={e => setDefinition(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              {isLoading ? (
                <LoadingIndicator />
              ) : proficiencyKeyActions ? (
                <div className="table-responsive">
                  <Table className="table mb-0 tbl-key-actions">
                    <thead className="thead-light">
                      <tr>
                        <th className="thead-pl">Proficiency Level</th>
                        <th className="thead-ka">Key Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proficiencyKeyActions.length > 0 ? (
                        proficiencyKeyActions.map((proficiency, index) => {
                          return (
                            <tr key={proficiency._id}>
                              <td>{proficiency.level}</td>
                              <td className="textarea-container">
                                <TextareaAutosize
                                  defaultValue={proficiency.keyActions}
                                  minRows={3}
                                  onChange={e => updateValue(e, index)}
                                />
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan="2" className="ta-center">
                            No Records Available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              ) : null}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" color="success" onClick={handleUpdateModel}>
            Update
          </Button>
          <Button color="danger" onClick={handleCloseEdt}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

EditCompetencyModelModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default EditCompetencyModelModal
