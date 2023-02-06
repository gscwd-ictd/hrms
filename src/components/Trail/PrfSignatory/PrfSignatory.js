import React from "react"
import PropTypes from "prop-types"

import "styles/custom_gscwd/components/prftrail.scss"

const PrfSignatory = props => {
  const { prfTrail, prfDetails, formatDate } = props
  return (
    <div className="hori-timeline">
      <div className="owl-carousel owl-theme events">
        <div className="signatory-trail equal-columns">
          {prfTrail.division.status !== "N/A" ? (
            <div
              className={
                prfTrail.division.status === "For approval"
                  ? "item event-list active"
                  : "item event-list"
              }
              // style={{ display: "inline-table" }}
            >
              <div>
                <div className="event-date">
                  <div className="text-primary mb-1">
                    {formatDate(prfDetails.dateRequested)}
                  </div>
                  <h5 className="mb-4">{prfTrail.division.name}</h5>
                </div>
                <div className="event-down-icon">
                  <i className="bx bx-down-arrow-circle h2 text-primary down-arrow-icon" />
                </div>

                <div className="mt-3 px-3">
                  <p className="text-muted">{prfTrail.division.position}</p>
                  <p className="text-muted">{prfTrail.division.designation}</p>
                </div>
              </div>
            </div>
          ) : null}

          {prfTrail.department.status !== "N/A" ? (
            <div
              className={
                prfTrail.department.status === "For approval"
                  ? "item event-list active"
                  : "item event-list"
              }
            >
              <div>
                <div className="event-date">
                  <div className="text-primary mb-1">
                    {prfTrail.department.updatedAt
                      ? formatDate(prfTrail.department.updatedAt)
                      : prfTrail.department.status === "For approval" ||
                        prfTrail.department.status === "Pending"
                      ? "---"
                      : formatDate(prfDetails.dateRequested)}
                  </div>
                  <h5 className="mb-4">{prfTrail.department.name}</h5>
                </div>
                <div className="event-down-icon">
                  <i className="bx bx-down-arrow-circle h2 text-primary down-arrow-icon" />
                </div>

                <div className="mt-3 px-3">
                  <p className="text-muted">{prfTrail.department.position}</p>
                  <p className="text-muted">
                    {prfTrail.department.designation}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {prfTrail.agm.status !== "N/A" ? (
            <div
              className={
                prfTrail.agm.status === "For approval"
                  ? "item event-list active"
                  : "item event-list"
              }
            >
              <div>
                <div className="event-date">
                  <div className="text-primary mb-1">
                    {prfTrail.agm.updatedAt
                      ? formatDate(prfTrail.agm.updatedAt)
                      : prfTrail.agm.status === "For approval" ||
                        prfTrail.agm.status === "Pending"
                      ? "---"
                      : formatDate(prfDetails.dateRequested)}
                  </div>
                  <h5 className="mb-4">{prfTrail.agm.name}</h5>
                </div>
                <div className="event-down-icon">
                  <i className="bx bx-down-arrow-circle h2 text-primary down-arrow-icon" />
                </div>

                <div className="mt-3 px-3">
                  <p className="text-muted">{prfTrail.agm.position}</p>
                  <p className="text-muted">{prfTrail.agm.designation}</p>
                </div>
              </div>
            </div>
          ) : null}

          {prfTrail.admin.status !== "N/A" ? (
            <div
              className={
                prfTrail.admin.status === "For approval"
                  ? "item event-list active"
                  : "item event-list"
              }
            >
              <div>
                <div className="event-date">
                  <div className="text-primary mb-1">
                    {prfTrail.admin.updatedAt
                      ? formatDate(prfTrail.admin.updatedAt)
                      : prfTrail.admin.status === "For approval" ||
                        prfTrail.admin.status === "Pending"
                      ? "---"
                      : formatDate(prfDetails.dateRequested)}
                  </div>
                  <h5 className="mb-4">{prfTrail.admin.name}</h5>
                </div>
                <div className="event-down-icon">
                  <i className="bx bx-down-arrow-circle h2 text-primary down-arrow-icon" />
                </div>

                <div className="mt-3 px-3">
                  <p className="text-muted">{prfTrail.admin.position}</p>
                  <p className="text-muted">{prfTrail.admin.designation}</p>
                </div>
              </div>
            </div>
          ) : null}

          {prfTrail.gm.status !== "N/A" ? (
            <div
              className={
                prfTrail.gm.status === "For approval"
                  ? "item event-list active"
                  : "item event-list"
              }
            >
              <div>
                <div className="event-date">
                  <div className="text-primary mb-1">
                    {prfTrail.gm.updatedAt
                      ? formatDate(prfTrail.gm.updatedAt)
                      : prfTrail.gm.status === "For approval" ||
                        prfTrail.gm.status === "Pending"
                      ? "---"
                      : formatDate(prfDetails.dateRequested)}
                  </div>
                  <h5 className="mb-4">{prfTrail.gm.name}</h5>
                </div>
                <div className="event-down-icon">
                  <i className="bx bx-down-arrow-circle h2 text-primary down-arrow-icon" />
                </div>

                <div className="mt-3 px-3">
                  <p className="text-muted">{prfTrail.gm.position}</p>
                  <p className="text-muted">{prfTrail.gm.designation}</p>
                </div>
              </div>
            </div>
          ) : null}
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
