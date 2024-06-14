import React from 'react'
import PropTypes from 'prop-types'

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import Header from 'components/PdfDocuments/EmployeeDetails/Header'

// Fonts
import CalibriRegular from 'assets/fonts/uploads/calibri-regular.ttf'
import CalibriRegularBold from 'assets/fonts/uploads/calibri-regular-bold.ttf'
import { isEmpty } from 'lodash'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingBottom: 25,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 5,
  },
  bodyBorder: {
    marginHorizontal: 50,
  },

  header: {
    textAlign: 'center',
    color: '#000000',
  },

  // Table Styles
  rowContainerTable: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tHeadFirstLevel: {
    padding: '4 0 0 4',
    fontSize: 11,
  },
  tHeadSecondLevel: {
    fontFamily: 'CalibriRegularBold',
    padding: '4 0 0 4',
    textAlign: 'center',
  },
  tData: {
    padding: '4 4 0 4',
    fontSize: 9,
  },

  // Border Styles
  borderAll: {
    border: '1px solid #000000',
  },
  borderTop: {
    borderTop: '1px solid #000000',
  },
  borderRight: {
    borderRight: '1px solid #000000',
  },
  borderLeft: {
    borderLeft: '1px solid #000000',
  },
  borderBottom: {
    borderBottom: '1px solid #000000',
  },

  // Field Styles
  documentTitle: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  headerText: {
    fontFamily: 'CalibriRegularBold',
    textDecoration: 'underline',
    fontSize: 13,
    marginTop: 15,
    marginBottom: 4,
  },
  bodyText: {
    fontFamily: 'CalibriRegular',
    fontSize: 12,
  },
  bodyTextBold: {
    fontFamily: 'CalibriRegularBold',
    fontSize: 12,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  signatoryName: {
    fontFamily: 'CalibriRegularBold',
    textTransform: 'uppercase',
    paddingTop: 3,
  },

  verticalCenter: { margin: 'auto 0' },
  horizontalCenter: { textAlign: 'center' },
  signature: {
    width: 100,
    marginHorizontal: 'auto',
  },

  // Width Styles
  w100: { width: '100%' },
  w75: { width: '75%' },
  w70: { width: '70%' },
  w60: { width: '60%' },
  w50: { width: '50%' },
  w40: { width: '40%' },
  w33_33: { width: '33.33%' },
  w30: { width: '30%' },
  w26: { width: '26%' },
  w24: { width: '24%' },
  w22: { width: '22%' },
  w20: { width: '20%' },
  w18: { width: '18%' },
  w16: { width: '16%' },
  w15: { width: '15%' },
  w14: { width: '14%' },
  w12: { width: '12%' },
  w10: { width: '10%' },
  w8: { width: '8%' },
  w5: { width: '5%' },
  w3: { width: '3%' },
})

Font.register({
  family: 'CalibriRegular',
  src: CalibriRegular,
})

Font.register({
  family: 'CalibriRegularBold',
  src: CalibriRegularBold,
})

