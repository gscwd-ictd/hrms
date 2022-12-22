import React from "react"
import { Row, Col } from "reactstrap"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import OutlinedBox from "components/OutlinedBox"

const OtherInformationView = props => {
  const {
    skills,
    recognitions,
    organizations,
    officeRelation,
    guiltyCharged,
    convicted,
    separatedService,
    candidateResigned,
    immigrant,
    indigenousPwdSoloParent,
    references,
    governmentIssuedId,
    formatDate,
  } = props

  return (
    <Row>
      <Col>
        {/* Special SKills and Hoobies */}
        <h5>Special Skills and Hobbies</h5>
        {!isEmpty(skills) ? (
          <>
            <Row className="mt-1">
              {skills.map((skill, index) => (
                <Col key={skill._id} md={12} className="mt-3">
                  <OutlinedBox label={`${index + 1}`} value={skill.skill} />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <Row className="mt-2">
            <Col md={12}>
              <p className="text-danger">Not Applicable</p>
            </Col>
          </Row>
        )}

        <hr className="my-4"></hr>

        {/* Non-Academic Distinctions/Recognition */}
        <h5>Non-Academic Distinctions/Recognition</h5>
        {!isEmpty(recognitions) ? (
          <>
            <Row className="mt-1">
              {recognitions.map((award, index) => (
                <Col key={award._id} md={12} className="mt-3">
                  <OutlinedBox
                    label={`${index + 1}`}
                    value={award.recognition}
                  />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <Row className="mt-2">
            <Col md={12}>
              <p className="text-danger">Not Applicable</p>
            </Col>
          </Row>
        )}

        <hr className="my-4"></hr>

        {/* Membership in Association/Organization */}
        <h5>Membership in Association/Organization</h5>
        {!isEmpty(organizations) ? (
          <>
            <Row className="mt-1">
              {organizations.map((org, index) => (
                <Col key={org._id} md={12} className="mt-3">
                  <OutlinedBox
                    label={`${index + 1}`}
                    value={org.organization}
                  />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <Row className="mt-2">
            <Col md={12}>
              <p className="text-danger">Not Applicable</p>
            </Col>
          </Row>
        )}

        <hr className="my-4"></hr>

        {/* Question 34 */}
        <h5>
          34.) Are you related by consanguinity or affinity to the appointing or
          recommending authority, or to the chief of bureau or office or to the
          person who has immediate supervision over you in the Office, Bureau or
          Department where you will be apppointed,
        </h5>
        {!isEmpty(officeRelation) ? (
          <>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <h6>a. within the third degree?</h6>
                <OutlinedBox
                  label={""}
                  value={officeRelation.withinThirdDegree ? "Yes" : "No"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <h6>
                  b. within the fourth degree (for Local Government Unit -
                  Career Employees)?
                </h6>
                <OutlinedBox
                  label={""}
                  value={officeRelation.withinFourthDegree ? "Yes" : "No"}
                />
              </Col>
              <Col md={12} className="mt-3">
                <h6>If YES, give details</h6>
                <OutlinedBox
                  label={""}
                  value={officeRelation.details || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {/* Question 35 */}
        <h5>35.) </h5>
        {!isEmpty(guiltyCharged) ? (
          <>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <h6>
                  a. Have you ever been found guilty of any administrative
                  offense?
                </h6>
                <OutlinedBox
                  label={""}
                  value={guiltyCharged.isGuilty ? "Yes" : "No"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <h6>If YES, give details</h6>
                <OutlinedBox
                  label={""}
                  value={guiltyCharged.guiltyDetails || "N/A"}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <h6>b. Have you been criminally charged before any court?</h6>
                <OutlinedBox
                  label={""}
                  value={guiltyCharged.isCharged ? "Yes" : "No"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <h6>Date filed</h6>
                <OutlinedBox
                  label={""}
                  value={formatDate(guiltyCharged.chargedDateFiled) || "N/A"}
                />
              </Col>
              <Col md={3} className="mt-3">
                <h6>Status of Case/s</h6>
                <OutlinedBox
                  label={""}
                  value={guiltyCharged.chargedCaseStatus || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {/* Question 36 */}
        <h5>
          36.) Have you ever been convicted of any crime or violation of any
          law, decree, ordinance or regulation by any court or tribunal?
        </h5>
        {!isEmpty(convicted) ? (
          <>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <h6>Answer</h6>
                <OutlinedBox
                  label={""}
                  value={convicted.isConvicted ? "Yes" : "No"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <h6>If YES, give details</h6>
                <OutlinedBox label={""} value={convicted.details || "N/A"} />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {/* Question 37 */}
        <h5>
          37.) Have you ever been separated from the service in any of the
          following modes: resignation, retirement, dropped from the rolls,
          dismissal, termination, end of term, finished contract or phased out
          (abolition) in the public or private sector?
        </h5>
        {!isEmpty(separatedService) ? (
          <>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <h6>Answer</h6>
                <OutlinedBox
                  label={""}
                  value={separatedService.isSeparated ? "Yes" : "No"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <h6>If YES, give details</h6>
                <OutlinedBox
                  label={""}
                  value={separatedService.details || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {/* Question 38 */}
        <h5>38.)</h5>
        {!isEmpty(candidateResigned) ? (
          <>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <h6>
                  a. Have you ever been a candidate in a national or local
                  election held within the last year (except Barangay election)?
                </h6>
                <OutlinedBox
                  label={""}
                  value={candidateResigned.isCandidate ? "Yes" : "No"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <h6>If YES, give details</h6>
                <OutlinedBox
                  label={""}
                  value={candidateResigned.candidateDetails || "N/A"}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <h6>
                  b. Have you resigned from the government service during the
                  three (3)-month period before the last election to
                  promote/actively campaign for a national or local candidate?
                </h6>
                <OutlinedBox
                  label={""}
                  value={candidateResigned.isResigned ? "Yes" : "No"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <h6>If YES, give details</h6>
                <OutlinedBox
                  label={""}
                  value={candidateResigned.resignedDetails || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {/* Question 39 */}
        <h5>
          39.) Have you acquired the status of an immigrant or permanent
          resident of another country?
        </h5>
        {!isEmpty(immigrant) ? (
          <>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <h6>Answer</h6>
                <OutlinedBox
                  label={""}
                  value={immigrant.isImmigrant ? "Yes" : "No"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <h6>If YES, give details (country): </h6>
                <OutlinedBox label={""} value={immigrant.details || "N/A"} />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        {/* Question 34 */}
        <h5>
          40.) Pursuant to: (a) Indigenous People&#39;s Act (RA 8371); (b) Magna
          Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act
          of 2000 (RA 8972), please answer the following items:
        </h5>
        {!isEmpty(indigenousPwdSoloParent) ? (
          <>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <h6>a. Are you a member of any indigenous group?</h6>
                <OutlinedBox
                  label={""}
                  value={
                    indigenousPwdSoloParent.isIndigenousMember ? "Yes" : "No"
                  }
                />
              </Col>
              <Col md={6} className="mt-3">
                <h6>If YES, please specify</h6>
                <OutlinedBox
                  label={""}
                  value={
                    indigenousPwdSoloParent.indigenousMemberDetails || "N/A"
                  }
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <h6>b. Are you a person with disability?</h6>
                <OutlinedBox
                  label={""}
                  value={indigenousPwdSoloParent.isPwd ? "Yes" : "No"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <h6>If YES, please specify ID No.</h6>
                <OutlinedBox
                  label={""}
                  value={indigenousPwdSoloParent.pwdIdNumber || "N/A"}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={6} className="mt-3">
                <h6>c. Are you a solo parent?</h6>
                <OutlinedBox
                  label={""}
                  value={indigenousPwdSoloParent.isSoloParent ? "Yes" : "No"}
                />
              </Col>
              <Col md={6} className="mt-3">
                <h6>If YES, please specify ID No.</h6>
                <OutlinedBox
                  label={""}
                  value={indigenousPwdSoloParent.soloParentIdNumber || "N/A"}
                />
              </Col>
            </Row>
          </>
        ) : null}

        <hr className="my-4"></hr>

        <h5>References</h5>
        {/* References */}
        {!isEmpty(references) ? (
          <>
            {references.map((reference, index) => (
              <Row key={index} className="mt-3 py-2 bordered-box">
                <Col md={6} className="mt-3">
                  <OutlinedBox label={"Name"} value={reference.name} />
                </Col>
                <Col md={3} className="mt-3">
                  <OutlinedBox label={"Address"} value={reference.address} />
                </Col>
                <Col md={3} className="mt-3">
                  <OutlinedBox
                    label={"Tel No."}
                    value={reference.telephoneNumber}
                  />
                </Col>
              </Row>
            ))}
          </>
        ) : (
          <Row className="mt-2">
            <Col md={12}>
              <p className="text-danger">Not Applicable</p>
            </Col>
          </Row>
        )}

        <hr className="my-4"></hr>

        {/* Goverment Issued Id */}
        <h5>Government Issued ID</h5>
        {!isEmpty(governmentIssuedId) ? (
          <>
            <Row className="mt-3 py-2 bordered-box">
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Government Issued ID"}
                  value={governmentIssuedId.issuedId}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"ID/License/Passport No."}
                  value={governmentIssuedId.idNumber}
                />
              </Col>
              <Col md={4} className="mt-3">
                <OutlinedBox
                  label={"Date/Place of Issuance"}
                  value={
                    formatDate(governmentIssuedId.issueDate) +
                    " " +
                    governmentIssuedId.issuePlace
                  }
                />
              </Col>
            </Row>
          </>
        ) : (
          <Row className="mt-2">
            <Col md={12}>
              <p className="text-danger">Not Applicable</p>
            </Col>
          </Row>
        )}

        <hr className="my-4"></hr>
      </Col>
    </Row>
  )
}

OtherInformationView.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      skill: PropTypes.string.isRequired,
    })
  ).isRequired,
  recognitions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      recognition: PropTypes.string.isRequired,
    })
  ).isRequired,
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      organization: PropTypes.string.isRequired,
    })
  ).isRequired,
  officeRelation: PropTypes.object.isRequired,
  guiltyCharged: PropTypes.object.isRequired,
  convicted: PropTypes.object.isRequired,
  separatedService: PropTypes.object.isRequired,
  candidateResigned: PropTypes.object.isRequired,
  immigrant: PropTypes.object.isRequired,
  indigenousPwdSoloParent: PropTypes.object.isRequired,
  references: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      telephoneNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  governmentIssuedId: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
}

export default OtherInformationView
