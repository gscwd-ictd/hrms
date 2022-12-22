const occupationalGroupCompetencies = [
  {
    occupationalGroupCompetencyId: 2,
    occupationId: 2,
    occupationName: "Accounting Group",
    competencies: [
      {
        type: "Functional",
        code: "ACB2",
        name: "TRANSACTION PROCESSING (Treasury & Budget)",
      },
      {
        type: "Functional",
        code: "ACB6",
        name: "ACCOUNTING SKILLS",
      },
      {
        type: "Cross-Cutting",
        code: "FCC1",
        name: "FILES AND RECORDS MANAGEMENT",
      },
      {
        type: "Cross-Cutting",
        code: "FCC4",
        name: "ATTENTION TO DETAIL",
      },
    ],
  },
  {
    occupationalGroupCompetencyId: 3,
    occupationId: 3,
    occupationName: "Cashiering Group",
    competencies: [
      {
        type: "Functional",
        code: "ACB1",
        name: "CASH MANAGEMENT",
      },
      {
        type: "Functional",
        code: "ACB3",
        name: "TRANSACTION PROCESSING (General Accounting & Payroll)",
      },
      {
        type: "Cross-Cutting",
        code: "FCC2",
        name: "Communicating Effectively",
      },
      {
        type: "Cross-Cutting",
        code: "FCC4",
        name: "ATTENTION TO DETAIL",
      },
    ],
  },
  {
    occupationalGroupCompetencyId: 4,
    occupationId: 4,
    occupationName: "Budgeting Group",
    competencies: [
      {
        type: "Functional",
        code: "ACB1",
        name: "CASH MANAGEMENT",
      },
      {
        type: "Functional",
        code: "ACB3",
        name: "TRANSACTION PROCESSING (General Accounting & Payroll)",
      },
      {
        type: "Cross-Cutting",
        code: "FCC2",
        name: "Communicating Effectively",
      },
      {
        type: "Cross-Cutting",
        code: "FCC4",
        name: "ATTENTION TO DETAIL",
      },
    ],
  },
]

