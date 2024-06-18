"use client"

import React from 'react';
import { Formik, Form, Field, type FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

import FormRows from "./onboarding.json"

interface BaseField {
  id: string;
  type: string;
  label: string;
  placeholder?: string; // Mark placeholder as optional
}

interface TextField extends BaseField {
  type: 'input' | 'password' | 'email' | 'textarea';
}

interface SelectField extends BaseField {
  type: 'select';
  options: Array<{ label: string; value: string }>;
}

type FormField = TextField | SelectField;

interface FormValues {
  firstName: string;
  lastName: string;
  type: string;
  uid: string;
}

const OnboardingForm: React.FC<{ uid: string }> = ({ uid }) => {
  const router = useRouter();

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    type: '',
    uid: uid,
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      const response = await fetch('/api/profile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Redirect or handle success as needed
        router.push('/dashboard');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleSubmit }) => (
        
<Form onSubmit={handleSubmit}>

<div className="space-y-12">
  {FormRows[0]?.form.rows.map((row, ridx) => (
    <div key={ridx} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      {row.map((field: BaseField, fidx) => (
        <div key={fidx} className={`${
          row.length === 1 ? 'col-span-full' : 
          row.length === 2 ? 'sm:col-span-3' : 
          row.length === 3 ? 'sm:col-span-2' :
        ''}`}>

          {(field.type === 'input' || field.type === 'password' || field.type === 'email') && (
            <>
              <label htmlFor={field.id} className="block text-sm font-medium leading-6 text-gray-900">
                {field.label}
              </label>
              <div className="mt-2">
                <Field
                  name={field.id}
                  id={field.id}
                  type={field.type}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={field.placeholder ?? ''}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {field.type === 'textarea' && (
            <div className="sm:col-span-12">
              <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                {field.label}
              </label>
              <div className="mt-2">
                <Field
                  name={field.id}
                  id={field.id}
                  as={field.type}
                  rows={4}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={field.placeholder ?? ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {field.type === 'select' && (
            <div className="sm:col-span-12">
              <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                {field.label}
              </label>
              <div className="mt-2">
                <Field
                  name={field.id}
                  id={field.id}
                  as={field.type}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  
                >
                  
                  {((field as SelectField).options || []).map((option: { label: string; value: string }) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}

                </Field>
              </div>
            </div>
          )}

        </div>
      ))}
    </div> 
  ))}

</div>

<div className="mt-6 flex items-center justify-end gap-x-6">
  <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
    Cancel
  </button>
  <button
    type="submit"
    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Save
  </button>
</div>

</Form>

      )}
    </Formik>
  );
};

export default OnboardingForm;