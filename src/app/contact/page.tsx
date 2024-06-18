

export const dynamic = "force-dynamic";

import { type Rows } from "~/types/picquette";
import HubspotComponent from "~/components/hubspot";

const rows = [
  [
    {id: "firstName", label: "First Name", type: "input", required: true, placeholder: "First Name", help: "Please enter your first name"},
    {id: "lastName", label: "Last Name", type: "input", required: true, placeholder: "Last Name"},
  ],
  [
    {id: "email", label: "Email", type: "input", required: true, placeholder: "Email", help: "Please enter your email"},
    {id: "phone", label: "Phone Number", type: "input", required: false, placeholder: "Phone Number", help: "Please enter your name"},    
  ],
  [
    {id: "type", label: "Type", type: "select", required: true, options: [{label: "User", value: "user"}, {label: "Admin", value: "admin"}]},
  ],
  [
    {id: "message", label: "Message", type: "textarea", required: false},
  ],
  
]  

export default async function OnboardingPage() {
  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Contact
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in.
          Explicabo id ut laborum.
        </p>
        
        <div className=" mx-auto mt-10">
          <HubspotComponent rows={rows as Rows} />
        </div>
      </div>
    </div>
  );
}
