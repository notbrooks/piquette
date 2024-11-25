import { type FormDefinition} from "~/components/common/Form";



/**
 * Form Structure
 */
const personalSettings: FormDefinition = {
  headline: "Personal Settings",
  description: "Manage your personal settings",
  fields: [
    [
      { label: "First Name", type: "text", name: "firstName", required: true },
      { label: "Last Name", type: "text", name: "lastName", required: true },
    ],
    [
      { label: "Phone", type: "text", name: "phone", required: true },
    ],
    [
      { label: "Description", type: "textarea", name: "description", required: true },
    ]
  ],
  buttons: [
    { label: "Cancel", type: "reset", variant: "ghost" },
    { label: "Save", type: "submit", variant: "default" }
  ]
}

const notificationsSettings: FormDefinition = {
  headline: "Notifications",
  description: "Manage your notification settings",
  fields: [
    [
      { label: "First Name", type: "text", name: "firstName", required: true },
      { label: "Last Name", type: "text", name: "lastName", required: true }
    ],
    [
      { label: "Phone", type: "text", name: "phone", required: true },
    ],
    [
      { label: "Description", type: "textarea", name: "description", required: true },
    ]
  ],
  buttons: [
    { label: "Cancel", type: "reset", variant: "ghost" },
    { label: "Save", type: "submit", variant: "default" }
  ]
}

const cancelSettings: FormDefinition = {
  headline: "Cancel Your Account",
  description: "Cancel your account and all associated data",
  fields: [
    [
      { label: "Email Address", type: "text", name: "firstName", required: true },
    ]
  ],
  buttons: [
    { label: "Cancel Account", type: "submit", variant: "destructive" }
  ]
}

/**
 * Export the exampleConfig object
 */
export const settingsConfig = {
  personalSettings: personalSettings,
  notificationsSettings: notificationsSettings,
  cancelSettings: cancelSettings

}