import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  FormText,
  FormFeedback,
  Spinner,
} from "reactstrap"
import { useSelector, useDispatch } from "react-redux"
import { isEmpty } from "lodash"
import { provinces, cities, barangays } from "select-philippines-address"
import PropTypes from "prop-types"

// Redux actions
import { getCountries } from "store/actions"

// Dropdown data
import * as selectInputs from "constants/selectInputs"

const PersonalInformationForm = props => {
  const { formik, basicInfo } = props

  const dispatch = useDispatch()
  const [dualCitizenship, setDualCitizenship] = useState(false)

  const [selectResProvinces, setSelectResProvince] = useState([])
  const [selectResCities, setSelectResCities] = useState([])
  const [selectResBarangay, setSelectResBarangay] = useState([])
  const [selectedResProvinceId, setselectedResProvinceId] = useState("")
  const [selectedResCityId, setselectedResCityId] = useState("")

  const [selectPermaProvinces, setSelectPermaProvince] = useState([])
  const [selectPermaCities, setSelectPermaCities] = useState([])
  const [selectPermaBarangay, setSelectPermaBarangay] = useState([])
  const [selectedPermaProvinceId, setselectedPermaProvinceId] = useState("")
  const [selectedPermaCityId, setselectedPermaCityId] = useState("")

  const [isDisabledInput, setisDisabledInput] = useState(false)

  const { countryList, countryLoading, countryError } = useSelector(state => ({
    countryList: state.countries.list,
    countryLoading: state.countries.isLoading,
    countryError: state.countries.error,
  }))

  const handleIfDual = event => {
    const value = event.target.value
    if (value === "Dual Citizenship") {
      setDualCitizenship(true)
      dispatch(getCountries())
    } else {
      setDualCitizenship(false)
    }
  }

  useEffect(() => {
    dispatch(getCountries())

    if (
      formik.values.basicInfo.personalInfo.citizenship === "Dual Citizenship"
    ) {
      setDualCitizenship(true)
    }
  }, [formik.values.basicInfo.personalInfo.citizenship])

  // Residential Address
  useEffect(() => {
    provinces().then(province => setSelectResProvince(province))
  }, [])

  useEffect(() => {
    if (formik.values.basicInfo.address.residentialAddress.province) {
      selectResProvinces
        .filter(
          province =>
            province.province_name ===
            formik.values.basicInfo.address.residentialAddress.province
        )
        .map(filtered => setselectedResProvinceId(filtered.province_code))
    }

    formik.values.basicInfo.address.residentialAddress.barangay = ""
  }, [
    formik.values.basicInfo.address.residentialAddress.province,
    selectResProvinces,
  ])
  useEffect(() => {
    if (selectedResProvinceId) {
      cities(selectedResProvinceId).then(city => setSelectResCities(city))
    }
  }, [selectedResProvinceId])

  useEffect(() => {
    if (formik.values.basicInfo.address.residentialAddress.city) {
      selectResCities
        .filter(
          city =>
            city.city_name ===
            formik.values.basicInfo.address.residentialAddress.city
        )
        .map(filtered => {
          setselectedResCityId(filtered.city_code)
        })
    }
  }, [formik.values.basicInfo.address.residentialAddress.city, selectResCities])
  useEffect(() => {
    if (selectedResCityId) {
      barangays(selectedResCityId).then(barangay =>
        setSelectResBarangay(barangay)
      )
    }
  }, [selectedResCityId])

  // Permanent Address
  useEffect(() => {
    provinces().then(province => setSelectPermaProvince(province))
  }, [])

  useEffect(() => {
    if (formik.values.basicInfo.address.permanentAddress.province) {
      selectPermaProvinces
        .filter(
          province =>
            province.province_name ===
            formik.values.basicInfo.address.permanentAddress.province
        )
        .map(filtered => setselectedPermaProvinceId(filtered.province_code))
    }
  }, [
    formik.values.basicInfo.address.permanentAddress.province,
    selectPermaProvinces,
  ])
  useEffect(() => {
    if (selectedPermaProvinceId) {
      cities(selectedPermaProvinceId).then(city => setSelectPermaCities(city))
    }
  }, [selectedPermaProvinceId])

  useEffect(() => {
    if (formik.values.basicInfo.address.permanentAddress.city) {
      selectPermaCities
        .filter(
          city =>
            city.city_name ===
            formik.values.basicInfo.address.permanentAddress.city
        )
        .map(filtered => {
          setselectedPermaCityId(filtered.city_code)
        })
    }
  }, [formik.values.basicInfo.address.permanentAddress.city, selectPermaCities])
  useEffect(() => {
    if (selectedPermaCityId) {
      barangays(selectedPermaCityId).then(barangay =>
        setSelectPermaBarangay(barangay)
      )
    }
  }, [selectedPermaCityId])

  return (
    <div className="row justify-content-center">
      <FormGroup>
        {!isEmpty(basicInfo) ? (
          <>
            <Row>
              <Col xs={12} md={6}>
                <Label for="input-lastName">Last Name</Label>
                <Input
                  name="basicInfo.personalInfo.lastName"
                  type="text"
                  id="input-lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basicInfo.personalInfo.lastName || ""}
                  invalid={
                    formik.touched.lastName && formik.errors.lastName
                      ? true
                      : false
                  }
                  disabled={isDisabledInput}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <FormFeedback type="invalid">
                    {formik.errors.lastName}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col xs={12} md={6}>
                <Label for="input-firstName">First Name</Label>
                <Input
                  name="basicInfo.personalInfo.firstName"
                  type="text"
                  id="input-firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basicInfo.personalInfo.firstName || ""}
                  invalid={
                    formik.touched.firstName && formik.errors.firstName
                      ? true
                      : false
                  }
                  disabled={isDisabledInput}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <FormFeedback type="invalid">
                    {formik.errors.firstName}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={12} md={6}>
                <Label for="input-middleName">Middle Name</Label>
                <Input
                  name="basicInfo.personalInfo.middleName"
                  type="text"
                  id="input-middleName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basicInfo.personalInfo.middleName || ""}
                  disabled={isDisabledInput}
                />
              </Col>
              <Col xs={12} md={6}>
                <Label for="input-nameExtension">Name Extension</Label>
                <Input
                  name="basicInfo.personalInfo.nameExtension"
                  type="text"
                  id="input-nameExtension"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.basicInfo.personalInfo.nameExtension || ""
                  }
                  disabled={isDisabledInput}
                />
                <FormText color="muted">Jr, Sr, II</FormText>
              </Col>
            </Row>

            <hr className="my-4"></hr>

            <Row className="mt-2">
              <Col md={6}>
                <Label for="input-birthDate">Date of Birth</Label>
                <Input
                  name="basicInfo.personalInfo.birthDate"
                  type="date"
                  id="input-birthDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basicInfo.personalInfo.birthDate || ""}
                  invalid={
                    formik.touched.birthDate && formik.errors.birthDate
                      ? true
                      : false
                  }
                  disabled={isDisabledInput}
                />
                {formik.touched.birthDate && formik.errors.birthDate ? (
                  <FormFeedback type="invalid">
                    {formik.errors.birthDate}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col md={6}>
                <Label for="input-sex">Sex</Label>
                <Input
                  name="basicInfo.personalInfo.sex"
                  type="select"
                  id="input-sex"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basicInfo.personalInfo.sex || ""}
                  invalid={
                    formik.touched.sex && formik.errors.sex ? true : false
                  }
                  disabled={isDisabledInput}
                >
                  <option value="">Select...</option>
                  {selectInputs.sexes.map((sex, index) => (
                    <option key={index} value={sex}>
                      {sex}
                    </option>
                  ))}
                </Input>
                {formik.touched.sex && formik.errors.sex ? (
                  <FormFeedback type="invalid">
                    {formik.errors.sex}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={12}>
                <Label for="input-birthPlace">Place of Birth</Label>
                <Input
                  name="basicInfo.personalInfo.birthPlace"
                  type="text"
                  id="input-birthPlace"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basicInfo.personalInfo.birthPlace || ""}
                  invalid={
                    formik.touched.birthPlace && formik.errors.birthPlace
                      ? true
                      : false
                  }
                  disabled={isDisabledInput}
                />
                {formik.touched.birthPlace && formik.errors.birthPlace ? (
                  <FormFeedback type="invalid">
                    {formik.errors.birthPlace}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={3}>
                <Label for="input-civilStatus">Civil Status</Label>
                <Input
                  name="basicInfo.personalInfo.civilStatus"
                  type="select"
                  id="input-civilStatus"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basicInfo.personalInfo.civilStatus || ""}
                  invalid={
                    formik.touched.civilStatus && formik.errors.civilStatus
                      ? true
                      : false
                  }
                  disabled={isDisabledInput}
                >
                  <option value="">Select...</option>
                  {selectInputs.civilStatuses.map((civilStatus, index) => (
                    <option key={index} value={civilStatus}>
                      {civilStatus}
                    </option>
                  ))}
                </Input>
                {formik.touched.civilStatus && formik.errors.civilStatus ? (
                  <FormFeedback type="invalid">
                    {formik.errors.civilStatus}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col md={3}>
                <Label for="input-height">Height</Label>
                <Input
                  name="basicInfo.personalInfo.height"
                  type="number"
                  id="input-height"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basicInfo.personalInfo.height || ""}
                  invalid={
                    formik.touched.height && formik.errors.height ? true : false
                  }
                  disabled={isDisabledInput}
                />
                {formik.touched.height && formik.errors.height ? (
                  <FormFeedback type="invalid">
                    {formik.errors.height}
                  </FormFeedback>
                ) : null}
                <FormText>in meters</FormText>
              </Col>
              <Col md={3}>
                <Label for="input-weight">Weight</Label>
                <Input
                  name="basicInfo.personalInfo.weight"
                  type="number"
                  id="input-height"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basicInfo.personalInfo.weight || ""}
                  invalid={
                    formik.touched.weight && formik.errors.weight ? true : false
                  }
                  disabled={isDisabledInput}
                />
                {formik.touched.weight && formik.errors.weight ? (
                  <FormFeedback type="invalid">
                    {formik.errors.weight}
                  </FormFeedback>
                ) : null}
                <FormText>in kilograms</FormText>
              </Col>
              <Col md={3}>
                <Label for="input-bloodType">Blood Type</Label>
                <Input
                  name="basicInfo.personalInfo.bloodType"
                  type="select"
                  id="input-bloodType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basicInfo.personalInfo.bloodType || ""}
                  invalid={
                    formik.touched.bloodType && formik.errors.bloodType
                      ? true
                      : false
                  }
                  disabled={isDisabledInput}
                >
                  <option value="">Select...</option>
                  {selectInputs.bloodTypes.map((bloodType, index) => (
                    <option key={index} value={bloodType}>
                      {bloodType}
                    </option>
                  ))}
                </Input>
                {formik.touched.bloodType && formik.errors.bloodType ? (
                  <FormFeedback type="invalid">
                    {formik.errors.bloodType}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>

            <hr className="my-4"></hr>

            <Row className="mt-2">
              <Col md={4}>
                <Label for="input-gsis">GSIS ID No</Label>
                <Input
                  name="basicInfo.governmentIssuedIds.gsisNumber"
                  type="text"
                  id="input-gsis"
                  maxLength={11}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.basicInfo.governmentIssuedIds.gsisNumber || ""
                  }
                  disabled={isDisabledInput}
                />
                <FormText>11-digit number</FormText>
              </Col>
              <Col md={4}>
                <Label for="input-pagibig">Pag-Ibig ID No</Label>
                <Input
                  name="basicInfo.governmentIssuedIds.pagibigNumber"
                  type="text"
                  id="input-pagibig"
                  maxLength={12}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.basicInfo.governmentIssuedIds.pagibigNumber ||
                    ""
                  }
                  disabled={isDisabledInput}
                />
                <FormText>12-digit number</FormText>
              </Col>
              <Col md={4}>
                <Label for="input-philhealth">PhilHealth No</Label>
                <Input
                  name="basicInfo.governmentIssuedIds.philhealthNumber"
                  type="text"
                  id="input-philhealth"
                  maxLength={12}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.basicInfo.governmentIssuedIds
                      .philhealthNumber || ""
                  }
                  disabled={isDisabledInput}
                />
                <FormText>12-digit number</FormText>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={4}>
                <Label for="input-sss">SSS No</Label>
                <Input
                  name="basicInfo.governmentIssuedIds.sssNumber"
                  type="text"
                  id="input-sss"
                  maxLength={10}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.basicInfo.governmentIssuedIds.sssNumber || ""
                  }
                  disabled={isDisabledInput}
                />
                <FormText>10-digit number</FormText>
              </Col>
              <Col md={4}>
                <Label for="input-tin">TIN</Label>
                <Input
                  name="basicInfo.governmentIssuedIds.tinNumber"
                  type="text"
                  id="input-tin"
                  maxLength={9}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.basicInfo.governmentIssuedIds.tinNumber || ""
                  }
                  disabled={isDisabledInput}
                />
                <FormText>9-digit number</FormText>
              </Col>
              <Col md={4}>
                <Label for="input-agencyNo">Agency Employee No</Label>
                <Input
                  name="basicInfo.governmentIssuedIds.agencyNumber"
                  type="text"
                  id="input-agencyNo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.basicInfo.governmentIssuedIds.agencyNumber ||
                    ""
                  }
                  disabled={isDisabledInput}
                />
              </Col>
            </Row>

            <hr className="my-4"></hr>

            <Row className="mt-2">
              <Col md={4}>
                <FormGroup>
                  <Label for="citizenship">Citizenship</Label>
                  {/* <FormGroup inline  onChange={handleIfDual}> */}
                  <FormGroup inline>
                    <FormGroup inline check>
                      <Label
                        check
                        // disabled={
                        //   !(
                        //     formik.values.basicInfo.personalInfo
                        //       .citizenship === "Filipino"
                        //   )
                        // }
                        disabled={isDisabledInput}
                      >
                        <Input
                          type="radio"
                          name="basicInfo.personalInfo.citizenship"
                          value="Filipino"
                          // disabled={
                          //   !(
                          //     formik.values.basicInfo.personalInfo
                          //       .citizenship === "Filipino"
                          //   )
                          // }
                          disabled={isDisabledInput}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          invalid={
                            formik.touched.citizenship &&
                            formik.errors.citizenship
                              ? true
                              : false
                          }
                          checked={
                            formik.values.basicInfo.personalInfo.citizenship ===
                            "Filipino"
                          }
                        />{" "}
                        Filipino
                      </Label>
                    </FormGroup>
                    <FormGroup inline check>
                      <Label
                        check
                        // disabled={
                        //   !(
                        //     formik.values.basicInfo.personalInfo
                        //       .citizenship === "Dual Citizenship"
                        //   )
                        // }
                        disabled={isDisabledInput}
                      >
                        <Input
                          type="radio"
                          name="basicInfo.personalInfo.citizenship"
                          value="Dual Citizenship"
                          // disabled={
                          //   !(
                          //     formik.values.basicInfo.personalInfo
                          //       .citizenship ===
                          //     "Dual Citizenship"
                          //   )
                          // }
                          disabled={isDisabledInput}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          invalid={
                            formik.touched.citizenship &&
                            formik.errors.citizenship
                              ? true
                              : false
                          }
                          checked={
                            formik.values.basicInfo.personalInfo.citizenship ===
                            "Dual Citizenship"
                          }
                        />{" "}
                        Dual Citizenship
                      </Label>
                    </FormGroup>
                    {formik.touched.citizenship && formik.errors.citizenship ? (
                      <FormFeedback type="invalid">
                        {formik.errors.citizenship}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </FormGroup>
              </Col>

              <Col md={8}>
                {dualCitizenship ? (
                  <>
                    <FormGroup>
                      <Label for="citizenshipType">Type</Label>
                      <FormGroup inline>
                        <FormGroup inline check>
                          <Label
                            check
                            // disabled={
                            //   !(
                            //     formik.values.basicInfo.personalInfo
                            //       .citizenshipType ===
                            //     "By Birth"
                            //   )
                            // }
                            disabled={isDisabledInput}
                          >
                            <Input
                              type="radio"
                              name="basicInfo.personalInfo.citizenshipType"
                              value="By Birth"
                              // disabled={
                              //   !(
                              //     formik.values.basicInfo.personalInfo
                              //       .citizenshipType ===
                              //     "By Birth"
                              //   )
                              // }
                              disabled={isDisabledInput}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={
                                formik.values.basicInfo.personalInfo
                                  .citizenshipType === "By Birth"
                              }
                            />{" "}
                            By Birth
                          </Label>
                        </FormGroup>
                        <FormGroup inline check>
                          <Label
                            check
                            // disabled={
                            //   !(
                            //     formik.values.basicInfo.personalInfo
                            //       .citizenshipType ===
                            //     "By Naturalization"
                            //   )
                            // }
                            disabled={isDisabledInput}
                          >
                            <Input
                              type="radio"
                              name="basicInfo.personalInfo.citizenshipType"
                              value="By Naturalization"
                              // disabled={
                              //   !(
                              //     formik.values.basicInfo.personalInfo
                              //       .citizenshipType ===
                              //     "By Naturalization"
                              //   )
                              // }
                              disabled={isDisabledInput}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={
                                formik.values.basicInfo.personalInfo
                                  .citizenshipType === "By Naturalization"
                              }
                            />{" "}
                            By Naturalization
                          </Label>
                        </FormGroup>
                      </FormGroup>
                    </FormGroup>
                  </>
                ) : null}

                <FormGroup>
                  <Label for="input-country">Country</Label>
                  {countryLoading ? (
                    <Spinner className="ms-2" color="secondary" />
                  ) : null}

                  <Input
                    name="basicInfo.personalInfo.country"
                    type="select"
                    id="input-country"
                    disabled={countryLoading ? true : false}
                    // disabled={isDisabledInput}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.basicInfo.personalInfo.country || ""}
                    invalid={
                      formik.touched.country && formik.errors.country
                        ? true
                        : false
                    }
                  >
                    <option value="">Select...</option>
                    {countryList.map((country, i) => (
                      <option key={i} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </Input>
                  {formik.touched.country && formik.errors.country ? (
                    <FormFeedback type="invalid">
                      {formik.errors.country}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>

            <hr className="my-4"></hr>

            <FormGroup>
              <Label className="">
                <h5>Residential Address</h5>
              </Label>

              <Row className="mt-2">
                <Col md={4}>
                  <Label for="input-houseNumber">House/Block/Lot No.</Label>
                  <Input
                    name="basicInfo.address.residentialAddress.houseNumber"
                    type="text"
                    id="input-houseNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.residentialAddress
                        .houseNumber || ""
                    }
                    invalid={
                      formik.touched.houseNumber && formik.errors.houseNumber
                        ? true
                        : false
                    }
                    disabled={isDisabledInput}
                  />
                  {formik.touched.houseNumber && formik.errors.houseNumber ? (
                    <FormFeedback type="invalid">
                      {formik.errors.houseNumber}
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col md={4}>
                  <Label for="input-street">Street</Label>
                  <Input
                    name="basicInfo.address.residentialAddress.street"
                    type="text"
                    id="input-street"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.residentialAddress
                        .street || ""
                    }
                    disabled={isDisabledInput}
                  />
                </Col>
                <Col md={4}>
                  <Label for="input-subdivision">Subdivision/Village</Label>
                  <Input
                    name="basicInfo.address.residentialAddress.subdivision"
                    type="text"
                    id="input-subdivision"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.residentialAddress
                        .subdivision || ""
                    }
                    disabled={isDisabledInput}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={3}>
                  <Label for="input-province">Province</Label>
                  <Input
                    name="basicInfo.address.residentialAddress.province"
                    type="select"
                    id="input-province"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.residentialAddress
                        .province || ""
                    }
                    invalid={
                      formik.touched.province && formik.errors.province
                        ? true
                        : false
                    }
                    disabled={isDisabledInput}
                  >
                    <option value="">Select...</option>
                    <option value="NA">NA</option>
                    {!isEmpty(selectResProvinces) &&
                    !(typeof selectResProvinces === "string")
                      ? selectResProvinces.map((row, index) => (
                          <option key={index} value={row.province_name}>
                            {row.province_name}
                          </option>
                        ))
                      : null}
                  </Input>
                  {formik.touched.province && formik.errors.province ? (
                    <FormFeedback type="invalid">
                      {formik.errors.province}
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col md={3}>
                  <Label for="input-city">City/Municipality</Label>
                  <Input
                    name="basicInfo.address.residentialAddress.resCity"
                    type="select"
                    id="input-city"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.residentialAddress.city ||
                      ""
                    }
                    invalid={
                      formik.touched.city && formik.errors.city ? true : false
                    }
                    disabled={isDisabledInput}
                  >
                    <option value="">Select...</option>
                    <option value="NA">NA</option>
                    {!isEmpty(selectResCities) &&
                    !(typeof selectResCities === "string")
                      ? selectResCities.map((row, index) => (
                          <option key={index} value={row.city_name}>
                            {row.city_name}
                          </option>
                        ))
                      : null}
                  </Input>
                  {formik.touched.city && formik.errors.city ? (
                    <FormFeedback type="invalid">
                      {formik.errors.city}
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col md={3}>
                  <Label for="input-barangay">Barangay</Label>
                  <Input
                    name="basicInfo.address.residentialAddress.barangay"
                    type="select"
                    id="input-barangay"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.residentialAddress
                        .barangay || ""
                    }
                    invalid={
                      formik.touched.barangay && formik.errors.barangay
                        ? true
                        : false
                    }
                    disabled={isDisabledInput}
                  >
                    <option value="">Select...</option>
                    <option value="NA">NA</option>
                    {!isEmpty(selectResBarangay) &&
                    !(typeof selectResBarangay === "string")
                      ? selectResBarangay.map((row, index) => (
                          <option key={index} value={row.brgy_name}>
                            {row.brgy_name}
                          </option>
                        ))
                      : null}
                  </Input>
                  {formik.touched.barangay && formik.errors.barangay ? (
                    <FormFeedback type="invalid">
                      {formik.errors.barangay}
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col md={3}>
                  <Label for="input-zipCode">Zip Code</Label>
                  <Input
                    name="basicInfo.address.residentialAddress.zipCode"
                    type="number"
                    id="input-zipCode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.residentialAddress
                        .zipCode || ""
                    }
                    invalid={
                      formik.touched.zipCode && formik.errors.zipCode
                        ? true
                        : false
                    }
                    disabled={isDisabledInput}
                  />
                  {formik.touched.zipCode && formik.errors.zipCode ? (
                    <FormFeedback type="invalid">
                      {formik.errors.zipCode}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </FormGroup>

            <hr className="my-4"></hr>

            <FormGroup>
              <Label className="">
                <h5>Permanent Address</h5>
              </Label>

              <Row className="mt-2">
                <Col md={4}>
                  <Label for="input-houseNumber">House/Block/Lot No.</Label>
                  <Input
                    name="basicInfo.address.permanentAddress.houseNumber"
                    type="text"
                    id="input-houseNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.permanentAddress
                        .houseNumber || ""
                    }
                    invalid={
                      formik.touched.houseNumber && formik.errors.houseNumber
                        ? true
                        : false
                    }
                    disabled={isDisabledInput}
                  />
                  {formik.touched.houseNumber && formik.errors.houseNumber ? (
                    <FormFeedback type="invalid">
                      {formik.errors.houseNumber}
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col md={4}>
                  <Label for="input-street">Street</Label>
                  <Input
                    name="basicInfo.address.permanentAddress.street"
                    type="text"
                    id="input-street"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.permanentAddress.street ||
                      ""
                    }
                    disabled={isDisabledInput}
                  />
                </Col>
                <Col md={4}>
                  <Label for="input-subdivision">Subdivision/Village</Label>
                  <Input
                    name="basicInfo.address.permanentAddress.subdivision"
                    type="text"
                    id="input-subdivision"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.permanentAddress
                        .subdivision || ""
                    }
                    disabled={isDisabledInput}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={3}>
                  <Label for="input-province">Province</Label>
                  <Input
                    name="basicInfo.address.permanentAddress.province"
                    type="select"
                    id="input-province"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.permanentAddress
                        .province || ""
                    }
                    invalid={
                      formik.touched.province && formik.errors.province
                        ? true
                        : false
                    }
                    disabled={isDisabledInput}
                  >
                    <option value="">Select...</option>
                    <option value="NA">NA</option>
                    {!isEmpty(selectPermaProvinces) &&
                    !(typeof selectPermaProvinces === "string")
                      ? selectPermaProvinces.map((row, index) => (
                          <option key={index} value={row.province_name}>
                            {row.province_name}
                          </option>
                        ))
                      : null}
                  </Input>
                  {formik.touched.province && formik.errors.province ? (
                    <FormFeedback type="invalid">
                      {formik.errors.province}
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col md={3}>
                  <Label for="input-city">City/Municipality</Label>
                  <Input
                    name="basicInfo.address.permanentAddress.city"
                    type="select"
                    id="input-city"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.permanentAddress.city ||
                      ""
                    }
                    invalid={
                      formik.touched.city && formik.errors.city ? true : false
                    }
                    disabled={isDisabledInput}
                  >
                    <option value="">Select...</option>
                    <option value="NA">NA</option>
                    {!isEmpty(selectPermaCities) &&
                    !(typeof selectPermaCities === "string")
                      ? selectPermaCities.map((row, index) => (
                          <option key={index} value={row.city_name}>
                            {row.city_name}
                          </option>
                        ))
                      : null}
                  </Input>
                  {formik.touched.city && formik.errors.city ? (
                    <FormFeedback type="invalid">
                      {formik.errors.city}
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col md={3}>
                  <Label for="input-barangay">Barangay</Label>
                  <Input
                    name="basicInfo.address.permanentAddress.barangay"
                    type="select"
                    id="input-barangay"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.permanentAddress
                        .barangay || ""
                    }
                    invalid={
                      formik.touched.barangay && formik.errors.barangay
                        ? true
                        : false
                    }
                    disabled={isDisabledInput}
                  >
                    <option value="">Select...</option>
                    {!isEmpty(selectPermaBarangay) &&
                    !(typeof selectPermaBarangay === "string")
                      ? selectPermaBarangay.map((row, index) => (
                          <option key={index} value={row.brgy_name}>
                            {row.brgy_name}
                          </option>
                        ))
                      : null}
                  </Input>
                  {formik.touched.barangay && formik.errors.barangay ? (
                    <FormFeedback type="invalid">
                      {formik.errors.barangay}
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col md={3}>
                  <Label for="input-zipCode">Zip Code</Label>
                  <Input
                    name="basicInfo.address.permanentAddress.zipCode"
                    type="number"
                    id="input-zipCode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.basicInfo.address.permanentAddress
                        .zipCode || ""
                    }
                    invalid={
                      formik.touched.zipCode && formik.errors.zipCode
                        ? true
                        : false
                    }
                    disabled={isDisabledInput}
                  />
                  {formik.touched.zipCode && formik.errors.zipCode ? (
                    <FormFeedback type="invalid">
                      {formik.errors.zipCode}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </FormGroup>
          </>
        ) : null}
      </FormGroup>
    </div>
  )
}

PersonalInformationForm.propTypes = {
  formik: PropTypes.object,
  basicInfo: PropTypes.object,
}

export default PersonalInformationForm