const positionCompetencies = [
  {
    positionId: 5,
    positionTitle: "Senior Planning Specialist",
    core: [
      {
        code: "CO1",
        name: "DELIVERING SERVICE EXCELLENCE",
        level: "Superior"
      },
      {
        code: "CO2",
        name: "EXEMPLIFYING INTEGRITY",
        level: "Superior"
      },
      {
        code: "CO3",
        name: "ORGANIZATIONAL COMMITMENT",
        level: "Superior"
      },
      {
        code: "CO4",
        name: "RESULTS FOCUS",
        level: "Superior"
      },
    ],
    functional: [
      {
        code: "ACB2",
        name: "TRANSACTION PROCESSING (Treasury & Budget)",
        level: "Superior"
      },
      {
        code: "ACB6",
        name: "ACCOUNTING SKILLS",
        level: "Superior"
      },
    ],
    crossCutting:[
      {
        code: "FCC1",
        name: "FILES AND RECORDS MANAGEMENT",
        level: "Superior"
      },
      {
        code: "FCC4",
        name: "ATTENTION TO DETAIL",
        level: "Superior"
      },
    ],
    managerial:[],
  },
  {
    positionId: 6,
    positionTitle: "Senior Corporate Accountant C",
    core: [
      {
        code: "CO1",
        name: "DELIVERING SERVICE EXCELLENCE",
        level: "Advance"
      },
      {
        code: "CO2",
        name: "EXEMPLIFYING INTEGRITY",
        level: "Advance"
      },
      {
        code: "CO3",
        name: "ORGANIZATIONAL COMMITMENT",
        level: "Advance"
      },
      {
        code: "CO4",
        name: "RESULTS FOCUS",
        level: "Advance"
      },
    ],
    functional: [
      {
        code: "ACB2",
        name: "TRANSACTION PROCESSING (Treasury & Budget)",
        level: "Superior"
      },
      {
        code: "ACB6",
        name: "ACCOUNTING SKILLS",
        level: "Superior"
      },
    ],
    crossCutting:[
      {
        code: "FCC1",
        name: "FILES AND RECORDS MANAGEMENT",
        level: "Advance"
      },
      {
        code: "FCC4",
        name: "ATTENTION TO DETAIL",
        level: "Advance"
      },
    ],
    managerial:[],
  },
  {
    positionId: 7,
    positionTitle: "Accounting Processor A",
    core: [
      {
        code: "CO1",
        name: "DELIVERING SERVICE EXCELLENCE",
        level: "Basic"
      },
      {
        code: "CO2",
        name: "EXEMPLIFYING INTEGRITY",
        level: "Basic"
      },
      {
        code: "CO3",
        name: "ORGANIZATIONAL COMMITMENT",
        level: "Basic"
      },
      {
        code: "CO4",
        name: "RESULTS FOCUS",
        level: "Basic"
      },
    ],
    functional: [
      {
        code: "ACB2",
        name: "TRANSACTION PROCESSING (Treasury & Budget)",
        level: "Basic"
      },
      {
        code: "ACB6",
        name: "ACCOUNTING SKILLS",
        level: "Intermediate"
      },
    ],
    crossCutting:[
      {
        code: "FCC1",
        name: "FILES AND RECORDS MANAGEMENT",
        level: "Intermediate"
      },
      {
        code: "FCC4",
        name: "ATTENTION TO DETAIL",
        level: "Intermediate"
      },
    ],
    managerial:[],
  },
  {
    positionId: 8,
    positionTitle: "Accounting Processor B",
    core: [
      {
        code: "CO1",
        name: "DELIVERING SERVICE EXCELLENCE",
        level: "Basic"
      },
      {
        code: "CO2",
        name: "EXEMPLIFYING INTEGRITY",
        level: "Basic"
      },
      {
        code: "CO3",
        name: "ORGANIZATIONAL COMMITMENT",
        level: "Basic"
      },
      {
        code: "CO4",
        name: "RESULTS FOCUS",
        level: "Basic"
      },
    ],
    functional: [
      {
        code: "ACB2",
        name: "TRANSACTION PROCESSING (Treasury & Budget)",
        level: "Basic"
      },
      {
        code: "ACB6",
        name: "ACCOUNTING SKILLS",
        level: "Basic"
      },
    ],
    crossCutting:[
      {
        code: "FCC1",
        name: "FILES AND RECORDS MANAGEMENT",
        level: "Basic"
      },
      {
        code: "FCC4",
        name: "ATTENTION TO DETAIL",
        level: "Basic"
      },
    ],
    managerial:[],
  },
  {
    positionId: 9,
    positionTitle: "Cashiering Services Chief B",
    core: [
      {
        code: "CO1",
        name: "DELIVERING SERVICE EXCELLENCE",
        level: "Superior"
      },
      {
        code: "CO2",
        name: "EXEMPLIFYING INTEGRITY",
        level: "Superior"
      },
      {
        code: "CO3",
        name: "ORGANIZATIONAL COMMITMENT",
        level: "Superior"
      },
      {
        code: "CO4",
        name: "RESULTS FOCUS",
        level: "Superior"
      },
    ],
    functional: [
      {
        code: "ACB1",
        name: "CASH MANAGEMENT",
        level: "Superior"
      },
      {
        code: "ACB3",
        name: "TRANSACTION PROCESSING (General Accounting & Payroll)",
        level: "Superior"
      },
    ],
    crossCutting:[
      {
        code: "FCC2",
        name: "Communicating Effectively",
        level: "Superior"
      },
      {
        code: "FCC4",
        name: "ATTENTION TO DETAIL",
        level: "Superior"
      },
    ],
    managerial:[],
  },
  {
    positionId: 10,
    positionTitle: "Cashier A",
    core: [
      {
        code: "CO1",
        name: "DELIVERING SERVICE EXCELLENCE",
        level: "Advance"
      },
      {
        code: "CO2",
        name: "EXEMPLIFYING INTEGRITY",
        level: "Advance"
      },
      {
        code: "CO3",
        name: "ORGANIZATIONAL COMMITMENT",
        level: "Advance"
      },
      {
        code: "CO4",
        name: "RESULTS FOCUS",
        level: "Advance"
      },
    ],
    functional: [
      {
        code: "ACB1",
        name: "CASH MANAGEMENT",
        level: "Advance"
      },
      {
        code: "ACB3",
        name: "TRANSACTION PROCESSING (General Accounting & Payroll)",
        level: "Advance"
      },
    ],
    crossCutting:[
      {
        code: "FCC2",
        name: "Communicating Effectively",
        level: "Advance"
      },
      {
        code: "FCC4",
        name: "ATTENTION TO DETAIL",
        level: "Advance"
      },
    ],
    managerial:[],
  },
  {
    positionId: 11,
    positionTitle: "Cashiering Assistant",
    core: [
      {
        code: "CO1",
        name: "DELIVERING SERVICE EXCELLENCE",
        level: "Basic"
      },
      {
        code: "CO2",
        name: "EXEMPLIFYING INTEGRITY",
        level: "Basic"
      },
      {
        code: "CO3",
        name: "ORGANIZATIONAL COMMITMENT",
        level: "Basic"
      },
      {
        code: "CO4",
        name: "RESULTS FOCUS",
        level: "Basic"
      },
    ],
    functional: [
      {
        code: "ACB1",
        name: "CASH MANAGEMENT",
        level: "Basic"
      },
      {
        code: "ACB3",
        name: "TRANSACTION PROCESSING (General Accounting & Payroll)",
        level: "Basic"
      },
    ],
    crossCutting:[
      {
        code: "FCC2",
        name: "Communicating Effectively",
        level: "Basic"
      },
      {
        code: "FCC4",
        name: "ATTENTION TO DETAIL",
        level: "Basic"
      },
    ],
    managerial:[],
  },
  {
    positionId: 12,
    positionTitle: "Collection Assistant",
    core: [
      {
        code: "CO1",
        name: "DELIVERING SERVICE EXCELLENCE",
        level: "Basic"
      },
      {
        code: "CO2",
        name: "EXEMPLIFYING INTEGRITY",
        level: "Basic"
      },
      {
        code: "CO3",
        name: "ORGANIZATIONAL COMMITMENT",
        level: "Basic"
      },
      {
        code: "CO4",
        name: "RESULTS FOCUS",
        level: "Basic"
      },
    ],
    functional: [
      {
        code: "ACB1",
        name: "CASH MANAGEMENT",
        level: "Basic"
      },
      {
        code: "ACB3",
        name: "TRANSACTION PROCESSING (General Accounting & Payroll)",
        level: "Basic"
      },
    ],
    crossCutting:[
      {
        code: "FCC2",
        name: "Communicating Effectively",
        level: "Basic"
      },
      {
        code: "FCC4",
        name: "ATTENTION TO DETAIL",
        level: "Basic"
      },
    ]
  },
]

