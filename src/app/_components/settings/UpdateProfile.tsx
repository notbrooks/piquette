"use client"


import { toast } from "sonner"
import { FormComponent } from "~/common";

interface Field {
    id: string;
    label: string;
    type: 'input' | 'textarea' | 'select' | 'radio' | 'checkbox';
    required?: boolean;
    placeholder?: string;
    help?: string;
    options?: FieldOption[];
}

interface FieldOption {
    value: string;
    label: string;
}

type Row = Field[];

type Rows = Row[];

const rows: Rows = [
    [
      {id: "name", label: "Name", type: "input", required: true, placeholder: "Name", help: "Please enter your name"},
      {id: "email", label: "Email", type: "input", required: true, placeholder: "Email", help: "Please enter your email"},
    ],
    [
      {id: "firstName", label: "First Name", type: "input", required: true, placeholder: "First Name", help: "Please enter your first name"},
      {id: "lastName", label: "Last Name", type: "input", required: true, placeholder: "Last Name"},
    ],
    [
      {id: "description", label: "Description", type: "textarea", required: true, placeholder: "Tell Us About Yourself", help: "Please enter a description of yourself"},
    ],
    [
      {id: "type", label: "Type", type: "select", required: true, options: [{label: "User", value: "user"}, {label: "Admin", value: "admin"}]},
    ],
]  

interface UpdateProfileComponentProps {
    profile: unknown;
}

const UpdateProfileComponent: React.FC<UpdateProfileComponentProps> = ({ profile }) => {
    // const [formData, setFormData] = useState({});

    // const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    const handleFormSubmit = async (values : Record<string, unknown>) => {
      try {
        const response = await fetch('/api/profile/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        
        if (response.ok) {
          // Redirect or handle success as needed
          toast("Success", {
            description: "Your profile has been updated.",
          })
        } else {
          toast("Error", {
            description: "Something went wrong.",
          })
        }
      } catch (error) {
        // toast({variant: 'error', title: 'Error', description: 'Something went wrong'});
        toast("Error", {
          description: "Something went wrong.",
        })
      } finally {
        // setSubmitting(false);
      }
        
        
    };

    return (
        <FormComponent data={profile} rows={rows} onFormSubmit={handleFormSubmit}/>
    )
}

export default UpdateProfileComponent;