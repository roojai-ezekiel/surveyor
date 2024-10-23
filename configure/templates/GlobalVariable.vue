<script>
//https://forum-archive.vuejs.org/topic/141/global-variables-or-constant/5
export default {
  versionApp: "{versionApp}",
  //  claimBackend: 'https://claimconsole.roojai.com/api/',
  // claimBackend: "https://claimconsole.uat-roojai.com/api/",
  // claimBackend: "http://192.168.114.209:8080/api/",
  // claimBackend: 'https://myaccount.uat-roojai.com/api',
  claimBackend: "{claimBackend}",
  // claimBackend: 'http://claimapp-roojai.herokuapp.com/api/',
  // claimBackend: "https://claimconsole.roojai.com/api/",
  // claimBackend: 'http://192.168.1.38:8080/api/',
  // claimBackend: "http://10.10.16.14:8080/api/",
  // claimBackend: "http://localhost:8080/api/",
  firstPage: "/",
  username: "{username}",
  password: "{password}",
  gmapKey: "{gmapKey}",
  token: "",
  token_type: "",
  t: null,

  access_token: "",
  markerCustObj: {},
  markerSurvObj: {},
  markerRoute: {},
  focusMarker: null,
  directionsService: null,
  directionsDisplay: null,
  //template width height
  headerH: 70,
  footerH: 50,
  defaultFrequency: 5,
  defaultFrequencyNoCase: 10,
  sqliteVersionC: "",
  surveyorName: "",
  surveyAppDataId: "",
  claimObject: {},
  claimObjSelect: {},
  RoojaiDocApp: "{RoojaiDocApp}",
  RoojaiDocAppConnection: null,
  xDropzone: null,

  currentTab: 1,
  picProfile: "",
  surveyorRemark: "",
  surveyorObj: {},
  currentAdress: "",
  statusWork: "Active",
  flagBusyWork: false,
  approxDistance: "",
  approxTime: "",
  flagTimerRealt: true,
  flagTimerSendLocation: true,
  lastUpdate: "",
  gpsStatus: "",
  frequency: 0,
  frequencyNoCase: 0,
  survEndLat: 0,
  survEndLng: 0,
  survEndAddress: "",
  isDisableTP: true,
  isPhoneTPDisable: true,
  isEmailTPDisable: true,
  isDisable: true,
  isPhoneDisable: true,
  isEmailDisable: true,
  DamageSearchList: [],
  TP_DamageSearchList: [],
  SearchKeyword: {
    AccKeyword: "",
    DamageKeyword: "",
    TpDamageKeyword: "",
    CompanyKeyword: ""
  },
  Driver: {
    sfAccountId: "",
    firstname: "",
    lastname: "",
    Phone: "",
    Email: "",
    DrivingLicense: "",
    DrivingLicenseType: null,
    ID: "",
    prefLang: null
  },
  AccDetail: {
    CauseType: "",
    IncidentType: "",
    Liability: "",
    InvestRemark: ""
  },
  InsuredVehicle: {
    Drivable: "No",
    VehicleDamage: [],
    Odometer: 0,
    CameraInstall: "No",
    CameraWork: "No",
    CarAtGarage: "No",
    GarageDealer: ""
  },
  InjuryProperty: {
    NumberPassenger: 0,
    DriverInjured: "No",
    InjuredName: "",
    InjuredRelation: "Insured Driver",
    InjuredDetail: ""
  },
  Fraud: {
    SuspectedFraud: false,
    InternalComment: "",
    FraudComment: ""
  },
  addDamage: "",
  addInjure: {
    Name: "",
    Relations: "",
    Detail: ""
  },
  NotifyRelated: false,
  Deductible: "",
  OtherExcess: "",
  RemarkExcess: "",
  RelationSelection: [
    {
      val: "Insured Driver",
      desc: "Insured Driver / ผู้ขับขี่รถประกัน"
    }
  ],
  TP_RelationSelection: [
    {
      val: "Insured Passenger",
      desc: "Insured Passenger / ผู้โดยสารรถประกัน"
    },
    {
      val: "TP Driver",
      desc: "TP Driver / ผู้ขับขี่รถคู่กรณี"
    },
    {
      val: "TP Passenger",
      desc: "TP Passenger / ผู้โดยสารรถคู่กรณี"
    },
    {
      val: "TP Property Owner",
      desc: "TP Property Owner / เจ้าของทรัพย์สิน"
    },
    {
      val: "Pedestrian person",
      desc: "Pedestrian person / คนเดินเท้า"
    }
  ],
  causeTypeSelection: [
    {
      val: "Collision with Third Party",
      desc: "Collision with Third Party / ชนกับคู่กรณี"
    },
    {
      val: "Collision without Third Party",
      desc: "Collision without Third Party / ชนไม่มีคู่กรณี"
    },
    {
      val: "Windscreen Breakage",
      desc: "Windscreen Breakage / เคลมกระจก"
    },
    {
      val: "Natural Disaster, Flood",
      desc: "Natural Disaster, Flood / ภัยธรรมชาติ"
    },
    {
      val: "Fire",
      desc: "Fire / ไฟไหม้"
    },
    {
      val: "Theft",
      desc: "Theft / รถหาย/โจรกรรม"
    },
    {
      val: "Others",
      desc: "Other / อื่นๆ"
    },
    {
      val: "Vehicle Breakdown",
      desc: "Vehicle Breakdown"
    }
  ],
  IncidentTypeSelection: {
    "Collision with Third Party": [
      {
        val: "Collisions involving pedestrians and cyclists",
        desc:
          "Collision involving pedestrians and cyclists / ชนคนเดินถนน/จักรยาน"
      },
      {
        val: "Collision with another land vehicle",
        desc: "Collision with another land vehicle / ชนกับยานพาหนะทางบก"
      },
      {
        val: "collision with motorcycle",
        desc: "Collision with motorcycle / ชนกับรถจักรยานยนต์"
      },
      {
        val: "multiple vehicle collision",
        desc: "Multiple vehicle collision / ชนกันหลายคัน"
      }
    ],
    "Collision without Third Party": [
      {
        val: "Collision and third party run away",
        desc: "Collision and third party run away / คู่กรณีหลบหนี"
      },
      {
        val: "collisions with fallen rocks",
        desc: "Collision with fallen objects / วัตถุตกใส่"
      },
      {
        val: "collision with animal",
        desc: "Collision with animal / ชนสัตว์"
      },
      {
        val: "collision with property",
        desc: "Collision with property / ชนทรัพย์สิน"
      },
      {
        val: "collision with the tree",
        desc: "Collision with the tree / ชนต้นไม้"
      },
      {
        val: "Park and found damage",
        desc: "Park and found damage / พบความเสียหายขณะจอดรถ"
      },
      {
        val: "Single-vehicle crash",
        desc: "Single-vehicle crash / ตกข้างทาง"
      },
      {
        val: "something damage to vehicle",
        desc: "Something damage to vehicle / อื่นๆ ทำให้รถเสียหาย"
      }
    ],
    "Windscreen Breakage": [
      {
        val: "Auto Glass damage",
        desc: "Auto Glass damage / กระจกอื่นเสียหาย"
      },
      {
        val: "Windscreen crack",
        desc: "Windscreen crack / กระจกหน้าแตกร้าว"
      },
      {
        val: "Windscreen repair",
        desc: "Windscreen repair / กระจกซ่อมรอย"
      },
      {
        val: "Windscreen stone chip",
        desc: "Windscreen stone chip / กระจกหน้าเป็นรอยหินกระเด็นใส่"
      }
    ],
    "Natural Disaster, Flood": [
      {
        val: "vehicle damage from flood",
        desc: "Vehicle damage from flood / เสียหายจากน้ำท่วม"
      },
      {
        val: "vehicle damage from other Natural Disaster",
        desc: "Vehicle damage from other Natural Disaster / เสียหายจากภัยอื่นๆ"
      }
    ],
    Fire: [
      {
        val: "Total Loss-Fire",
        desc: "Total Losss-Fire / ไฟไหม้สิ้นเชิง"
      },
      {
        val: "vehicle damage from Fire",
        desc: "Vehicle damage from Fire / ไฟไหม้บางส่วน"
      }
    ],
    Theft: [
      {
        val: null,
        desc: "-"
      }
    ],
    Others: [
      {
        val: "Others",
        desc: "Others / อื่นๆ"
      }
    ],
    "Vehicle Breakdown": [
      {
        val: "Emergency repair assistant",
        desc: "Emergency repair assistant"
      },
      {
        val: "Faulty battery assistant",
        desc: "Faulty battery assistant"
      },
      {
        val: "Locksmith assistant",
        desc: "Locksmith assistant"
      },
      {
        val: "Fuel refill assistant",
        desc: "Fuel refill assistant"
      },
      {
        val: "Vehicle transportation service",
        desc: "Vehicle transportation service"
      },
      {
        val: "Vehicle replacement",
        desc: "Vehicle replacement"
      }
    ]
  },
  LiabilitySelection: [
    {
      val: "Awaiting Judgement",
      desc: "Awaiting Judgement / รอผลคดี"
    },
    {
      val: "At Fault",
      desc: "At Fault / ฝ่ายผิด"
    },
    {
      val: "Not at Fault",
      desc: "Not at Fault / ฝ่ายถูก"
    },
    {
      val: "Both Parties at Fault",
      desc: "Both Parties at Fault / ประมาทร่วม"
    },
    {
      val: "Can not Notify TP",
      desc: "Can not Notify TP / ไม่สามารถระบุคู่กรณีได้"
    },
    {
      val: "No TP Involved",
      desc: "No TP Involved / ไม่มีคู่กรณี"
    }
  ],
  PlanTypeSelection: [
    {
      val: "Type 1",
      desc: "surveyform.label.plan.one"
    },
    {
      val: "Type 2",
      desc: "surveyform.label.plan.two"
    },
    {
      val: "Type 3",
      desc: "surveyform.label.plan.three"
    },
    {
      val: "Type 2+",
      desc: "surveyform.label.plan.twoplus"
    },
    {
      val: "Type 3+",
      desc: "surveyform.label.plan.threeplus"
    },
    {
      val: "Compulsory",
      desc: "surveyform.label.plan.compulsory"
    },
    {
      val: "No",
      desc: "surveyform.label.plan.no"
    }
  ],
  TPLiabilitySelection: [
    {
      val: "Awaiting Judgement",
      desc: "Awaiting Judgement / รอผลคดี"
    },
    {
      val: "At Fault",
      desc: "At Fault / ฝ่ายผิด"
    },
    {
      val: "Not at Fault",
      desc: "Not at Fault / ฝ่ายถูก"
    },
    {
      val: "Both Parties at Fault",
      desc: "Both Parties at Fault / ประมาทร่วม"
    }
  ],
  TableDamage: [
    {
      id: 1,
      col: "surveyform.label.vehicle.damage"
    },
    {
      id: 2,
      col: "surveyform.label.vehicle.level"
    }
  ],
  DriverLicenseTypeSelection: [
    {
      key: 1,
      value: "Temporary Driving Licence",
      desc: "ใบอนุญาตขับรถยนต์ชั่วคราว Temporary Driving Licence"
    },
    {
      key: 2,
      value: "Motor Driving Licence",
      desc: "ใบอนุญาตขับรถยนต์ส่วนบุคคล Motor Driving Licence"
    },
    {
      key: 3,
      value: "Temporary Motorcycle Driving Licence",
      desc:
        "ใบอนุญาตขับรถจักรยานยนต์ส่วนบุคคลชั่วคราว Temporary Motorcycle Driving Licence"
    },
    {
      key: 4,
      value: "Motorcycle Driving Licence",
      desc: "ใบอนุญาตขับรถจักรยานยนต์ส่วนบุคคล Motorcycle Driving Licence"
    },
    {
      key: 5,
      value: "Public Motorcycle Driving Licence",
      desc: "ใบอนุญาตขับรถจักรยานยนต์สาธารณะ Public Motorcycle Driving Licence"
    },
    {
      key: 6,
      value: "Temporary Motor Tricycle Driving Licence",
      desc:
        "ใบอนุญาตขับรถยนต์สามล้อชั่วคราว Temporary Motor Tricycle Driving Licence"
    },
    {
      key: 7,
      value: "Motor Tricycle Driving Licence",
      desc: "ใบอนุญาตขับรถยนต์สามล้อส่วนบุคคล Motor Tricycle Driving Licence"
    },
    {
      key: 8,
      value: "Public Motor Tricycle Driving Licence",
      desc:
        "ใบอนุญาตขับรถยนต์สามล้อสาธารณะ Public Motor Tricycle Driving Licence"
    },
    {
      key: 9,
      value: "Public Motor Driving Licence",
      desc: "ใบอนุญาตขับรถยนต์สาธารณะ Public Motor Driving Licence"
    },
    {
      key: 10,
      value: "Road Roller Driving Licence",
      desc: "ใบอนุญาตขับรถบดถนน Road Roller Driving Licence"
    },
    {
      key: 11,
      value: "Tractor Driving Licence",
      desc: "ใบอนุญาตขับรถแทรกเตอร์ Tractor Driving Licence"
    },
    {
      key: 12,
      value: "Commercial Trucks and Bus Driving Licence",
      desc:
        "ใบอนุญาตขับรถชนิดอื่นนอกจาก Commercial Trucks and Bus Driving Licence"
    },
    {
      key: 13,
      value: "International Driving Licence",
      desc: "ใบอนุญาตขับรถระหว่างประเทศ International Driving Licence"
    }
  ],
  TP: {
    Driver: {
      firstname: "",
      lastname: "",
      ID: "",
      Phone: "",
      Email: "",
      prefLang: null,
      sfAccountId: ""
    },
    Vehicle: {
      make: "",
      model: "",
      carplate: "",
      carprovince: "",
      chassisno: "",
      insurecompany: "",
      plantype: ""
    },
    VehicleDamage: {
      isCarDamage: "No",
      Damages: [],
      liability: ""
    },
    InjuryProperty: {
      isPropDam: "No",
      TPinsure: "",
      TPDamDetail: "",
      NumberPassenger: 0,
      anyInjury: "No",
      InjuredName: "",
      InjuredRelation: "TP Driver",
      InjuredDetail: ""
    }
  },
  TPList: [],
  surveyData: {
    inspectionData: {},
    contactData: [],
    damageData: [],
    thirdPartyData: []
  },
  AccidentScenario: [],
  flagScenarioLoading: true,
  Accident_ScenarioC: {}
};
</script>
