import { Label } from "@headlessui/react";
import {
    type FormDefinition,
    type TableDefinition
} from "~/types";


export const industryOptions = [
  {
    key: "food-service",
    socGroupId: 35,
    businesses: ["Restaurants", "Cafes", "Catering services"],
    jobs: [
      { label: "Fast food workers", value: "fast-food-workers", socCode: 3023 },
      { label: "Cooks", value: "cooks", socCode: 2014 },
      { label: "Bartenders", value: "bartenders", socCode: 3011 },
      { label: "Servers", value: "servers", socCode: 3031 }
    ],
    
  },
  {
    key: "retail",
    socGroupId: 41,
    businesses: ["Retail stores", "Supermarkets", "Convenience stores"],
    jobs: [
      { label: "Retail sales associates", value: "retail-sales-associates", socCode: 2031 },
      { label: "Cashiers", value: "cashiers", socCode: 2011 },
      { label: "Customer service representatives", value: "customer-service-representatives", socCode: 4051 }
    ],
  },
  {
    key: "personal-care",
    socGroupId: 39,
    businesses: ["Salons", "Spas", "Gyms", "Daycare centers"],
    jobs: [
      { label: "Childcare workers", value: "childcare-workers", socCode: 9011 },
      { label: "Fitness trainers", value: "fitness-trainers", socCode: 9031 },
      { label: "Hairdressers", value: "hairdressers", socCode: 5012 },
    ],
  },
  {
    key: "maintenance",
    socGroupId: 37,
    businesses: ["Hotels", "Office buildings", "Apartment complexes"],
    jobs: [
      { label: "Janitors", value: "janitors", socCode: 2011 },
      { label: "Housekeepers", value: "housekeepers", socCode: 2012 },
      { label: "Landscapers", value: "landscapers", socCode: 3011 }
    ],
  },
  {
    key: "transportation",
    socGroupId: 53,
    businesses: ["Warehouses", "Delivery services", "Distribution centers"],
    jobs: [
      { label: "Delivery drivers", value: "delivery-drivers", socCode: 3033 },
      { label: "Forklift operators", value: "forklift-operators", socCode: 7051 },
      { label: "Warehouse workers", value: "warehouse-workers", socCode: 7062 }
    ],
  },
  {
    key: "helthcare",
    socGroupId: 31,
    businesses: ["Hospitals", "Nursing homes", "In-home care services"],
    jobs: [
      { label: "Nursing assistants", value: "nursing-assistants", socCode: 1131 },
      { label: "Orderlies", value: "orderlies", socCode: 1132 },
      { label: "Home health aides", value: "home-health-aides", socCode: 1121 },
      { label: "Personal care aides", value: "personal-care-aides", socCode: 1122 },
      { label: "Medical assistants", value: "medical-assistants", socCode: 9092 }
    ],
  },
  {
    key: "office",
    socGroupId: 43,
    businesses: ["Offices", "Call centers", "Administrative service companies"],
    jobs: [
      { label: "Receptionists", value: "receptionists", socCode: 4171 },
      { label: "Data entry clerks", value: "data-entry-clerks", socCode: 9021 },
      { label: "Customer support representatives", value: "customer-support-representatives", socCode: 4051 }
    ],
  },
  {
    key: "manufacturing",
    socGroupId: 51,
    businesses: ["Manufacturing plants", "Packaging companies", "Food production facilities"],
    jobs: [
      { label: "Assembly line workers", value: "assembly-line-workers", socCode: 2092 },
      { label: "Machine operators", value: "machine-operators", socCode: 4041 },
      { label: "Packers", value: "packers", socCode: 9111 }
    ],
    
  },
  {
    key: "protective-service",
    socGroupId: 33,
    businesses: ["Security firms", "Recreational facilities", "Parking services"],
    jobs: [
        { label: "Security guards", value: "security-guards", socCode: 9032 },
        { label: "Lifeguards", value: "lifeguards", socCode: 9092 },
    ],
  },
  {
    key: "event-staff",
    socGroupId: 27,
    businesses: ["Event venues", "Theaters", "Amusement parks"],
    jobs: [
      { label: "Event staff", value: "event-staff", socCode: 3091 },
      { label: "Ushers", value: "ushers", socCode: 3031 },
      { label: "Amusement park attendants", value: "amusement-park-attendants", socCode: 3091 }
    ],

  },
  {
    key: "repair",
    socGroupId: 49,
    businesses: ["Maintenance firms", "Auto repair shops", "Equipment rental businesses"],
    jobs: [
      { label: "Maintenance workers", value: "maintenance-workers", socCode: 9071 },
      { label: "Appliance repair technicians", value: "appliance-repair-technicians", socCode: 9031 },
      { label: "Vehicle service technicians", value: "vehicle-service-technicians", socCode: 3023 }
    ],
  },
  {
    key: "healthcare-technician",
    socGroupId: 29,
    businesses: ["Pharmacies", "Hospitals", "Clinics"],
    jobs: [
      { label: "Pharmacy technicians", value: "pharmacy-technicians", socCode: 2052 },
      { label: "Radiologic technologists", value: "radiologic-technologists", socCode: 2034 }

    ],
  },
  {
    key: "construction",
    socGroupId: 47,
    businesses: ["Construction companies", "Home improvement contractors"],
    jobs: [
      { label: "Laborers", value: "laborers", socCode: 2061 },
      { label: "Carpenters", value: "carpenters", socCode: 2031 },
      { label: "Painters", value: "painters", socCode: 2141 }
    ],
  },
  {
    key: "education",
    socGroupId: 25,
    businesses: ["Schools", "Tutoring centers", "After-school programs"],
    jobs: [
      { label: "Teacher assistants", value: "teacher-assistants", socCode: 9041 },
      { label: "Tutors", value: "tutors", socCode: 3099 }
    ],
  },
  {
    key: "community",
    "socGroupId": 21,
    businesses: ["Nonprofits", "Community centers", "Social services agencies"],
    jobs: [
      { label: "Social and human service assistants", value: "social-and-human-service-assistants", socCode: 1093 },
      { label: "Community health workers", value: "community-health-workers", socCode: 1094 }
    ],
  }
]