const EmployeeDetailsDocument = ({ employeeDetails }) => {
  if (isEmpty(employeeDetails)) return null

  const chunkSubstr = word => {
    const middle = Math.floor(word.length / 2)
    const parts =
      word.length === 1
        ? [word]
        : [word.substring(0, middle), word.substring(middle)]

    return parts
  }

  const companyId = employeeDetails.find(
    employee => employee.companyId
  )?.companyId

  const defaultDetails = {
    firstName: employeeDetails.find(employee => employee.firstName)?.firstName,
    middleName: employeeDetails.find(employee => employee.middleName)
      ?.middleName,
    lastName: employeeDetails.find(employee => employee.lastName)?.lastName,
    fullName: employeeDetails.find(employee => employee.fullName)?.fullName,
    nameExt: employeeDetails.find(employee => employee.nameExt)?.nameExt,
    natureOfAppointment: employeeDetails.find(
      employee => employee.natureOfAppointment
    )?.natureOfAppointment,
    email: employeeDetails.find(employee => employee.email)?.email,
  }

  const personalDetails = {
    sex: employeeDetails.find(employee => employee.sex)?.sex,
    birthDate: employeeDetails.find(employee => employee.birthDate)?.birthDate,
    height: employeeDetails.find(employee => employee.height)?.height,
    weight: employeeDetails.find(employee => employee.weight)?.weight,
    bloodType: employeeDetails.find(employee => employee.bloodType)?.bloodType,
    birthPlace: employeeDetails.find(employee => employee.birthPlace)
      ?.birthPlace,
    civilStatus: employeeDetails.find(employee => employee.civilStatus)
      ?.civilStatus,
  }

  const dateHired = employeeDetails.find(
    employee => employee.dateHired
  )?.dateHired
  const positionTitle = employeeDetails.find(
    employee => employee.positionTitle
  )?.positionTitle

  const assignment = employeeDetails.find(
    employee => employee.assignment
  )?.assignment
  const office = employeeDetails.find(employee => employee.office)?.office
  const department = employeeDetails.find(
    employee => employee.department
  )?.department
  const division = employeeDetails.find(employee => employee.division)?.division

  const gsis = employeeDetails.find(employee => employee.gsis)?.gsis
  const pagibig = employeeDetails.find(employee => employee.pagibig)?.pagibig
  const sss = employeeDetails.find(employee => employee.sss)?.sss
  const philhealth = employeeDetails.find(
    employee => employee.philhealth
  )?.philhealth
  const tin = employeeDetails.find(employee => employee.tin)?.tin

  const permanentAddress = employeeDetails.find(
    employee => employee.permanentAddress
  )?.permanentAddress

  const residentialAddress = employeeDetails.find(
    employee => employee.residentialAddress
  )?.residentialAddress

  const primaryEducation = employeeDetails.find(
    employee => employee.primaryEducation
  )?.primaryEducation

  const secondaryEducation = employeeDetails.find(
    employee => employee.secondaryEducation
  )?.secondaryEducation

  const vocationalCourse = employeeDetails.find(
    employee => employee.vocationalCourse
  )?.vocationalCourse

  const collegeEducation = employeeDetails.find(
    employee => employee.collegeEducation
  )?.collegeEducation

  const graduateStudies = employeeDetails.find(
    employee => employee.graduateStudies
  )?.graduateStudies

  const eligibility = employeeDetails.find(
    employee => employee.eligibility
  )?.eligibility

  const salaryGrade = employeeDetails.find(
    employee => employee.salaryGrade
  )?.salaryGrade

  const stepIncrement = employeeDetails.find(
    employee => employee.stepIncrement
  )?.stepIncrement

  const renderHeader = () => (
    <View style={styles.documentTitle}>
      <Text>Employee Details Report</Text>
    </View>
  )

  const renderTableHeader = () => {
    let content = (
      <>
        <View style={[styles.rowContainerTable, styles.borderAll]}>
          {/* header for index */}
          <View style={[styles.w5, styles.borderRight]}>
            <Text
              style={[styles.horizontalCenter, styles.verticalCenter]}
            ></Text>
          </View>
          {/* Company ID */}
          {companyId ? (
            <View style={[styles.w12, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Company ID
              </Text>
            </View>
          ) : null}

          {/* defaultDetails */}
          {['fullName', 'natureOfAppointment', 'email'].map(key =>
            defaultDetails[key] !== undefined ? (
              <View
                key={key}
                style={[
                  key === 'email'
                    ? styles.w26
                    : key === 'fullName'
                    ? styles.w16
                    : styles.w14,
                  styles.borderRight,
                ]}
              >
                <Text
                  style={[
                    styles.horizontalCenter,
                    styles.verticalCenter,
                    styles.tHeadFirstLevel,
                  ]}
                >
                  {key === 'fullName'
                    ? 'Full Name'
                    : key === 'natureOfAppointment'
                    ? 'Nature of Appointment'
                    : key === 'email'
                    ? 'E-mail Address'
                    : null}
                </Text>
              </View>
            ) : null
          )}

          {/* Date Hired */}
          {dateHired ? (
            <View style={[styles.w10, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Date Hired
              </Text>
            </View>
          ) : null}

          {/* Position Title */}
          {positionTitle ? (
            <View style={[styles.w15, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Position Title
              </Text>
            </View>
          ) : null}

          {/* Assignment */}
          {assignment ? (
            <View style={[styles.w20, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Assignment
              </Text>
            </View>
          ) : null}

          {/* Office */}
          {office ? (
            <View style={[styles.w20, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Office
              </Text>
            </View>
          ) : null}

          {/* Department */}
          {department ? (
            <View style={[styles.w20, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Department
              </Text>
            </View>
          ) : null}

          {/* Division */}
          {division ? (
            <View style={[styles.w20, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Division
              </Text>
            </View>
          ) : null}

          {/* personalDetails */}
          {[
            'sex',
            'birthDate',
            'height',
            'weight',
            'bloodType',
            'birthPlace',
            'civilStatus',
          ].map(key =>
            personalDetails[key] ? (
              <View
                key={key}
                style={[
                  key === 'sex'
                    ? styles.w8
                    : key === 'height'
                    ? styles.w8
                    : key === 'weight'
                    ? styles.w8
                    : key === 'bloodType'
                    ? styles.w10
                    : key === 'civilStatus'
                    ? styles.w10
                    : styles.w14,
                  styles.borderRight,
                ]}
              >
                <Text
                  style={[
                    styles.horizontalCenter,
                    styles.verticalCenter,
                    styles.tHeadFirstLevel,
                  ]}
                >
                  {key === 'sex'
                    ? 'Sex'
                    : key === 'birthDate'
                    ? 'Birthdate'
                    : key === 'height'
                    ? 'Height'
                    : key === 'weight'
                    ? 'Weight'
                    : key === 'bloodType'
                    ? 'Blood Type'
                    : key === 'birthPlace'
                    ? 'Birthplace'
                    : key === 'civilStatus'
                    ? 'Civil Status'
                    : null}
                </Text>
              </View>
            ) : null
          )}

          {/* Date hired */}
          {companyId ? (
            <View style={[styles.w12, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Company ID
              </Text>
            </View>
          ) : null}

          {/* govt headers */}
          {gsis ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                GSIS
              </Text>
            </View>
          ) : null}
          {pagibig ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                PAGIBIG
              </Text>
            </View>
          ) : null}
          {sss ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                SSS
              </Text>
            </View>
          ) : null}
          {philhealth ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                PhilHealth
              </Text>
            </View>
          ) : null}
          {tin ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                TIN
              </Text>
            </View>
          ) : null}

          {/* address headers */}
          {permanentAddress ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Permanent Address
              </Text>
            </View>
          ) : null}
          {residentialAddress ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Residential Address
              </Text>
            </View>
          ) : null}

          {/* education */}
          {primaryEducation ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Primary Education
              </Text>
            </View>
          ) : null}
          {secondaryEducation ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Secondary Education
              </Text>
            </View>
          ) : null}
          {vocationalCourse ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Vocational Course
              </Text>
            </View>
          ) : null}
          {collegeEducation ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                College Education
              </Text>
            </View>
          ) : null}
          {graduateStudies ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Graduate Studies
              </Text>
            </View>
          ) : null}

          {/* Eligibility */}
          {eligibility ? (
            <View style={[styles.w14, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Eligibility
              </Text>
            </View>
          ) : null}

          {/* Salary Grade */}
          {salaryGrade ? (
            <View style={[styles.w10, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Salary Grade
              </Text>
            </View>
          ) : null}
          {/* Step Increment */}
          {stepIncrement ? (
            <View style={[styles.w10, styles.borderRight]}>
              <Text
                style={[
                  styles.horizontalCenter,
                  styles.verticalCenter,
                  styles.tHeadFirstLevel,
                ]}
              >
                Salary Grade
              </Text>
            </View>
          ) : null}
        </View>
      </>
    )
    return content
  }

  const renderEmployeeDetails = () => {
    let content = employeeDetails.map((employee, index) => {
      return (
        <View
          key={index}
          style={[styles.rowContainerTable, styles.borderAll]}
          wrap={false}
        >
          {/* number */}
          <View style={[styles.w5, styles.tData, styles.borderRight]}>
            <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
              {index + 1}
            </Text>
          </View>

          {/* company id */}
          {companyId ? (
            <View style={[styles.w12, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.companyId || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* defaultDetails */}
          {defaultDetails.fullName ? (
            <View style={[styles.w16, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.fullName || 'N/A'}
              </Text>
            </View>
          ) : null}
          {defaultDetails.natureOfAppointment ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.natureOfAppointment.charAt(0).toUpperCase() +
                  employee.natureOfAppointment.slice(1) || 'N/A'}
              </Text>
            </View>
          ) : null}
          {defaultDetails.email ? (
            <View style={[styles.w26, styles.tData, styles.borderRight]}>
              <Text
                style={[styles.horizontalCenter, styles.verticalCenter]}
                hyphenationCallback={e => chunkSubstr(e)}
              >
                {employee.email || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* dateHired */}
          {dateHired ? (
            <View style={[styles.w10, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.dateHired || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* positionTitle */}
          {positionTitle ? (
            <View style={[styles.w15, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.positionTitle || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* assignment */}
          {assignment ? (
            <View style={[styles.w20, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.assignment || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* office */}
          {office ? (
            <View style={[styles.w20, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.office || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* department */}
          {department ? (
            <View style={[styles.w20, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.department || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* division */}
          {division ? (
            <View style={[styles.w20, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.division || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* personalDetails */}
          {personalDetails.sex ? (
            <View style={[styles.w8, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.sex || 'N/A'}
              </Text>
            </View>
          ) : null}
          {personalDetails.birthDate ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.birthDate || 'N/A'}
              </Text>
            </View>
          ) : null}
          {personalDetails.height ? (
            <View style={[styles.w8, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.height || 'N/A'}
              </Text>
            </View>
          ) : null}
          {personalDetails.weight ? (
            <View style={[styles.w8, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.weight || 'N/A'}
              </Text>
            </View>
          ) : null}
          {personalDetails.bloodType ? (
            <View style={[styles.w10, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.bloodType || 'N/A'}
              </Text>
            </View>
          ) : null}
          {personalDetails.birthPlace ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.birthPlace || 'N/A'}
              </Text>
            </View>
          ) : null}
          {personalDetails.civilStatus ? (
            <View style={[styles.w10, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.civilStatus || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* govt */}
          {gsis ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.gsis || 'N/A'}
              </Text>
            </View>
          ) : null}
          {pagibig ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.pagibig || 'N/A'}
              </Text>
            </View>
          ) : null}
          {sss ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.sss || 'N/A'}
              </Text>
            </View>
          ) : null}
          {philhealth ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.philhealth || 'N/A'}
              </Text>
            </View>
          ) : null}
          {tin ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.tin || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* address */}
          {permanentAddress ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.permanentAddress || 'N/A'}
              </Text>
            </View>
          ) : null}
          {residentialAddress ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.residentialAddress || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* education */}
          {primaryEducation ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.primaryEducation || 'N/A'}
              </Text>
            </View>
          ) : null}
          {secondaryEducation ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.secondaryEducation || 'N/A'}
              </Text>
            </View>
          ) : null}
          {vocationalCourse ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.vocationalCourse || 'N/A'}
              </Text>
            </View>
          ) : null}
          {collegeEducation ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.collegeEducation || 'N/A'}
              </Text>
            </View>
          ) : null}
          {graduateStudies ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.graduateStudies || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* eligibility */}
          {eligibility ? (
            <View style={[styles.w14, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.eligibility || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* salaryGrade */}
          {salaryGrade ? (
            <View style={[styles.w10, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.salaryGrade || 'N/A'}
              </Text>
            </View>
          ) : null}

          {/* stepIncrement */}
          {stepIncrement ? (
            <View style={[styles.w10, styles.tData, styles.borderRight]}>
              <Text style={[styles.horizontalCenter, styles.verticalCenter]}>
                {employee.stepIncrement || 'N/A'}
              </Text>
            </View>
          ) : null}
        </View>
      )
    })
    return content
  }

  return (
    <Document
      author="General Santos City Water District"
      subject="Employee Details Report"
      title={'Employee Details Report'}
    >
      <Page size={[612.3, 935.4]} orientation="landscape" style={styles.page}>
        <Header />
        <View style={{ paddingVertical: 5, paddingHorizontal: 20 }}>
          {renderHeader()}
          {renderTableHeader()}
          {renderEmployeeDetails()}
        </View>
      </Page>
    </Document>
  )
}

EmployeeDetailsDocument.propTypes = {
  employeeDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default EmployeeDetailsDocument
