export const industries = [
    { label: "Building and Maintenance", value: "maintenance",
        socGroupId: 37,
        businesses: ["Hotels", "Office buildings", "Apartment complexes"],
        roles: [
            { label: "Janitors", value: "janitors", socCode: 2011 },
            { label: "Housekeepers", value: "housekeepers", socCode: 2012 },
            { label: "Landscapers", value: "landscapers", socCode: 3011 }
        ]
    },
    { label: "Community and Social Service", value: "community",
        socGroupId: 21,
        businesses: ["Nonprofits", "Community centers", "Social services agencies"],
        roles: [
            { label: "Social & Human Service Assistants", value: "social-and-human-service-assistants", socCode: 1093 },
            { label: "Community Health Workers", value: "community-health-workers", socCode: 1094 }
        ]
    },
    { label: "Construction", value: "construction",
        socGroupId: 47,
        businesses: ["Construction companies", "Home improvement contractors"],
        roles: [
            { label: "Laborers", value: "laborers", socCode: 2061 },
            { label: "Carpenters", value: "carpenters", socCode: 2031 },
            { label: "Painters", value: "painters", socCode: 2141 }
        ]
    },
    { label: "Education", value: "education",
        socGroupId: 25,
        businesses: ["Schools", "Tutoring centers", "After-school programs"],
        roles: [
            { label: "Teacher assistants", value: "teacher-assistants", socCode: 9041 },
            { label: "Tutors", value: "tutors", socCode: 3099 }
        ]
    },
    { label: "Event Staff", value: "event-staff",
        socGroupId: 27,
        businesses: ["Event Venues", "Theaters", "Amusement parks"],
        roles: [
            { label: "Event Staff", value: "event-staff", socCode: 3091 },
            { label: "Ushers", value: "ushers", socCode: 3031 },
            { label: "Amusement Park Attendants", value: "amusement-park-attendants", socCode: 3091 }
        ]
    },
    { label: "Financial Services", value: "financial-services",
        socGroupId: 33,
        businesses: ["Banks", "Insurance Companies", "Investment firms"],
        roles: [
            { label: "Bank Tellers", value: "bank-tellers", socCode: 2011 },
            { label: "Financial Analysts", value: "financial-analysts", socCode: 2011 },
            { label: "Investment Analysts", value: "investment-analysts", socCode: 2011 }
        ]
    },
    { label: "Food Service", value: "food-service",
        socGroupId: 35,
        businesses: ["Restaurants", "Cafes", "Catering services"],
        roles: [
            { label: "Fast Food Workers", value: "fast-food-workers", socCode: 3023 },
            { label: "Cooks", value: "cooks", socCode: 2014 },
            { label: "Bartenders", value: "bartenders", socCode: 3011 },
            { label: "Servers", value: "servers", socCode: 3031 }
        ]
    },
    { label: "Healthcare", value: "helthcare",
        socGroupId: 31,
        businesses: ["Hospitals", "Nursing homes", "In-home care services"],
        roles: [
            { label: "Nursing Assistants", value: "nursing-assistants", socCode: 1131 },
            { label: "Orderlies", value: "orderlies", socCode: 1132 },
            { label: "Home Health Aides", value: "home-health-aides", socCode: 1121 },
            { label: "Personal Care Aides", value: "personal-care-aides", socCode: 1122 },
            { label: "Medical Assistants", value: "medical-assistants", socCode: 9092 }
        ]
    },
    { label: "Healthcare Practitioner", value: "healthcare-technician",
        socGroupId: 29,
        businesses: ["Pharmacies", "Hospitals", "Clinics"],
        roles: [
            { label: "Pharmacy Technicians", value: "pharmacy-technicians", socCode: 2052 },
            { label: "Radiologic Technologists", value: "radiologic-technologists", socCode: 2034 }
        ]
    },
    { label: "Manufacturing", value: "manufacturing",
        socGroupId: 51,
        businesses: ["Manufacturing Plants", "Packaging companies", "Food production facilities"],
        roles: [
            { label: "Assembly Line Workers", value: "assembly-line-workers", socCode: 2092 },
            { label: "Machine Operators", value: "machine-operators", socCode: 4041 },
            { label: "Packers", value: "packers", socCode: 9111 }
        ]
    },
    { label: "Office and Administrative", value: "office",
        socGroupId: 43,
        businesses: ["Offices", "Call centers", "Administrative service companies"],
        roles: [
            { label: "Receptionists", value: "receptionists", socCode: 4171 },
            { label: "Data Entry Clerks", value: "data-entry-clerks", socCode: 9021 },
            { label: "Customer Support Representatives", value: "customer-support-representatives", socCode: 4051 }
        ]
    },
    { label: "Personal Care & Service", value: "personal-care",
        socGroupId: 39,
        businesses: ["Salons", "Spas", "Gyms", "Daycare centers"],
        roles: [
            { label: "Childcare Workers", value: "childcare-workers", socCode: 9011 },
            { label: "Fitness Trainers", value: "fitness-trainers", socCode: 9031 },
            { label: "Hairdressers", value: "hairdressers", socCode: 5012 },
        ]
    },
    { label: "Protective Servics", value: "protective-service",
        socGroupId: 33,
        businesses: ["Security Firms", "Recreational facilities", "Parking services"],
        roles: [
            { label: "Security Guards", value: "security-guards", socCode: 9032 },
            { label: "Lifeguards", value: "lifeguards", socCode: 9092 },
        ]
    },
    { label: "Repair", value: "repair",
        socGroupId: 49,
        businesses: ["Maintenance Firms", "Auto repair shops", "Equipment rental businesses"],
        roles: [
            { label: "Maintenance Workers", value: "maintenance-workers", socCode: 9071 },
            { label: "Appliance Repair Technicians", value: "appliance-repair-technicians", socCode: 9031 },
            { label: "Vehicle Service Technicians", value: "vehicle-service-technicians", socCode: 3023 }
        ]
    },
    { label: "Retail", value: "retail", 
        socGroupId: 41,
        businesses: ["Retail Stores", "Supermarkets", "Convenience stores"],
        roles: [
            { label: "Retail Sales Associates", value: "retail-sales-associates", socCode: 2031 },
            { label: "Cashiers", value: "cashiers", socCode: 2011 },
            { label: "Customer Service Representatives", value: "customer-service-representatives", socCode: 4051 }
        ]
    },
    { label: "Transportation", value: "transportation",
        socGroupId: 53,
        businesses: ["Warehouses", "Delivery services", "Distribution centers"],
        roles: [
            { label: "Delivery Drivers", value: "delivery-drivers", socCode: 3033 },
            { label: "Forklift Operators", value: "forklift-operators", socCode: 7051 },
            { label: "Warehouse Workers", value: "warehouse-workers", socCode: 7062 }
        ]
    }
]