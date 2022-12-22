const positionRequests = [
  {
    _id: "1",
    createdAt: "2020-04-13",
    requestStatus: "Pending",
    for: "Engr. Arn B. Gellangarin",
    from: "Division Manager",
    dateNeeded: "2020-05-13",
    withExamination: "Yes",
    positions: [
      {
        positionId: "894b7dad-8e3b-11ec-ae65-54ab3a99e60e",
        itemNumber: "FIN-ACC-011",
        positionTitle: "Accounting Processor A",
        assignedTo: "APD",
      },
      {
        positionId: "894bf70d-8e3b-11ec-ae65-54ab3a99e60e",
        itemNumber: "FIN-ACC-012",
        positionTitle: "Accounting Processor A",
        assignedTo: "APD",
      },
      {
        positionId: "8947fe8f-8e3b-11ec-ae65-54ab3a99e60e",
        itemNumber: "FIN-ACC-005",
        positionTitle: "Senior Corporate Accountant C",
        assignedTo: "APD",
      },
    ],
  },
  {
    _id: "2",
    createdAt: "2020-06-23",
    requestStatus: "For Signing",
    for: "Engr. Arn B. Gellangarin",
    from: "Department Manager",
    dateNeeded: "2020-07-30",
    withExamination: "Yes",
    positions: [
      {
        positionId: "8953dd90-8e3b-11ec-ae65-54ab3a99e60e",
        itemNumber: "FIN-FMD-010",
        positionTitle: "Corporate Budget Assistant",
        assignedTo: "FMD",
      },
    ],
  },
  {
    _id: "3",
    createdAt: "2020-12-10",
    requestStatus: "Completed",
    for: "Engr. Arn B. Gellangarin",
    from: "Department Manager",
    dateNeeded: "2021-02-16",
    withExamination: "No",
    positions: [
      {
        positionId: "89525b0b-8e3b-11ec-ae65-54ab3a99e60e",
        itemNumber: "FIN-FMD-002",
        positionTitle: "Senior Corporate Budget Specialist",
        assignedTo: "FMD",
      },
    ],
  },
  {
    _id: "4",
    createdAt: "2021-02-01",
    requestStatus: "Disapproved",
    for: "Engr. Arn B. Gellangarin",
    from: "Assistant General Manager",
    dateNeeded: "2021-05-25",
    withExamination: "Yes",
    positions: [
      {
        positionId: "894e5a81-8e3b-11ec-ae65-54ab3a99e60e",
        itemNumber: "FIN-FMD-005",
        positionTitle: "Cashier A",
        assignedTo: "FMD",
      },
    ],
  },
]

export { positionRequests }
