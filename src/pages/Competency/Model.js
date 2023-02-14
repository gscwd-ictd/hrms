import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchCoreCompetencies,
  fetchFunctionalCompetencies,
  fetchCrossCuttingCompetencies,
  fetchManagerialCompetencies,
} from "store/actions"
import PropTypes from "prop-types"
import { Can } from "casl/Can"
import { Redirect } from "react-router-dom"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  TabContent,
  TabPane,
  NavLink,
  NavItem,
  Nav,
} from "reactstrap"
import InRowAction from "components/InRowAction/InRowAction"
import EditCompetencyModelModal from "components/Modal/Competency/EditCompetencyModelModal"
import TableCompetencyModel from "components/Table/TableCompetencyModel"
import { SelectColumnFilter } from "components/Filters/SelectColumnFilter"
import Breadcrumbs from "components/Common/Breadcrumb"
import classnames from "classnames"
import LoadingIndicator from "components/LoaderSpinner/LoadingIndicator"
import ToastrNotification from "components/Notifications/ToastrNotification"

// style
import "styles/custom_gscwd/global.scss"

const Model = props => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("1")

  const tblColumns = [
    {
      Header: "ID",
      accessor: "competencyId",
      disableGlobalFilter: true,
    },
    {
      Header: "Code",
      accessor: "code",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Definition",
      accessor: "desc",
    },
    {
      Header: "Actions",
      accessor: "",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return <InRowAction cell={cell} editCompetencyModel={editModal} />
      },
    },
  ]

  const tblColumnsFunctionalModel = [
    {
      Header: "ID",
      accessor: "competencyId",
      disableGlobalFilter: true,
    },
    {
      Header: "Occupation Code",
      accessor: "occupationCode",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Code",
      accessor: "code",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Definition",
      accessor: "desc",
    },
    {
      Header: "Actions",
      disableGlobalFilter: true,
      Cell: function ActionDropdown(cell) {
        return <InRowAction cell={cell} editCompetencyModel={editModal} />
      },
    },
  ]

  const {
    coreModels,
    functionalModels,
    crossCuttingModels,
    managerialModels,
    loading,
    error,
  } = useSelector(state => ({
    coreModels: state.competencyModel.coreModels,
    functionalModels: state.competencyModel.functionalModels,
    crossCuttingModels: state.competencyModel.crossCuttingModels,
    managerialModels: state.competencyModel.managerialModels,
    loading: state.competencyModel.loading,
    error: state.competencyModel.error,
  }))

  const columns = useMemo(() => tblColumns, [])
  const coreModelData = useMemo(() => coreModels, [coreModels])
  const crossCuttingModelData = useMemo(
    () => crossCuttingModels,
    [crossCuttingModels]
  )
  const managerialModelData = useMemo(
    () => managerialModels,
    [managerialModels]
  )

  const functionalModelColumn = useMemo(() => tblColumnsFunctionalModel, [])
  const functionalModelData = useMemo(
    () => functionalModels,
    [functionalModels]
  )

  useEffect(() => {
    dispatch(fetchCoreCompetencies())
    dispatch(fetchFunctionalCompetencies())
    dispatch(fetchCrossCuttingCompetencies())
    dispatch(fetchManagerialCompetencies())
  }, [])

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  /**
   * Modal
   */
  const [modalData, setModalData] = useState({})

  // Edit Modal
  const [showEdt, setShowEdt] = useState(false)

  const handleCloseEdt = () => setShowEdt(false)
  const handleShowEdt = () => setShowEdt(true)

  const editModal = rowData => {
    setModalData(rowData)
    handleShowEdt()
  }

  return (
    <React.Fragment>
      <Can I="access" this="Competency">
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs breadcrumbItem="Competency Models" />
            <Container fluid={true}>
              <Row>
                <Col>
                  <Card className="card-table tabular">
                    <CardBody>
                      <Nav tabs className="nav-tabs-custom nav-justified">
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggle("1")
                            }}
                          >
                            CORE
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2")
                            }}
                          >
                            FUNCTIONAL
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: activeTab === "3",
                            })}
                            onClick={() => {
                              toggle("3")
                            }}
                          >
                            FUNCTIONAL CROSS-CUTTING
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: activeTab === "4",
                            })}
                            onClick={() => {
                              toggle("4")
                            }}
                          >
                            MANAGERIAL
                          </NavLink>
                        </NavItem>
                      </Nav>

                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" className="pt-4">
                          {error ? (
                            <ToastrNotification
                              toastType={"error"}
                              notifMessage={error}
                            />
                          ) : null}
                          {loading.loadingCoreModels ? (
                            <LoadingIndicator />
                          ) : (
                            <TableCompetencyModel
                              columns={columns}
                              data={coreModelData}
                            />
                          )}
                        </TabPane>
                        <TabPane tabId="2" className="p-4">
                          {loading.loadingFunctionalModels ? (
                            <LoadingIndicator />
                          ) : (
                            <TableCompetencyModel
                              columns={functionalModelColumn}
                              data={functionalModelData}
                            />
                          )}
                        </TabPane>
                        <TabPane tabId="3" className="p-4">
                          {loading.loadingCrossCuttingModels ? (
                            <LoadingIndicator />
                          ) : (
                            <TableCompetencyModel
                              columns={columns}
                              data={crossCuttingModelData}
                            />
                          )}
                        </TabPane>
                        <TabPane tabId="4" className="p-4">
                          {loading.loadingManagerialModels ? (
                            <LoadingIndicator />
                          ) : (
                            <TableCompetencyModel
                              columns={columns}
                              data={managerialModelData}
                            />
                          )}
                        </TabPane>
                      </TabContent>

                      <EditCompetencyModelModal
                        showEdt={showEdt}
                        modalData={modalData}
                        handleCloseEdt={handleCloseEdt}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Can>

      <Can not I="access" this="Competency">
        <Redirect
          to={{ pathname: "/page-404", state: { from: props.location } }}
        />
      </Can>
    </React.Fragment>
  )
}

Model.propTypes = {
  location: PropTypes.object,
}

export default Model
