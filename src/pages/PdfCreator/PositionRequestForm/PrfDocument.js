import React from "react"
import PropTypes from "prop-types"

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer"
import Header from "components/PdfDocuments/PositionRequestForm/Header"

// Fonts
import CalibriRegular from "assets/fonts/uploads/calibri-regular.ttf"
import CalibriRegularBold from "assets/fonts/uploads/calibri-regular-bold.ttf"

// Sample e-signature
import SampleSignature from "assets/images/sample-signature.png"

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  bodyBorder: {
    margin: 10,
    border: "2px solid #000000",
  },
  signature: {
    width: 100,
    marginHorizontal: "auto",
  },
  signatureApproving: {
    width: 88,
    marginHorizontal: "auto",
  },
  signatureCertified: {
    width: 132,
    marginHorizontal: "auto",
  },

  // Border Styles
  borderTop: {
    borderTop: "1px solid #000000",
  },
  borderRight: {
    borderRight: "1px solid #000000",
  },
  borderBottom: {
    borderBottom: "1px solid #000000",
  },

  // Field Styles
  documentTitle: {
    fontFamily: "CalibriRegularBold",
    fontSize: 22,
    marginVertical: 10,
    textAlign: "center",
  },
  keyText: {
    fontFamily: "CalibriRegular",
    fontSize: 14,
    paddingLeft: 3,
  },
  valueText: {
    fontFamily: "CalibriRegularBold",
    fontSize: 14,
  },
  positionText: {
    fontFamily: "CalibriRegular",
    fontSize: 13,
    paddingTop: 1,
  },
  respectText: {
    fontFamily: "CalibriRegular",
    fontSize: 12,
    paddingLeft: 3,
  },
  thText: {
    fontFamily: "CalibriRegularBold",
    fontSize: 11,
    textAlign: "center",
    padding: "5 2 2 2",
  },
  tdText: {
    fontFamily: "CalibriRegular",
    fontSize: 11,
    textAlign: "center",
    padding: "8 4 4 4",
  },
  dateNeededText: {
    fontFamily: "CalibriRegular",
    fontSize: 11,
  },
  examinationText: {
    fontFamily: "CalibriRegular",
    fontSize: 11,
  },
  signatureText: {
    fontFamily: "CalibriRegular",
    fontSize: 11,
    textAlign: "center",
  },
  prfNoText: {
    fontFamily: "CalibriRegular",
    fontSize: 11,
    padding: "4 0 0 2",
  },
  upperCase: {
    textTransform: "uppercase",
  },
  signatoryName: {
    fontFamily: "CalibriRegularBold",
    textTransform: "uppercase",
    padding: "4 0 0 2",
  },

  verticalCenter: { margin: "auto 0" },
  horizontalCenter: { textAlign: "center" },

  // Width Styles
  w100: { width: "100%" },
  w65: { width: "65%" },
  w50: { width: "50%" },
  w40: { width: "40%" },
  w35: { width: "35%" },
  w33_33: { width: "33.33%" },
  w30: { width: "30%" },
  w25: { width: "25%" },
  w20: { width: "20%" },
  w15: { width: "15%" },
  w8: { width: "8%" },
  w5: { width: "5%" },
})

Font.register({
  family: "CalibriRegular",
  src: CalibriRegular,
})

Font.register({
  family: "CalibriRegularBold",
  src: CalibriRegularBold,
})