const competencyModelsOptions = [
  // {
  //   label: "Functional",
  //   options: [
      {
        label: "CASH MANAGEMENT",
        value: {
          competencyId: 1,
          type: "Functional",
          code: "ACB1",
          name: "CASH MANAGEMENT",
        },
      },
      {
        label: "TRANSACTION PROCESSING (Treasury & Budget)",
        value: {
          competencyId: 2,
          type: "Functional",
          code: "ACB2",
          name: "TRANSACTION PROCESSING (Treasury & Budget)",
        },
      },
      {
        label: "TRANSACTION PROCESSING (General Accounting & Payroll)",
        value: {
          competencyId: 3,
          type: "Functional",
          code: "ACB3",
          name: "TRANSACTION PROCESSING (General Accounting & Payroll)",
        },
      },
      {
        label: "FINANCIAL ANALYTICAL THINKING",
        value: {
        competencyId: 4,
        type: "Functional",
        code: "ACB4",
        name: "FINANCIAL ANALYTICAL THINKING",
      },
      },
      {
        label: "OVERSIGHT OF BUDGET EXECUTION",
        value: {
          competencyId: 5,
          type: "Functional",
          code: "ACB5",
          name: "OVERSIGHT OF BUDGET EXECUTION",
        },
      },
      {
        label: "ACCOUNTING SKILLS",
        value:{
          competencyId: 6,
          type: "Functional",
          code: "ACB6",
          name: "ACCOUNTING SKILLS",
        },
      },
  //   ],
  // },
  // {
  //   label: "Functional Cross-Cutting",
  //   options: [
  //     {
  //       label: "FILES AND RECORDS MANAGEMENT",
  //       value: {
  //         competencyId: 7,
  //         type: "Cross-Cutting",
  //         code: "FCC1",
  //         name: "FILES AND RECORDS MANAGEMENT",
  //       },
  //     },
  //     {
  //       label: "Communicating Effectivel",
  //       value: {
  //         competencyId: 8,
  //         type: "Cross-Cutting",
  //         code: "FCC2",
  //         name: "Communicating Effectively ",
  //       },
  //     },
  //     {
  //       label: "STRESS MANAGEMENT",
  //       value: {
  //         competencyId: 9,
  //         type: "Cross-Cutting", 
  //         code: "FCC3",
  //         name: "STRESS MANAGEMENT",
  //       },
  //     },
  //     {
  //       label: "ATTENTION TO DETAIL",
  //       value: {
  //         competencyId: 10,
  //         type: "Cross-Cutting",
  //         code: "FCC4",
  //         name: "ATTENTION TO DETAIL",
  //       },
  //     },
  //     {
  //       label: "MANAGING WORK",
  //       value: {
  //         competencyId: 11,
  //         type: "Cross-Cutting",
  //         code: "FCC5",
  //         name: "MANAGING WORK",
  //       },
  //     },
  //     {
  //       label: "COMPUTER SKILLS",
  //       value:{
  //         competencyId: 12,
  //         type: "Cross-Cutting",
  //         code: "FCC6",
  //         name: "COMPUTER SKILLS",
  //       },
  //     },
  //     {
  //       label: "JOB SAFETY",
  //       value: {
  //         competencyId: 13,
  //         type: "Cross-Cutting",
  //         code: "FCC7",
  //         name: "JOB SAFETY",
  //       },
  //     },
  //       {
  //         label: "ANALYTICAL THINKING",
  //         value: {
  //         competencyId: 14,
  //         type: "Cross-Cutting",
  //         code: "FCC8",
  //         name: "ANALYTICAL THINKING",
  //       },
  //     },
  //   ],
  // },
]