/**
 * Table Structure
 */
const tableStructure: TableDefinition = {
    bulkActions: [
        { label: "Delete", type: "link", href: "/dashboard/-example/new" },
        { label: "Archive", type: "link", href: "/dashboard/-example/new"},
    ],
    filter: true,
    columns: [
        { label: "ID", accessorKey: "id", type: "text", required: true },
        
        { label: "Status", accessorKey: "status", type: "text", required: true },
        { label: "Amount", accessorKey: "amount", type: "tel", required: true },
        { label: "Email", accessorKey: "email", type: "email", required: true },
        
    ]
}

/**
 * Form Structure
 */
const businessForm: FormDefinition = {
  fields: [
    [
      { label: "Name", type: "text", name: "name", required: true, placeholder: "Enter the name of your organization" },
      { label: "Location", type: "text", name: "location", required: true, placeholder: "City & State" },
    ],
    [
      { label: "Website", type: "text", name: "url", required: false },
      {
        label: "Industry", type: "select", name: "industry", required: true, options: [
          { label: "Food Service", value: "food-service" },
          { label: "Retail", value: "retail" },
          { label: "Personal Care & Service", value: "personal-care" },
          { label: "Building and Maintenance", value: "maintenance" },
          { label: "Transportation", value: "transportation" },
          { label: "Healthcare", value: "helthcare" },
          { label: "Office and Administrative", value: "office" },
          { label: "Manufacturing", value: "manufacturing" },
          { label: "Protective Servics", value: "protective-service" },
          { label: "Event Staff", value: "event-staff" },
          { label: "Maintenance & Repair", value: "repair" },
          { label: "Healthcare Practitioner", value: "healthcare-technician" },
          { label: "Construction", value: "construction" },
          { label: "Education", value: "education" },
          { label: "Community and Social Service", value: "community" }
        ],
      },
    ],
    [
      {
        label: "Description", type: "textarea", name: "description", required: true,
        autocomplete: {
          type: "openai",
          mode: "complete",
          prompt: "You are a content writer specializing in media-focused messaging. Craft a concise public description for this business, intended for use on its website. Keep the tone informative and neutral, focusing on describing the business without including contact details or making it sound like a sales pitch."
        }
      },
    ]
  ],
  buttons: [
    { label: "Save", type: "submit", variant: "default" }
  ],
}

/**
 * Export the exampleConfig object
 */
export const businessConfig = {
    form: businessForm,
    table: tableStructure
}