const PrfDocument = props => {
  const { prfDetails, prfTrail, formatDate } = props

  // Positions that were requested
  const renderPositions = () => {
    var content = prfDetails.prfPositions.map(position => (
      <View
        style={[styles.borderTop, styles.rowContainer]}
        key={position.positionId}
      >
        <View style={[styles.w20, styles.borderRight]}>
          <View style={[styles.verticalCenter]}>
            <Text style={[styles.tdText]}>{position.itemNumber}</Text>
          </View>
        </View>
        <View style={[styles.w30, styles.borderRight]}>
          <View style={[styles.verticalCenter]}>
            <Text style={[styles.tdText]}>{position.positionTitle}</Text>
          </View>
        </View>
        <View style={[styles.w25, styles.borderRight]}>
          <View style={[styles.verticalCenter]}>
            <Text style={[styles.tdText]}>{position.designation}</Text>
          </View>
        </View>
        <View style={[styles.w25]}>
          <View style={[styles.verticalCenter]}>
            <Text style={[styles.tdText]}>{position.remarks}</Text>
          </View>
        </View>
      </View>
    ))

    return content
  }

  // Render the Reviewed by container
  const renderReviewedBy = () => {
    var content = (
      <>
        {prfDetails.from.name === prfTrail.department.name ||
          prfTrail.department.status === "N/A" ? (
          <>
            <Text
              style={[
                {
                  fontFamily: "CalibriRegularBold",
                  textTransform: "uppercase",
                  padding: "72 0 0 2",
                },
              ]}
            >
              N/A
            </Text>
            <Text style={[styles.borderTop, { padding: "5 0 0 2" }]}>N/A</Text>
          </>
        ) : (
          <>
            <Image
              src={`${prfTrail.department.signatureUrl}`}
              style={[styles.signature]}
            />
            <Text style={[styles.signatoryName]}>
              {prfTrail.department.name}
            </Text>
            <Text style={[styles.borderTop, { padding: "5 0 0 2" }]}>
              {prfTrail.department.position}
            </Text>
          </>
        )}
      </>
    )

    return content
  }

  // Render the Recommended by container
  const renderRecommendedBy = () => {
    var content = (
      <>
        {prfDetails.from.name === prfTrail.agm.name ||
          prfTrail.agm.status === "N/A" ? (
          <>
            <Text
              style={[
                {
                  fontFamily: "CalibriRegularBold",
                  textTransform: "uppercase",
                  padding: "72 0 0 2",
                },
              ]}
            >
              N/A
            </Text>
            <Text style={[styles.borderTop, { padding: "5 0 0 2" }]}>N/A</Text>
          </>
        ) : (
          <>
            <Image
              src={`${prfTrail.agm.signatureUrl}`}
              style={[styles.signature]}
            />
            <Text style={[styles.signatoryName]}>{prfTrail.agm.name}</Text>
            <Text style={[styles.borderTop, { padding: "5 0 0 2" }]}>
              {prfTrail.agm.position}
            </Text>
          </>
        )}
      </>
    )

    return content
  }

  return (
    <Document
      author="General Santos City Water District"
      subject="Position Request Form - HRD-001-4"
      title="Position Request Form"
    >
      <Page size="A4" style={styles.page}>
        <Header />

        <View style={styles.bodyBorder}>
          {/* Form Body*/}
          <View style={[styles.documentTitle]}>
            <Text>POSITION REQUEST FORM</Text>
          </View>

          {/* Section 1 */}
          <View style={[styles.borderTop, { paddingTop: 15 }]}>
            <View style={[styles.rowContainer, { marginBottom: 13 }]}>
              <View style={[styles.w8, styles.keyText]}>
                <Text>DATE</Text>
              </View>

              <View style={[styles.w5, styles.keyText]}>
                <Text>:</Text>
              </View>

              <View style={[styles.w50, styles.borderBottom, styles.valueText]}>
                <Text style={[{ paddingLeft: 10 }]}>
                  {formatDate(prfDetails.dateRequested)}
                </Text>
              </View>
            </View>

            <View style={[styles.rowContainer, { marginBottom: 10 }]}>
              <View style={[styles.w8, styles.keyText]}>
                <Text>FOR</Text>
              </View>

              <View style={[styles.w5, styles.keyText]}>
                <Text>:</Text>
              </View>

              <View style={[styles.w50, styles.valueText]}>
                <Text
                  style={[
                    styles.borderBottom,
                    styles.upperCase,
                    { paddingLeft: 10 },
                  ]}
                >
                  {prfDetails.for.name}
                </Text>
                <Text style={[styles.positionText, { paddingLeft: 10 }]}>
                  {prfDetails.for.position}
                </Text>
              </View>
            </View>

            <View style={[styles.rowContainer, { marginBottom: 10 }]}>
              <View style={[styles.w8, styles.keyText]}>
                <Text>FROM</Text>
              </View>

              <View style={[styles.w5, styles.keyText]}>
                <Text>:</Text>
              </View>

              <View style={[styles.w50, styles.valueText]}>
                <Text
                  style={[
                    styles.borderBottom,
                    styles.upperCase,
                    { paddingLeft: 10 },
                  ]}
                >
                  {prfDetails.from.name}
                </Text>
                <Text style={[styles.positionText, { paddingLeft: 10 }]}>
                  {prfDetails.from.position}
                </Text>
              </View>
            </View>
          </View>

          {/* Section 2 */}
          <View style={[styles.borderTop, { paddingVertical: 10 }]}>
            <Text style={[styles.respectText, { marginVertical: "auto" }]}>
              Respectfully requesting from your end for additional personnel as
              follows:
            </Text>
          </View>

          {/* Section 3 */}
          {/* Header */}
          <View style={[styles.borderTop, styles.rowContainer]}>
            <View style={[styles.w20, styles.borderRight]}>
              <Text style={[styles.thText]}>ITEM NO.</Text>
            </View>
            <View style={[styles.w30, styles.borderRight]}>
              <Text style={[styles.thText]}>POSITION</Text>
            </View>
            <View style={[styles.w25, styles.borderRight]}>
              <Text style={[styles.thText]}>ASSIGNED TO</Text>
            </View>
            <View style={[styles.w25]}>
              <Text style={[styles.thText]}>REMARKS/JUSTIFICATION</Text>
            </View>
          </View>

          {/* Positions */}
          {renderPositions()}

          {/* Section 4 */}
          <View style={[styles.borderTop, styles.rowContainer]}>
            {/* Date Needed */}
            <View
              style={[styles.w50, styles.borderRight, styles.dateNeededText]}
            >
              <View
                style={[
                  styles.verticalCenter,
                  styles.rowContainer,
                  { marginHorizontal: "auto" },
                ]}
              >
                {/* <Text>Date needed: </Text>
                <View
                  style={[
                    styles.borderBottom,
                    styles.w40,
                    styles.horizontalCenter,
                  ]}
                >
                  <Text>{formatDate(prfDetails.dateNeeded)}</Text>
                </View> */}
              </View>
            </View>

            {/* Examination */}
            <View
              style={[
                styles.w50,
                styles.examinationText,
                { paddingVertical: 5 },
              ]}
            >
              <View
                style={[styles.verticalCenter, { marginHorizontal: "auto" }]}
              >
                <View style={[styles.rowContainer]}>
                  <View
                    style={[
                      styles.borderBottom,
                      styles.w15,
                      { paddingLeft: 7 },
                    ]}
                  >
                    <Text>{prfDetails.withExam ? "X" : " "}</Text>
                  </View>
                  <Text>with examination</Text>
                </View>

                <View style={[styles.rowContainer, { paddingTop: 5 }]}>
                  <View
                    style={[
                      styles.borderBottom,
                      styles.w15,
                      { paddingLeft: 7 },
                    ]}
                  >
                    <Text>{!prfDetails.withExam ? "X" : " "}</Text>
                  </View>
                  <Text>without examination</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.borderTop]}>
            <Text style={{ paddingVertical: 10 }}></Text>
          </View>

          {/* Section 5 */}
          {/* Signatories */}
          <View style={[styles.borderTop, styles.rowContainer]}>
            {/* REQUESTED BY */}
            <View
              style={[styles.w33_33, styles.signatureText, styles.borderRight]}
            >
              <Text style={[{ padding: "4 0 0 2" }]}>Requested by:</Text>
              <Image
                source={`${prfDetails.from.fromSignatureUrl}`}
                style={[styles.signature]}
              />
              <Text style={[styles.signatoryName]}>{prfDetails.from.name}</Text>
              <Text style={[styles.borderTop, { padding: "5 0 0 2" }]}>
                {prfDetails.from.position}
              </Text>
            </View>

            {/* REVIEWED BY */}
            <View
              style={[styles.w33_33, styles.signatureText, styles.borderRight]}
            >
              <Text style={[{ padding: "4 0 0 2" }]}>Reviewed by:</Text>
              {renderReviewedBy()}
            </View>

            {/* RECOMMENDED BY */}
            <View style={[styles.w33_33, styles.signatureText]}>
              <Text style={[{ padding: "4 0 0 2" }]}>Recommended by:</Text>
              {renderRecommendedBy()}
            </View>
          </View>

          {/* Section 6 */}
          {/* Signatories */}
          <View style={[styles.borderTop, styles.rowContainer]}>
            {/* CERTIFIED CORRECT BY */}
            <View
              style={[styles.w50, styles.signatureText, styles.borderRight]}
            >
              <Text style={[{ padding: "4 0 0 2" }]}>
                Certified correct by:
              </Text>

              {/* Update Signature */}
              <Image
                source={`${prfTrail.admin.signatureUrl}`}
                style={[styles.signatureCertified]}
              />

              <Text style={[styles.signatoryName]}>{prfTrail.admin.name}</Text>
              {/* FIXED */}
              <Text style={[styles.borderTop, { padding: "5 0 0 2" }]}>
                {prfTrail.admin.position}
              </Text>
            </View>

            {/* ACTION TAKEN */}
            <View style={[styles.w50, styles.signatureText]}>
              <Text
                style={[
                  { padding: "4 0 0 2", fontFamily: "CalibriRegularBold" },
                ]}
              >
                Action Taken:
              </Text>

              <View style={[{ margin: "0 2" }]}>
                <View style={[styles.rowContainer]}>
                  <View
                    style={[styles.borderBottom, styles.w8, { paddingLeft: 2 }]}
                  >
                    <Text>{prfDetails.status === "Approved" ? "X" : " "}</Text>
                  </View>
                  <Text>Approved for Publication</Text>
                </View>

                <View
                  style={[
                    styles.rowContainer,
                    { paddingTop: 5, alignItems: "flex-start" },
                  ]}
                >
                  <View
                    style={[styles.borderBottom, styles.w8, { paddingLeft: 2 }]}
                  >
                    <Text>
                      {prfDetails.status === "Disapproved" ? "X" : " "}
                    </Text>
                  </View>
                  <Text>Disapproved due to:</Text>

                  <View
                    style={[
                      styles.borderBottom,
                      styles.w50,
                      { paddingLeft: 3 },
                    ]}
                  >
                    <Text>{prfDetails.disapprovedRemarks || " "}</Text>
                  </View>
                </View>
              </View>

              {/* FINAL APPROVING BODY */}
              <View style={[styles.w65]}>
                <Image
                  source={`${prfDetails.for.forSignatureUrl}`}
                  style={[styles.signatureApproving]}
                />
              </View>

              <View style={[styles.rowContainer]}>
                <Text
                  style={[
                    styles.w65,
                    styles.horizontalCenter,
                    {
                      fontFamily: "CalibriRegularBold",
                      textTransform: "uppercase",
                    },
                  ]}
                >
                  {prfDetails.for.name}
                </Text>

                {/* Update the date if the final approving body is not GM */}
                <Text style={[styles.w35, styles.horizontalCenter]}>
                  {formatDate(prfTrail.gm.updatedAt)}
                </Text>
              </View>

              <View style={[styles.borderTop, { padding: "5 0 0 2" }]}>
                <View style={[styles.rowContainer]}>
                  <Text style={[styles.w65, styles.horizontalCenter]}>
                    {prfDetails.for.position}
                  </Text>
                  <Text style={[styles.w35, styles.horizontalCenter]}>
                    Date
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={[styles.borderTop, styles.rowContainer]}>
            <Text style={[styles.prfNoText]}>PRF No: {prfDetails.prfNo}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

PrfDocument.propTypes = {
  prfDetails: PropTypes.object.isRequired,
  prfTrail: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
}
export default PrfDocument
