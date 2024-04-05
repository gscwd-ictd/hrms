import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Row } from 'reactstrap'
import { fetchBirthdayCelebrants } from 'store/actions'

import { useDispatch, useSelector } from 'react-redux'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'
import BirthdayModal from 'components/Modal/Dashboard/BirthdayModal'

const LatestBirthday = () => {
  const dispatch = useDispatch()

  const { birthdayCelebrants, isLoading, error } = useSelector(state => ({
    birthdayCelebrants: state.Dashboard.birthdayCelebrants,
    isLoading: state.Dashboard.loading.loadingBirthdayCelebrants,
    error: state.Dashboard.error.errorBirthdayCelebrants,
  }))

  /**
   * Modal
   */
  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  useEffect(() => {
    dispatch(fetchBirthdayCelebrants())
  }, [])

  return (
    <>
      {error ? (
        <ToastrNotification toastType={'error'} notifMessage={error} />
      ) : null}
      <Card>
        <CardBody>
          <CardTitle className="mb-4">
            {new Date().toLocaleString('default', { month: 'long' })} Birthday
            Celebrants{' '}
          </CardTitle>

          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <div>
              {birthdayCelebrants.slice(0, 5).map((employee, key) => (
                <Row key={key} className="mb-1">
                  <Col sm="2" className="my-auto">
                    <div className="avatar-sm">
                      <img
                        src={employee.picture}
                        alt=""
                        className="img-thumbnail rounded-circle"
                      />
                    </div>
                  </Col>
                  <Col sm="10" className="my-auto">
                    <h5 className="font-size-12 mb-0">{employee.name}</h5>
                    <p className="font-size-11 text-muted mb-0">
                      {employee.birthday}
                    </p>
                  </Col>
                </Row>
              ))}
            </div>
          )}

          <div className="text-right mt-4">
            <button
              onClick={handleShowModal}
              className="btn btn-info waves-effect waves-light btn-sm"
            >
              View More <i className="mdi mdi-arrow-right ml-1" />
            </button>
            {/* <Button
              to=""
              onClick={handleShowModal}
              className="btn btn-info waves-effect waves-light btn-sm"
            >
              View More <i className="mdi mdi-arrow-right ml-1" />
            </Button> */}
          </div>
        </CardBody>
      </Card>

      <BirthdayModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        birthdayCelebrants={birthdayCelebrants}
      />
    </>
  )
}

export default LatestBirthday
