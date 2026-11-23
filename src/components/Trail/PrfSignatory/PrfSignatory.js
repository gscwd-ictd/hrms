import React from 'react'
import PropTypes from 'prop-types'

import 'styles/custom_gscwd/components/prftrail.scss'

// one signatory of the trail
const Step = ({ signatory, date, label }) => (
  <div
    className={
      signatory.status === 'For approval'
        ? 'item event-list active'
        : 'item event-list'
    }
  >
    <div>
      <div className="event-date">
        <div className="text-primary mb-1">{date}</div>
        <h5 className="mb-4">{signatory.name}</h5>
      </div>
      <div className="event-down-icon">
        <i className="bx bx-down-arrow-circle h2 text-primary down-arrow-icon" />
      </div>

      <div className="mt-3 px-3">
        {label ? <p className="mb-1 fw-semibold">{label}</p> : null}
        <p className="text-muted">{signatory.position}</p>
        <p className="text-muted">{signatory.designation}</p>
      </div>
    </div>
  </div>
)

Step.propTypes = {
  signatory: PropTypes.object,
  date: PropTypes.string,
  label: PropTypes.string,
}

const PrfSignatory = props => {
  const { prfTrail, prfDetails, formatDate } = props

  // date signed; not signed yet: ---; signed on request: date requested
  const dateOf = signatory =>
    signatory.updatedAt
      ? formatDate(signatory.updatedAt)
      : signatory.status === 'For approval' || signatory.status === 'Pending'
        ? '---'
        : formatDate(prfDetails.dateRequested)

  // requested by the General Manager (no division / department / AGM step): the GM is the requester (first),
  // then the HR Department Manager (certified correct)
  const gmIsRequester =
    prfTrail.gm.status === 'Sent' ||
    (prfTrail.gm.status === 'Approved' &&
      prfTrail.division.status === 'N/A' &&
      prfTrail.department.status === 'N/A' &&
      prfTrail.agm.status === 'N/A')

  const steps = gmIsRequester
    ? [
      {
        key: 'gm',
        signatory: prfTrail.gm,
        date: formatDate(prfDetails.dateRequested),
        label: 'Requested by',
      },
      {
        key: 'admin',
        signatory: prfTrail.admin,
        label: 'Certified correct by',
      },
    ]
    : ['division', 'department', 'agm', 'admin', 'gm'].map(key => ({
      key,
      signatory: prfTrail[key],
    }))

  return (
    <div className="hori-timeline">
      <div className="owl-carousel owl-theme events">
        <div className="signatory-trail equal-columns">
          {steps
            .filter(({ signatory }) => signatory && signatory.status !== 'N/A')
            .map(({ key, signatory, date, label }) => (
              <Step
                key={key}
                signatory={signatory}
                date={date || dateOf(signatory)}
                label={label}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

PrfSignatory.propTypes = {
  prfTrail: PropTypes.shape({
    division: PropTypes.shape({
      status: PropTypes.string,
      employeeId: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.string,
      designation: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
    department: PropTypes.shape({
      status: PropTypes.string,
      employeeId: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.string,
      designation: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
    agm: PropTypes.shape({
      status: PropTypes.string,
      employeeId: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.string,
      designation: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
    admin: PropTypes.shape({
      status: PropTypes.string,
      employeeId: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.string,
      designation: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
    gm: PropTypes.shape({
      status: PropTypes.string,
      employeeId: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.string,
      designation: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
  }),
  prfDetails: PropTypes.object,
  formatDate: PropTypes.func,
}

export default PrfSignatory