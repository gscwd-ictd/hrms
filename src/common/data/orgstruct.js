const offices = [
  {
    id: 1,
    identifier: "f49189d3-3636-46c8-b081-ff7223284b62",
    code: "ADM",
    name: "Office of the Assistant General Manager for Administration",
    description: "This is description for AGM-Admin",
    createdAt: "2021-09-09T01:17:31.274Z",
    updatedAt: "2021-09-09T01:17:31.274Z"
  },
  {
    id: 2,
    identifier: "6a35dcef-3b40-4988-af36-80fa7e12c4e5",
    code: "FIN",
    name: "Office of the Assistant General Manager for Finance",
    description: "This is description for AGM-Finance",
    createdAt: "2021-09-09T01:17:50.061Z",
    updatedAt: "2021-09-09T01:17:50.061Z"
  },
  {
    id: 3,
    identifier: "0e784bcb-fa89-42e3-b284-d4367e493a87",
    code: "OTS",
    name: "Office of the Assistant General Manager for Operations and Technical Services",
    description: "This is description for AGM-Operations and Technical Services",
    createdAt: "2021-09-09T01:18:28.198Z",
    updatedAt: "2021-09-09T01:18:28.198Z"
  },
  {
    id: 1,
    identifier: "f49189d3-3636-46c8-b081-ff7223284b62",
    code: "ADM",
    name: "Office of the General Manager",
    description: "This is description for AGM-Admin",
    createdAt: "2021-09-09T01:17:31.274Z",
    updatedAt: "2021-09-09T01:17:31.274Z"
  },
]

const departments = [
  {
    id: 1,
    identifier: "b28c1be4-6a4c-4960-9662-d3dfea888f84",
    code: "HRD",
    name: "Human Resource Department",
    description: "This is the description for HR Department",
    createdAt: "2021-09-09T01:19:08.110Z",
    updatedAt: "2021-09-09T01:19:08.110Z",
    officeId: 1,
    officeCode: "ADM",
  },
  {
    id: 2,
    identifier: "3d4ffa71-fe83-4715-a510-672167bc2fbf",
    code: "GPM",
    name: "General Services, Property and Materials Management Department",
    description: "This is the description for General Services, Property and Materials Management Department",
    createdAt: "2021-09-09T01:20:15.323Z",
    updatedAt: "2021-09-09T01:20:15.323Z",
    officeId: 1,
    officeCode: "ADM",
  },
  {
    id: 3,
    identifier: "13946155-14cb-4034-b990-7fbc2512657b",
    code: "ICT",
    name: "Information and Communication Technology Department",
    description: "This is the description for Information and Communication Technology Department",
    createdAt: "2021-09-09T01:20:43.542Z",
    updatedAt: "2021-09-09T01:20:43.542Z",
    officeId: 1,
    officeCode: "ADM",
  }
]

const divisions = [
  {
    id: 1,
    identifier: "4f2caabb-5c71-46d3-a2e2-3e59c402170b",
    code: "RSP",
    name: "Recruitment and Personal Welfare Division",
    description: "This is a description for Recruitment and Personal Welfare Division",
    createdAt: "2021-09-09T01:21:41.561Z",
    updatedAt: "2021-09-09T01:21:41.561Z",
    departmentId: 1,
    departmentCode: "HRD",
  },
  {
    id: 2,
    identifier: "b2428d7e-f4a3-4a22-bf3c-9f94695ee4fd",
    code: "TND",
    name: "Training and Development Division",
    description: "This is a description for Training and Development Division",
    createdAt: "2021-09-09T01:22:08.797Z",
    updatedAt: "2021-09-09T01:22:08.797Z",
    departmentId: 1,
    departmentCode: "HRD",
  },
  {
    id: 3,
    identifier: "6b06dbf1-9e31-4b06-a324-f3af7898ff1d",
    code: "BTW",
    name: "Building and Grounds, Transportaion and Water Meter Maintenance Division",
    description: "This is a description for Building and Grounds, Transportaion and Water Meter Maintenance Division",
    createdAt: "2021-09-09T01:23:14.364Z",
    updatedAt: "2021-09-09T01:23:14.364Z",
    departmentId: 2,
    departmentCode: "GPM",
  },
  {
    id: 4,
    identifier: "05804af5-3128-49ca-b2a4-5eda39216e41",
    code: "PQC",
    name: "Procurement, Quality Control and Property Division",
    description: "This is a description for Procurement, Quality Control and Property Division",
    createdAt: "2021-09-09T01:24:05.149Z",
    updatedAt: "2021-09-09T01:24:05.149Z",
    departmentId: 2,
    departmentCode: "GPM",
  },
  {
    id: 5,
    identifier: "306630f5-042e-4180-8377-7520528afa2a",
    code: "SDA",
    name: "Systems Development and Application Division",
    description: "This is a description for Systems Development and Application Division",
    createdAt: "2021-09-09T01:24:40.349Z",
    updatedAt: "2021-09-09T01:24:40.349Z",
    departmentId: 3,
    departmentCode: "ICT",
  },
  {
    id: 6,
    identifier: "48e5bcdb-27f5-49d0-b55c-c3411a6b279b",
    code: "GIS",
    name: "Geographical Information System Division",
    description: "This is a description for Geographical Information System Division",
    createdAt: "2021-09-09T01:25:13.903Z",
    updatedAt: "2021-09-09T01:25:13.903Z",
    departmentId: 3,
    departmentCode: "ICT",
  }
]

const sections = [
]

export { offices, departments, divisions, sections }