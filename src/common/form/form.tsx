"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';

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

interface FormComponentProps {
    onFormSubmit: (values: Record<string, unknown>) => void;
    data: unknown;
    rows: Rows; // Explicitly type 'rows' as 'Rows'
}

const FormComponent: React.FC<FormComponentProps> = ({ data, rows, onFormSubmit }) => {
    return (
        <Formik
            initialValues={data ?? {}}
            validate={(values: { firstName?: string, lastName?: string }) => {
                const errors: { firstName?: string, lastName?: string } = {};
                if (!values.firstName) {
                    errors.firstName = 'Required';
                }
                if (!values.lastName) {
                    errors.lastName = 'Required';
                }
                
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  onFormSubmit(values);
                  setSubmitting(false);
                }, 200);
              }}
        >
            
            {({ isSubmitting }) => (
            <Form>
                <div className="space-y-4 p-4">
                    {rows.map((row: Row, rowIndex: number) => ( // Explicitly type 'row' as 'Row'
                        <div key={rowIndex} className="flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-4">
                            {row.map((field: Field, colIndex: number) => (
                                <div key={colIndex} className="flex-grow">
                                    <label htmlFor={field.id} className="block text-sm font-medium leading-6 text-gray-900">
                                        {field.label}
                                    </label>
                                    <div className="mt-2">
                                        {field.type === 'select' ? (
                                            <Field 
                                                as="select" 
                                                name={field.id} 
                                                id={field.id}
                                                placeholder={field.placeholder ? field.placeholder : ''}
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6">

                                                {field.options?.map((option: FieldOption, index: number) => (
                                                    <option key={index} value={option.value}>{option.label}</option>
                                                ))}
                                                
                                            </Field>
                                        ) : (
                                            <Field 
                                                as={field.type}
                                                name={field.id} 
                                                id={field.id}
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                                            />
                                        )}
                                        
                                        {field.help && <p className="mt-2 text-sm text-gray-500">{field.help}</p> }
                                        <ErrorMessage name={field.id} component="p" className="text-red-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => {
                            console.log('Cancel clicked');
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </Form>
            )}

            
        </Formik>
    )
}

export default FormComponent;