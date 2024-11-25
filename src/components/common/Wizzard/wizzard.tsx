"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Fieldset, Legend } from "@headlessui/react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { HeaderComponent } from "~/components/common";
import Column from "~/components/templates/column";
import type { FormDefinition } from "~/components/common";

interface FormComponentProps {
  formConfig: FormDefinition;
  onSubmit: (data: Record<string, unknown>) => void;
}

export default function WizzardComponent({ onSubmit, formConfig }: FormComponentProps) {
  const [visibleSection, setVisibleSection] = useState(0);
  // const [isSectionValid, setIsSectionValid] = useState(false);

  const form = useForm({
    defaultValues: {
      ...Object.fromEntries(
        formConfig.fields.flat().map((field) => [
          field.name,
          field.type === "checkbox" ? [] : "",
        ])
      ),
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  // const validate = () => {
  //   const fields = formConfig?.fields?.[visibleSection] ?? [];
  //   const isValid = fields.every((field) => {
  //     const fieldValue = form.getFieldValue(field.name); // Access form values dynamically
  //     if (fieldValue === undefined) {
  //       return false;
  //     }
  //     if (typeof fieldValue === "string") {
  //       return fieldValue.trim() !== "";
  //     }
  //     if (Array.isArray(fieldValue)) {
  //       return fieldValue.length > 0;
  //     }
  //     return false;
  //   });
  //   setIsSectionValid(true);
  // };

  // useEffect(() => {
  //   validate();
  // }, [form.values, visibleSection]);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (visibleSection < formConfig.fields.length - 1) {
      setVisibleSection(visibleSection + 1);
    }
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (visibleSection > 0) {
      setVisibleSection(visibleSection - 1);
    }
  };

  return (
    <Column>
      <HeaderComponent
        title="Wizzard Example"
        description="An example of an AI-driven wizard interface"
      />
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          {formConfig.fields.map((fieldSet, idx) => (
            <Fieldset
              key={idx}
              className={`border border-gray-200 rounded-lg p-4 space-y-4 mb-5 bg-white ${
                visibleSection === idx ? "block" : "hidden"
              }`}
            >
              <Legend>{`Section ${idx + 1}`}</Legend>

              <div className="w-full">
                {fieldSet.map((field, fieldIdx) => (
                  <div key={fieldIdx} className="mb-4">
                    <Label
                      htmlFor={field.name}
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {field.label}
                    </Label>
                    <div className="mt-2">
                      <form.Field name={field.name}>
                        {(fieldProps) => (
                          <Input
                            name={field.name}
                            id={field.name}
                            value={fieldProps.state.value}
                            onBlur={fieldProps.handleBlur}
                            onChange={(e) =>
                              fieldProps.handleChange(e.target.value)
                            }
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          />
                        )}
                      </form.Field>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 flex items-center justify-end gap-x-6 border-t border-gray-900/10">
                {visibleSection > 0 && (
                  <Button variant="secondary" onClick={handlePrevious}>
                    Previous
                  </Button>
                )}

                {visibleSection === formConfig.fields.length - 1 ? (
                  <Button
                    variant="default"
                    type="submit"
                    // disabled={!isSectionValid}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={handleNext}
                    // disabled={!isSectionValid}
                  >
                    Next
                  </Button>
                )}
              </div>
            </Fieldset>
          ))}
        </form>
      </div>
    </Column>
  );
}