const employees = [
  {
    options: [
      {
        label: "Christine B. Tacuban",
        value: {
          employeeId: "1981b23d-a294-4580-aa46-01172374e025",
          fullName: "Christine B. Tacuban",
        },
      },
      {
        label: "Phyll Fragata",
        value: {
          employeeId: "200bcc23-97a5-43fa-a3a1-6fc08f82364e",
          fullName: "Phyll Fragata",
        },
      },
      {
        label: "Charlyn Panunciar",
        value: {
          employeeId: "24980caa-2453-4107-a680-05b515ebe99c",
          fullName: "Charlyn Panunciar",
        },
      },
      {
        label: "Tessa Mae Alejado",
        value: {
          employeeId: "2c7b5dc5-747d-436b-880c-a679a0a2a620",
          fullName: "Tessa Mae Alejado",
        },
      },
      {
        label: "Jay Raymond Nosotros",
        value: {
          employeeId: "3a6fa165-9d3b-4d3b-8615-97c725379e74",
          fullName: "Jay Raymond Nosotros",
        },
      },
    ],
  },
]

const samplePDS = {
  basicInfo: {
    personalInfo: {
      email: "reynold_arsenal@yahoo.com",
      firstName: "Reynold",
      middleName: "Martinez",
      lastName: "Arsenal",
      nameExtension: "Jr",
      birthDate: "1987-05-01T00:00:00.000Z",
      birthPlace: "Tinagacan, General Santos City",
      sex: "Male",
      civilStatus: "Single",
      height: "1.66",
      weight: "60.00",
      bloodType: "O+",
      mobileNumber: "09271234567",
      telNumber: "552-1979",
      citizenship: "Dual Citizenship",
      citizenshipType: "By birth",
      country: "Azebaijan",
    },
    address: {
      permanentAddress: {
        houseNumber: "125",
        street: "saging",
        subdivision: "salvani",
        barangay: "City Heights",
        city: "General Santos City (Dadiangas)",
        province: "South Cotabato",
        zipCode: "9500",
      },
      residentialAddress: {
        houseNumber: "125",
        street: "saging2",
        subdivision: "salvani2",
        barangay: "Burias",
        city: "Glan",
        province: "Sarangani",
        zipCode: "95002",
      },
    },
    governmentIssuedIds: {
      gsisNumber: "1234567",
      pagibigNumber: "896979",
      philhealthNumber: "1234567",
      sssNumber: "123457",
      tinNumber: "123-123-123",
      agencyNumber: "",
    },
  },
  family: {
    spouse: {
      firstName: "AJ",
      middleName: "Ann",
      lastName: "Raval",
      nameExtension: "",
      occupation: "University Professor",
      employer: "Mindanao State University",
      businessAddress: "Brgy. Tambler, General Santos City",
      telephoneNumber: "",
    },
    parents: {
      mother: {
        motherFirstName: "Amanda",
        motherMiddleName: "Fuentes",
        motherLastName: "Calikas",
        motherMaidenName: "Amanda Nunes Fuentes",
      },
      father: {
        fatherFirstName: "Jefferd",
        fatherMiddleName: "Calikas",
        fatherLastName: "Manahay",
        fatherNameExtension: "",
      },
    },
    children: [
      {
        childName: "RV Soberano Narvaiza",
        birthDate: "2021-01-01T00:00:00.000Z",
      },
      {
        childName: "Alfred Wagner Jun Narvaiza",
        birthDate: "2020-01-01T00:00:00.000Z",
      },
      {
        childName: "Child 3",
        birthDate: "1991-01-01T00:00:00.000Z",
      },
      {
        childName: "Child 4",
        birthDate: "1991-02-01T00:00:00.000Z",
      },
      {
        childName: "Child 5",
        birthDate: "1991-03-01T00:00:00.000Z",
      },
      {
        childName: "Child 6",
        birthDate: "1991-04-01T00:00:00.000Z",
      },
      {
        childName: "Child 7",
        birthDate: "1991-05-01T00:00:00.000Z",
      },
      {
        childName: "Child 8",
        birthDate: "1991-06-01T00:00:00.000Z",
      },
      {
        childName: "Memeng",
        birthDate: "1996-06-12T00:00:00.000Z",
      },
    ],
  },
  education: {
    elementary: {
      schoolName: "Dadiangas South Central Elementary School",
      from: 2000,
      to: 2004,
      yearGraduated: 2004,
      awards: "",
      units: "",
      degree: "Primary Education",
    },
    secondary: {
      schoolName: "Mindanao State University-CETD",
      from: 2004,
      to: 2008,
      yearGraduated: 2008,
      awards: "DOST Scholar",
      degree: "High School",
      units: "Graduated",
    },
    vocational: [],
    college: [
      {
        schoolName: "Mindanao State University",
        from: 2008,
        to: 2012,
        yearGraduated: 2012,
        awards: "Cum Laude",
        degree: "BS Information Technology",
        units: "",
      },
    ],
    graduate: [
      {
        schoolName: "Mindanao State University",
        from: 2015,
        to: 2017,
        yearGraduated: 2017,
        awards: "",
        degree: "Master's in Information Technology",
        units: "",
      },
    ],
  },
  eligibility: [
    {
      name: "Licensed Pharmacist",
      rating: "100.00",
      examDate: "2022-01-01 to 2022-01-02",
      examPlace: "GenSan",
      licenseNumber: "",
      validity: "2022-01-01T00:00:00.000Z",
    },
    {
      name: "Licensed Sample 1",
      rating: "100.00",
      examDate: "2022-01-01 to 2022-01-02",
      examPlace: "USA",
      licenseNumber: "1247xxxx",
      validity: "2022-01-01T00:00:00.000Z",
    },
  ],
  workExperience: [
    {
      positionTitle: "Shooting Guard",
      companyName: "Chicago Bulls",
      monthlySalary: 50000,
      appointmentStatus: "Job Order",
      isGovernmentService: false,
      salaryGrade: "10-2",
      from: "2000-03-01T00:00:00.000Z",
      to: "2005-03-01T00:00:00.000Z",
    },
    {
      positionTitle: "Center",
      companyName: "Tinoto Powerboyz",
      monthlySalary: 50000,
      appointmentStatus: "Job Order",
      isGovernmentService: false,
      salaryGrade: "10-2",
      from: "1997-03-01T00:00:00.000Z",
      to: "1999-03-01T00:00:00.000Z",
    },
    {
      positionTitle: "Pointguard",
      companyName: "Minnesota Timberwolves",
      monthlySalary: 50000,
      appointmentStatus: "Job Order",
      isGovernmentService: false,
      salaryGrade: "10-2",
      from: "1995-03-01T00:00:00.000Z",
      to: "1997-03-01T00:00:00.000Z",
    },
    {
      positionTitle: "Pointguard",
      companyName: "Tinagacan Slashers",
      monthlySalary: 50000,
      appointmentStatus: "Job Order",
      isGovernmentService: false,
      salaryGrade: "10-2",
      from: "1997-03-01T00:00:00.000Z",
      to: "1999-03-01T00:00:00.000Z",
    },
    {
      positionTitle: "Work 5",
      companyName: "Company Name",
      monthlySalary: 15000,
      appointmentStatus: "Regular",
      isGovernmentService: false,
      salaryGrade: "",
      from: "1997-03-01T00:00:00.000Z",
      to: "1999-03-01T00:00:00.000Z",
    },
    {
      positionTitle: "Work 6",
      companyName: "Company Name",
      monthlySalary: 15000,
      appointmentStatus: "Regular",
      isGovernmentService: false,
      salaryGrade: "",
      from: "1997-03-01T00:00:00.000Z",
      to: "1999-03-01T00:00:00.000Z",
    },
    {
      positionTitle: "Work 7",
      companyName: "Company Name",
      monthlySalary: 15000,
      appointmentStatus: "Regular",
      isGovernmentService: false,
      salaryGrade: "",
      from: "1997-03-01T00:00:00.000Z",
      to: "1999-03-01T00:00:00.000Z",
    },
    {
      positionTitle: "Work 22",
      companyName: "Carve Business Management Carve Business Management",
      monthlySalary: 15000,
      appointmentStatus: "Regular",
      isGovernmentService: false,
      salaryGrade: "",
      from: "1997-03-01T00:00:00.000Z",
      to: "1999-03-01T00:00:00.000Z",
    },
    {
      positionTitle: "Work 23",
      companyName: "Company Name",
      monthlySalary: 15000,
      appointmentStatus: "Regular",
      isGovernmentService: false,
      salaryGrade: "",
      from: "1997-03-01T00:00:00.000Z",
      to: "1999-03-01T00:00:00.000Z",
    },
  ],
  voluntaryWork: [
    {
      _id: "fc9ec11e-7af7-4c69-801b-a189fbd0acbe",
      organizationName: "Philippine Animal Welfare Society GenSan",
      position: "Project Manager",
      from: "2021-05-21T00:00:00.000Z",
      to: "2021-06-21T00:00:00.000Z",
      numberOfHours: 12,
    },
    {
      _id: "ffcf2303-7923-4ff6-ab0a-13c90f53c585",
      organizationName: "NBA Cares",
      position: "Kitchen Help",
      from: "2021-03-21T00:00:00.000Z",
      to: "2021-05-21T00:00:00.000Z",
      numberOfHours: 21,
    },
  ],
  learningDevelopment: [
    {
      title: "Basketball Clinic Again",
      conductedBy: "NBA Pagadian",
      type: "Technical",
      from: "2021-07-25T00:00:00.000Z",
      to: "2021-12-25T00:00:00.000Z",
      numberOfHours: 25,
    },
    {
      title: "Basketball Clinic",
      conductedBy: "NBA GenSan",
      type: "Technical",
      from: "2021-03-25T00:00:00.000Z",
      to: "2021-05-25T00:00:00.000Z",
      numberOfHours: 25,
    },
    {
      title: "Basketball Clinic Again",
      conductedBy: "NBA Pagadian",
      type: "Technical",
      from: "2021-07-25T00:00:00.000Z",
      to: "2021-12-25T00:00:00.000Z",
      numberOfHours: 25,
    },
    {
      title: "Basketball Clinic",
      conductedBy: "NBA GenSan",
      type: "Technical",
      from: "2021-03-25T00:00:00.000Z",
      to: "2021-05-25T00:00:00.000Z",
      numberOfHours: 25,
    },
  ],
  otherInfo: {
    skills: ["Testing", "Playing the Guitar"],
    recognitions: ["Expert Player", "Most Valuable Player"],
    organizations: ["Akatsuki", "Espada", "Phantom Troupe", "Organiztion XYZ"],
    c4Questions: {
      officeRelation: {
        withinThirdDegree: false,
        withinFourthDegree: true,
        details: "Head is 1st cousin",
      },
      guiltyCharged: {
        isGuilty: false,
        guiltyDetails: "",
        isCharged: true,
        chargedDateFiled: "2021-03-25T00:00:00.000Z",
        chargedCaseStatus: "dismissed",
      },
      convicted: {
        isConvicted: false,
        details: "",
      },
      separatedService: {
        isSeparated: true,
        details: "Finished Contract",
      },
      candidateResigned: {
        isCandidate: true,
        candidateDetails: "Brgy. Chairman",
        isResigned: true,
        resignedDetails: "Campaign for a Councillor",
      },
      immigrant: {
        isImmigrant: true,
        details: "Azerbaijan",
      },
      indigenousPwdSoloParent: {
        isIndigenousMember: true,
        indigenousMemberDetails: "Manobo",
        isPwd: false,
        pwdIdNumber: "",
        isSoloParent: false,
        soloParentIdNumber: "",
      },
    },
    references: [
      {
        name: "Naruto Sasuke",
        address: "DepEd Lagao",
        telephoneNumber: "09201234567",
      },
      {
        name: "Jeffered Manahay",
        address: "DFA Robinsons",
        telephoneNumber: "09275622231",
      },
    ],
    governmentIssuedId: {
      issuedId: "Voter's ID",
      idNumber: "123-123-1234",
      issueDate: "2017-05-05T00:00:00.000Z",
      issuePlace: "General Santos City",
    },
  },
}

export { employees, samplePDS }
