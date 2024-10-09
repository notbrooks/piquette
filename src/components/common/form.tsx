import { useForm } from '@tanstack/react-form'

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

interface FormComponentProps {
  object: string
  type: string
  onSubmit: (data: { object: string; type: string }) => void;
}

export default function FormComponent( { object, type, onSubmit }: FormComponentProps) {
  const form = useForm({
    defaultValues: {
      type: '',
      object: '',
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  })

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
        form.reset(); // Fixed by adding parentheses for the function call
      }}
      className="p-5 space-y-6 border border-gray-900/10 rounded-lg shadow-sm"
    >
        <div className="col-span-full">
          <Label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
            Type
          </Label>
          
          <div className="mt-2">
            <form.Field
              name="type"
              // validators={{}}
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              )}
            />
            </div>
        </div>
        <div className="col-span-full">
          <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
            Object
          </label>
          <div className="mt-2">
            <form.Field
              name="object"
              // validators={{}}
              // eslint-disable-next-line react/no-children-prop
              children={(field) => (
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              )}
            />
            </div>
        </div>

      <div className="mt-6 pt-5 flex items-center justify-end gap-x-6 border-t border-gray-900/10">
        <Button type="reset" variant="link" onClick={form.reset}>Reset</Button>
        <Button type="submit" variant="default">Submit</Button>
      </div>
    </form>
  )
}