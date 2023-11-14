import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalaryGradeList, resetSalaryGradeResponses } from 'store/actions'
import { Can } from 'casl/Can'
import { Navigate } from 'react-router-dom'

import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Table,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
  Button,
  TabContent,
} from 'reactstrap'
import UploadSalaryGradeListModal from 'components/Modal/SalaryGrade/UploadSalaryGradeListModal'
import Breadcrumbs from 'components/Common/Breadcrumb'
import LoadingIndicator from 'components/LoaderSpinner/LoadingIndicator'
import ToastrNotification from 'components/Notifications/ToastrNotification'

// style
import 'styles/custom_gscwd/components/table.scss'
import TableSalaryGrade from 'components/Table/TableSalaryGrade'

const SalaryGrade = () => {
  const dispatch = useDispatch()

  // redux state for salary grade table
  const { salaryGradeList, error } = useSelector(state => ({
    salaryGradeList: state.salaryGrade.response.salaryGradeList,
    error: state.salaryGrade.error.errorSalaryGrade,
  }))

  useEffect(() => {
    dispatch(resetSalaryGradeResponses())
    dispatch(fetchSalaryGradeList())
  }, [dispatch])

  // Upload salary grade file modal
  const [showAdd, setShowAdd] = useState(false)
  const handleCloseAdd = () => setShowAdd(false)
  const handleShowAdd = () => setShowAdd(true)

  // Set example date
  // const [today, setToday] = useState(new Date('2025-01-02'))
  const [today, setToday] = useState(new Date())
  const [currentTab, setCurrentTab] = useState(1)

  // set to current year
  // const dynamicYear = 2025
  const dynamicYear = new Date().getFullYear()

  const staticSalaryGrade = [
    [1, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000],
    [2, 13305, 13406, 13509, 13613, 13718, 13823, 13929, 14035],
    [3, 14125, 14234, 14343, 14454, 14565, 14676, 14790, 14903],
    [4, 14993, 15109, 15224, 15341, 15459, 15577, 15698, 15818],
    [5, 15909, 16032, 16155, 16279, 16404, 16530, 16657, 16784],
    [6, 16877, 17007, 17137, 17269, 17402, 17535, 17670, 17806],
    [7, 17899, 18037, 18176, 18315, 18455, 18598, 18740, 18884],
    [8, 18998, 19170, 19343, 19518, 19694, 19872, 20052, 20233],
    [9, 20402, 20572, 20745, 20918, 21093, 21269, 21447, 21626],
    [10, 22190, 22376, 22563, 22752, 22942, 23134, 23327, 23522],
    [11, 25439, 25723, 26012, 26304, 26600, 26901, 27205, 27514],
    [12, 27608, 27892, 28180, 28471, 28766, 29065, 29367, 29673],
    [13, 29798, 30111, 30427, 30747, 31072, 31400, 31732, 32069],
    [14, 32321, 32665, 33018, 33366, 33722, 34083, 34449, 34819],
    [15, 35097, 35475, 35858, 36246, 36638, 37035, 37437, 37845],
    [16, 38150, 38566, 38987, 39413, 39845, 40282, 40725, 41172],
    [17, 41508, 41966, 42429, 42898, 43373, 43854, 44340, 44833],
    [18, 45203, 45706, 46216, 46731, 47254, 47783, 48318, 48860],
    [19, 49835, 50574, 51325, 52088, 52864, 53652, 54454, 55268],
    [20, 55799, 56633, 57482, 58344, 59221, 60112, 61017, 61937],
    [21, 62449, 63392, 64351, 65325, 66316, 67322, 68345, 69385],
    [22, 69963, 71029, 72113, 73214, 74333, 75471, 76627, 77801],
    [23, 78455, 79659, 80884, 82133, 83474, 84836, 86220, 87628],
    [24, 88410, 89853, 91320, 92810, 94325, 95865, 97430, 99020],
    [25, 100788, 102433, 104105, 105804, 107531, 109286, 111070, 112883],
    [26, 113891, 115749, 117639, 119558, 121510, 123493, 125508, 127557],
    [27, 128696, 130797, 132931, 135101, 137306, 139547, 141825, 144140],
    [28, 145427, 147800, 150213, 152664, 155155, 157689, 160262, 162877],
    [29, 164332, 167015, 169740, 172511, 175326, 178188, 181096, 184052],
    [30, 185695, 188726, 191806, 194937, 198118, 201352, 204638, 207978],
    [31, 273278, 278615, 284057, 289605, 295262, 301028, 306908, 312902],
    [32, 325807, 332378, 339080, 345918, 352894, 360011, 367272, 374678],
    [33, 411382, 423723],
  ]

  const [tabs, setTabs] = useState([
    {
      content: staticSalaryGrade,
      startdate: new Date('2022-01-01'),
      enddate: new Date('2022-12-31'),
    },
    {
      content: salaryGradeList,
      startdate: new Date('2023-01-01'),
      enddate: new Date('2023-12-31'),
    },
    {
      content: staticSalaryGrade,
      startdate: new Date('2024-01-01'),
      enddate: new Date('2024-12-31'),
    },
    {
      content: staticSalaryGrade,
      startdate: new Date('2025-01-01'),
      enddate: new Date('2025-12-31'),
    },
  ])

  useEffect(() => {
    const newContent = findContentForYear(dynamicYear)

    if (newContent) {
      const tabIndex =
        newContent.startdate.getFullYear() === today.getFullYear() ? 1 : 0

      setTabs(prevTabs => {
        const updatedTabs = [...prevTabs]
        updatedTabs[tabIndex] = newContent
        updatedTabs[1 - tabIndex] = getPreviousContent(
          newContent.startdate.getFullYear()
        )
        return updatedTabs
      })
      setCurrentTab(tabIndex)
    }
  }, [today, dynamicYear])

  const findContentForYear = year => {
    return tabs.find(
      tab =>
        today >= tab.startdate &&
        today <= tab.enddate &&
        tab.startdate.getFullYear() === year
    )
  }

  const getPreviousContent = currentYear => {
    const previousYear = currentYear - 1
    return tabs.find(tab => tab.startdate.getFullYear() === previousYear)
  }

  const handleTabClick = tabIndex => {
    setCurrentTab(tabIndex)
  }

  return (
    <>
      <Can I="access" this="Salary_grade">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Dashboard"
              titleUrl="/"
              breadcrumbItem="Salary Grade"
            />

            {error ? (
              <ToastrNotification toastType={'error'} notifMessage={error} />
            ) : null}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Nav justified pills style={{ gap: '0.5rem' }}>
                  <NavItem>
                    <NavLink
                      active={currentTab === 0}
                      onClick={() => handleTabClick(0)}
                      className={`btn btn-info waves-effect waves-light ${
                        currentTab === 0 ? 'active' : ''
                      }`}
                    >
                      Previous
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={currentTab === 1}
                      onClick={() => handleTabClick(1)}
                      className={`btn btn-info waves-effect waves-light ${
                        currentTab === 1 ? 'active' : ''
                      }`}
                    >
                      Current
                    </NavLink>
                  </NavItem>
                </Nav>
                <div>
                  <div className="form-group add-btn">
                    <button
                      onClick={handleShowAdd}
                      className="btn btn-info waves-effect waves-light"
                    >
                      <i className="fas fa-file-upload"></i> &nbsp;&nbsp; Upload
                      SG Document
                    </button>
                  </div>
                </div>
              </div>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody className="card-table">
                      <UploadSalaryGradeListModal
                        showAdd={showAdd}
                        handleCloseAdd={handleCloseAdd}
                        handleShowAdd={handleShowAdd}
                      />
                      <TableSalaryGrade tabs={tabs} currentTab={currentTab} />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Can>

      <Can not I="access" this="Salary_grade">
        <Navigate to="/page-404" />
      </Can>
    </>
  )
}

export default SalaryGrade