const funcionalModels = [
  {
    competencyId: 1,
    code: "ACB1",
    name: "CASH MANAGEMENT",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 2,
    code: "ACB2",
    name: "TRANSACTION PROCESSING (Treasury & Budget)",
    definition: "This is a definition on the model",
  },
  {
    
    competencyId: 3,
    code: "ACB3",
    name: "TRANSACTION PROCESSING (General Accounting & Payroll)",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 4,
    type: "Functional",
    code: "ACB4",
    name: "FINANCIAL ANALYTICAL THINKING",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 5,
    type: "Functional",
    code: "ACB5",
    name: "OVERSIGHT OF BUDGET EXECUTION",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 6,
    type: "Functional",
    code: "ACB6",
    name: "ACCOUNTING SKILLS",
    definition: "This is a definition on the model",
  },
]

const crossCuttingModels = [
  {
    competencyId: 7,
    code: "FCC1",
    name: "FILES AND RECORDS MANAGEMENT",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 8,
    code: "FCC2",
    name: "Communicating Effectively ",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 9,
    code: "FCC3",
    name: "STRESS MANAGEMENT",
    definition: "This is a definition on the model",
  },
  {
    
    competencyId: 10,
    code: "FCC4",
    name: "ATTENTION TO DETAIL",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 11,
    code: "FCC5",
    name: "MANAGING WORK",
    definition: "This is a definition on the model",
   
  },
  {
    competencyId: 12,
    code: "FCC6",
    name: "COMPUTER SKILLS",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 13,
    code: "FCC7",
    name: "JOB SAFETY",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 14,
    code: "FCC8",
    name: "ANALYTICAL THINKING",
    definition: "This is a definition on the model",
  },
]

