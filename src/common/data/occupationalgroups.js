const occupations = [
  {
    occupationId: 1,
    occupationName: "Engineering"
  },
  {
    occupationId: 2,
    occupationName: "Accounting"
  },
  {
    occupationId: 3,
    occupationName: "Cashiering"
  },
  {
    occupationId: 4,
    occupationName: "Budgeting"
  },
]

const occupationalGroups = [
  {
    occupationalGroupId: 1,
    occupationId: 1,
    occupationName: "Engineering Group",
    positions: [
      {
        positionId: 1,
        positionTitle: "Senior Engineering Specialist",
        salaryGrade: 20,
      },
      {
        positionId: 2,
        positionTitle: "Engineering Assistant A",
        salaryGrade: 16,
      },
      {
        positionId: 3,
        positionTitle: "Clerk Processor A",
        salaryGrade: 8,
      },
      {
        positionId: 4,
        positionTitle: "Clerk Processor B",
        salaryGrade: 6,
      },
    ]
  },
  {
    occupationalGroupId: 2,
    occupationId: 2,
    occupationName: "Accounting Group",
    positions: [
      {
        positionId: 5,
        positionTitle: "Senior Planning Specialist",
        salaryGrade: 20,
      },
      {
        positionId: 6,
        positionTitle: "Senior Corporate Accountant C",
        salaryGrade: 16,
      },
      {
        positionId: 7,
        positionTitle: "Accounting Processor A",
        salaryGrade: 8,
      },
      {
        positionId: 8,
        positionTitle: "Accounting Processor B",
        salaryGrade: 6,
      },
    ]
  },
  {
    occupationalGroupId: 3,
    occupationId: 3,
    occupationName: "Cashiering Group",
    positions: [
      {
        positionId: 9,
        positionTitle: "Cashiering Services Chief B",
        salaryGrade: 20,
      },
      {
        positionId: 10,
        positionTitle: "Cashier A",
        salaryGrade: 16,
      },
      {
        positionId: 11,
        positionTitle: "Cashiering Assistant",
        salaryGrade: 8,
      },
      {
        positionId: 12,
        positionTitle: "Collection Assistant",
        salaryGrade: 6,
      },
    ]
  },
  {
    occupationalGroupId: 4,
    occupationId: 4,
    occupationName: "Budgeting Group",
    positions: [
      {
        positionId: 13,
        positionTitle: "Senior Corporate Budget Specialist",
        salaryGrade: 20,
      },
      {
        positionId: 14,
        positionTitle: "Corporate Budget Specialist B",
        salaryGrade: 16,
      },
      {
        positionId: 15,
        positionTitle: "Corporate Budget Analyst B",
        salaryGrade: 12,
      },
      {
        positionId: 16,
        positionTitle: "Corporate Budget Assistant",
        salaryGrade: 8,
      },
    ]
  },
]



export { occupations, occupationalGroups }