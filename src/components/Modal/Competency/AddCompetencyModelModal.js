import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Row,
  Table,
  Input,
  Form,
  FormGroup,
  Label,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import TextareaAutosize from 'react-textarea-autosize'
import { useDispatch, useSelector } from 'react-redux'
// import {
//   fetchProficiencyKeyActions,
//   updateKeyActionDetails,
//   resetCompetencyResponse,
// } from 'store/actions'
import PropTypes, { string } from 'prop-types'

// extra components
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/components/table.scss'

const AddCompetencyModelModal = props => {
  const { showEdt, handleCloseEdt, modalData } = props

  const dispatch = useDispatch()
  const { proficiencyKeyActions, isLoading, error } = useSelector(state => ({
    proficiencyKeyActions: state.competencyModel.proficiencyKeyActions,
    isLoading: state.competencyModel.loading.loadingProficiencyKeyActions,
    error: state.competencyModel.error.errorProficiencyKeyActions,
  }))

  // Update redux state value for specific proficiency level
  // const updateValue = (e, index) => {
  //   dispatch(updateKeyActionDetails(index, e.target.value))
  // }

  // Initial dispatch request upon opening of modal
  // useEffect(() => {
  //   if (showEdt) {
  //     dispatch(fetchProficiencyKeyActions(modalData.competencyId))
  //   } else {
  //     dispatch(resetCompetencyResponse())
  //   }
  // }, [showEdt])

  return (
    <React.Fragment>
      <Modal isOpen={showEdt} toggle={handleCloseEdt} size="lg" centered>
        <ModalHeader toggle={handleCloseEdt}>Add Competency</ModalHeader>

        {error ? (
          <ToastrNotification toastType={'error'} notifMessage={error} />
        ) : null}

        <ModalBody>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="code-Input">Code</Label>
                  <Input
                    name="code"
                    type="text"
                    className="form-control"
                    id="code-Input"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="name-Input">Name</Label>
                  <Input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name-Input"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="desc-Input">Description</Label>
                  <Input
                    name="desc"
                    type="text"
                    className="form-control"
                    id="desc-Input"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="table-responsive">
                  <Table className="table mb-0 tbl-key-actions">
                    <thead className="thead-light">
                      <tr>
                        <th className="thead-pl">Proficiency Level</th>
                        <th className="thead-ka">Key Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{'BASIC'}</td>
                        <td className="textarea-container">
                          <TextareaAutosize
                            id={'Test'}
                            minRows={3}
                            name={'BASIC'}
                            defaultValue={'Test'}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>{'INTERMEDIATE'}</td>
                        <td className="textarea-container">
                          <TextareaAutosize
                            id={'Test'}
                            minRows={3}
                            name={'INTERMEDIATE'}
                            defaultValue={'Test'}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>{'ADVANCED'}</td>
                        <td className="textarea-container">
                          <TextareaAutosize
                            id={'Test'}
                            minRows={3}
                            name={'ADVANCED'}
                            defaultValue={'Test'}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>{'SUPERIOR'}</td>
                        <td className="textarea-container">
                          <TextareaAutosize
                            id={'Test'}
                            minRows={3}
                            name={'SUPERIOR'}
                            defaultValue={'Test'}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            form="editCompetencyForm"
            color="info"
            // onClick={handleUpdateModel}
          >
            Add
          </Button>
          <Button color="danger" onClick={handleCloseEdt}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

AddCompetencyModelModal.propTypes = {
  showEdt: PropTypes.bool,
  handleCloseEdt: PropTypes.func,
  modalData: PropTypes.object,
}

export default AddCompetencyModelModal