const coreModels = [
  {
    competencyId: 15,
    code: "COC1",
    name: "DELIVERING SERVICE EXCELLENCE",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 16,
    code: "COC2",
    name: "EXEMPLIFYING INTEGRITY",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 17,
    code: "COC3",
    name: "ORGANIZATIONAL COMMITMENT",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 18,
    code: "COC4",
    name: "RESULTS FOCUS",
    definition: "This is a definition on the model",
  },
]

const managerialModels = [
  {
    competencyId: 19,
    code: "MEC1",
    name: "CREATING AND NURTURING A HIGH PERFORMING ORGANIZATION",
    definition: "This is a definition on the model"
  },
  {
    competencyId: 20,
    code: "MEC2",
    name: "THINKING STRATEGICALLY AND CREATIVELY",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 21,
    code: "MEC3",
    name: "LEADING CHANGE",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 22,
    code: "MEC4",
    name: "MANAGING PERFORMANCE AND COACHING FOR RESULTS",
    definition: "This is a definition on the model",
  },
  {
    competencyId: 23,
    code: "MEC5",
    name: "BUILDING COLLABORATIVE AND INCLUSIVE WORKING RELATIONSHIPS",
    definition: "This is a definition on the model",
  },
]

const allCompetencyModels = [
  {
    competencyId: 1,
    basic: "Strives to consistently meet service standards.\nResponds to simple client concerns in a friendly and courteous manner, refers challenging client situation to immediate superior.\nAddresses client concerns with the use of job aid and under supervision.",
    intermediate: "Strives to consistently meet and sometimes exceed service standards.\nResponds to complex clients concern in a courteous and friendly manner; and refers challenging client situation to immediate superior.\nAddresses client concerns with limited reference to job aid and minimal supervision.",
    advance: "Strives to exceed service standards all the time.\nResponds to all types of client issues and concerns in timely, professional, helpful and courteous manner, regardless of client attitude.\nAddresses client concerns without use of job aid and supervision.",
    superior: "Strives to consistently exceed service standards and anticipates clients' upcoming needs and concerns.\nResponds to all types of client issues and concerns in a timely, professional, helpful and courteous manner, regardless of client attitude; provides clients with tips and advice to avoid these issues and concerns from recurring.\nAddresses client concerns independently and recommends innovative approaches to better address client concern.",
  },
  {
    competencyId: 2,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 3,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 4,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 5,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 6,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 7,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 8,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 9,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    
    competencyId: 10,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 11,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 12,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 13,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 14,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 15,
    basic: "Strives to consistently meet service standards.\n\nResponds to simple client concerns in a friendly and courteous manner, refers challenging client situation to immediate superior.\n\nAddresses client concerns with the use of job aid and under supervision.",
    intermediate: "Strives to consistently meet and sometimes exceed service standards.\n\nResponds to complex clients concern in a courteous and friendly manner; and refers challenging client situation to immediate superior.\n\nAddresses client concerns with limited reference to job aid and minimal supervision.",
    advance: "Strives to exceed service standards all the time.\n\nResponds to all types of client issues and concerns in timely, professional, helpful and courteous manner, regardless of client attitude.\n\nAddresses client concerns without use of job aid and supervision.",
    superior: "Strives to consistently exceed service standards and anticipates clients' upcoming needs and concerns.\n\nResponds to all types of client issues and concerns in a timely, professional, helpful and courteous manner, regardless of client attitude; provides clients with tips and advice to avoid these issues and concerns from recurring.\n\nAddresses client concerns independently and recommends innovative approaches to better address client concern.",
  },
  {
    competencyId: 16,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 17,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 18,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 19,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 20,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 21,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 22,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
  {
    competencyId: 23,
    basic: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    intermediate: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    advance: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
    superior: "Test paragraph 1.\nTest paragraph 2.\nTest paragraph 3.",
  },
]

export { 
  occupationalGroupCompetencies, 
  positionCompetencies, 
  competencyModelsOptions, 
  coreModels, 
  managerialModels, 
  crossCuttingModels, 
  funcionalModels,
  allCompetencyModels,
}