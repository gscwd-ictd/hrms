import React, { useEffect, useState } from 'react'
import {
  Col,
  Form,
  FormGroup,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
} from 'reactstrap'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

// Formik formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

// Tab Components
import PersonalInformationForm from './PersonalInformationForm'
import FamilyBackgroundForm from './FamilyBackgroundForm'

// style
import 'styles/custom_gscwd/components/personaldatasheet.scss'

const PersonalDataSheetForm = () => {
  const [activeTab, setactiveTab] = useState(1)

  const {
    basicInfo,
    familyInfo,
    educationInfo,
    eligibilityInfo,
    workExperienceInfo,
    voluntaryWorkInfo,
    learningDevelopmentInfo,
    otherInfo,
  } = useSelector(state => ({
    basicInfo: state.employee.employeePds.basicInfo,
    familyInfo: state.employee.employeePds.family,
    educationInfo: state.employee.employeePds.education,
    eligibilityInfo: state.employee.employeePds.eligibility,
    workExperienceInfo: state.employee.employeePds.workExperience,
    voluntaryWorkInfo: state.employee.employeePds.voluntaryWork,
    learningDevelopmentInfo: state.employee.employeePds.learningDevelopment,
    otherInfo: state.employee.employeePds.otherInfo,
  }))

  const formatDate = assignedDate => {
    const date = new Date(assignedDate)
    return dayjs(date.toLocaleDateString()).format('YYYY-MM-DD')
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      basicInfo: {
        personalInfo: {
          lastName: basicInfo.personalInfo.lastName || '',
          firstName: basicInfo.personalInfo.firstName || '',
          middleName: basicInfo.personalInfo.middleName || '',
          nameExtension: basicInfo.personalInfo.nameExtension || '',
          birthDate: formatDate(basicInfo.personalInfo.birthDate) || '',
          birthPlace: basicInfo.personalInfo.birthPlace || '',
          sex: basicInfo.personalInfo.sex || '',
          civilStatus: basicInfo.personalInfo.civilStatus || '',
          height: basicInfo.personalInfo.height || '',
          weight: basicInfo.personalInfo.weight || '',
          bloodType: basicInfo.personalInfo.bloodType || '',
          citizenship: basicInfo.personalInfo.citizenship || '',
          citizenshipType: basicInfo.personalInfo.citizenshipType || '',
          country: basicInfo.personalInfo.country || '',
          email: basicInfo.personalInfo.email || '',
          mobileNumber: basicInfo.personalInfo.mobileNumber || '',
          telNumber: basicInfo.personalInfo.telNumber || '',
        },
        address: {
          permanentAddress: {
            houseNumber: basicInfo.address.permanentAddress.houseNumber || '',
            street: basicInfo.address.permanentAddress.street || '',
            subdivision: basicInfo.address.permanentAddress.subdivision || '',
            province: basicInfo.address.permanentAddress.province || '',
            city: basicInfo.address.permanentAddress.city || '',
            barangay: basicInfo.address.permanentAddress.barangay || '',
            zipCode: basicInfo.address.permanentAddress.zipCode || '',
          },
          residentialAddress: {
            houseNumber: basicInfo.address.residentialAddress.houseNumber || '',
            street: basicInfo.address.residentialAddress.street || '',
            subdivision: basicInfo.address.residentialAddress.subdivision || '',
            province: basicInfo.address.residentialAddress.province || '',
            city: basicInfo.address.residentialAddress.city || '',
            barangay: basicInfo.address.residentialAddress.barangay || '',
            zipCode: basicInfo.address.residentialAddress.zipCode || '',
          },
        },
        governmentIssuedIds: {
          gsisNumber: basicInfo.governmentIssuedIds.gsisNumber || '',
          pagibigNumber: basicInfo.governmentIssuedIds.pagibigNumber || '',
          philhealthNumber:
            basicInfo.governmentIssuedIds.philhealthNumber || '',
          sssNumber: basicInfo.governmentIssuedIds.sssNumber || '',
          tinNumber: basicInfo.governmentIssuedIds.tinNumber || '',
          agencyNumber: basicInfo.governmentIssuedIds.agencyNumber || '',
        },
      },
    },
    validationSchema: Yup.object().shape({
      basicInfo: Yup.object().shape({
        personalInfo: Yup.object().shape({
          lastName: Yup.string().required('Please enter a last name'),
          firstName: Yup.string().required('Please enter a first name'),
          birthDate: Yup.date().required('Please enter birth date'),
          birthPlace: Yup.string().required('Please enter birth place'),
          sex: Yup.string().required('Please select a gender'),
          civilStatus: Yup.string().required('Please select a civil status'),
          height: Yup.number().required('Please enter height'),
          weight: Yup.number().required('Please enter weight'),
          bloodType: Yup.string().required('Please select a blood type'),
          citizenship: Yup.string().required('Please select a citizenship'),
          country: Yup.string().required('Please select a country'),
          mobileNumber: Yup.string().required('Please enter mobile number'),
        }),
        address: Yup.object().shape({
          permanentAddress: Yup.object().shape({
            houseNumber: Yup.string().required(
              'Please enter House/Block/Lot No. '
            ),
            province: Yup.string().required('Please select a province'),
            city: Yup.string().required('Please select a city/municipality'),
            barangay: Yup.string().required('Please select a barangay'),
            zipCode: Yup.number().required('Please enter zip code'),
          }),
          residentialAddress: Yup.object().shape({
            houseNumber: Yup.string().required(
              'Please enter House/Block/Lot No. '
            ),
            province: Yup.string().required('Please select a province'),
            city: Yup.string().required('Please select a city/municipality'),
            barangay: Yup.string().required('Please select a barangay'),
            zipCode: Yup.number().required('Please enter zip code'),
          }),
        }),
      }),
    }),
    onSubmit: values => {
      // do nothing
    },
  })

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 9) {
        setactiveTab(tab)
      }
    }
  }

  return (
    <React.Fragment>
      <div className="vertical-wizard wizard clearfix vertical">
        <div className="steps clearfix">
          <ul>
            {/* Personal Information */}
            <NavItem
              className={classnames({
                current: activeTab === 1,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 1 })}
                onClick={() => {
                  setactiveTab(1)
                }}
              >
                <span className="number">01</span>{' '}
                <span>Personal Information</span>
              </NavLink>
            </NavItem>

            {/* Family Background */}
            <NavItem
              className={classnames({
                current: activeTab === 2,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 2 })}
                onClick={() => {
                  setactiveTab(2)
                }}
              >
                <span className="number">02</span>{' '}
                <span>Family Background</span>
              </NavLink>
            </NavItem>

            {/* Educational Background */}
            <NavItem
              className={classnames({
                current: activeTab === 3,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 3 })}
                onClick={() => {
                  setactiveTab(3)
                }}
              >
                <span className="number">03</span>{' '}
                <span>Educational Background</span>
              </NavLink>
            </NavItem>

            {/* Eligibility */}
            <NavItem
              className={classnames({
                current: activeTab === 4,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 4 })}
                onClick={() => {
                  setactiveTab(4)
                }}
              >
                <span className="number">04</span> <span>Eligibility</span>
              </NavLink>
            </NavItem>

            {/* Work Experience */}
            <NavItem
              className={classnames({
                current: activeTab === 5,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 5 })}
                onClick={() => {
                  setactiveTab(5)
                }}
              >
                <span className="number">05</span> <span>Work Experience</span>
              </NavLink>
            </NavItem>

            {/* Voluntary Work Or Involvement In Civic / Non-Government / People / Voluntary Organization/s */}
            <NavItem
              className={classnames({
                current: activeTab === 6,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 6 })}
                onClick={() => {
                  setactiveTab(6)
                }}
              >
                <span className="number">06</span> <span>Voluntary Work</span>
              </NavLink>
            </NavItem>

            {/* Learning And Development (L&D) Interventions/Training Programs Attended */}
            <NavItem
              className={classnames({
                current: activeTab === 7,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 7 })}
                onClick={() => {
                  setactiveTab(7)
                }}
              >
                <span className="number">07</span>{' '}
                <span>Learning And Development</span>
              </NavLink>
            </NavItem>

            {/* Other Information */}
            <NavItem
              className={classnames({
                current: activeTab === 8,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 8 })}
                onClick={() => {
                  setactiveTab(8)
                }}
              >
                <span className="number">08</span>{' '}
                <span>Other Information</span>
              </NavLink>
            </NavItem>

            {/* Confirm Details */}
            <NavItem
              className={classnames({
                current: activeTab === 9,
              })}
            >
              <NavLink
                className={classnames({ active: activeTab === 9 })}
                onClick={() => {
                  setactiveTab(9)
                }}
              >
                <span className="number">09</span> <span>Confirm Details</span>
              </NavLink>
            </NavItem>
          </ul>
        </div>

        <div className="content clearfix">
          <Form
            onSubmit={e => {
              e.preventDefault()
              formik.handleSubmit()
              return false
            }}
          >
            <TabContent
              activeTab={activeTab}
              className="twitter-bs-wizard-tab-content"
            >
              <TabPane tabId={1}>
                <PersonalInformationForm
                  formik={formik}
                  basicInfo={basicInfo}
                />
              </TabPane>
              <TabPane tabId={2}>
                <FamilyBackgroundForm />
              </TabPane>
              <TabPane tabId={9}>
                <div className="row justify-content-center">
                  <Col lg="6">
                    <div className="text-center">
                      <div className="mb-4">
                        <i className="mdi mdi-content-save-alert-outline text-success display-4" />
                      </div>
                      <div>
                        <h5>Confirm the details first before submitting!</h5>
                        <FormGroup>
                          <Button type="submit" color="primary">
                            Submit
                          </Button>
                        </FormGroup>
                      </div>
                    </div>
                  </Col>
                </div>
              </TabPane>
            </TabContent>
          </Form>
        </div>
        <div className="actions clearfix">
          <ul>
            <li className={activeTab === 1 ? 'previous disabled' : 'previous'}>
              <Link
                to="#"
                onClick={() => {
                  toggleTab(activeTab - 1)
                }}
              >
                Previous
              </Link>
            </li>
            <li className={activeTab === 4 ? 'next disabled' : 'next'}>
              <Link
                to="#"
                onClick={() => {
                  toggleTab(activeTab + 1)
                }}
              >
                Next
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PersonalDataSheetForm
