"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { SparklesIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import type { FormDefinition } from "~/types";

interface FormComponentProps {
  object?: string;
  type?: string;
  formConfig: FormDefinition;
  data?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void;
  isFormLoading: boolean;
}

export default function FormComponent({ onSubmit, isFormLoading, formConfig, data }: FormComponentProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stateValue, setStateValue] = useState<Record<string, string>>({});
  const [isAutocompleteLoading, setAutocompleteLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      ...Object.fromEntries(
        formConfig.fields.flat().map((field) => [
          field.name,
          data?.[field.name] ?? (field.type === "checkbox" ? [] : ""),
        ])
      ),
    },
    validators: formConfig.fields.flat().reduce((acc: Record<string, (value: string) => boolean>, field) => {
      if (field.required) {
        acc[field.name] = (value: string) => value.trim() !== "";
      }
      return acc;
    }, {}),
    onSubmit: async ({ value }) => {
      const validationErrors: Record<string, string> = {};

      formConfig.fields.flat().forEach((field) => {
        const fieldValue = value[field.name];
        if (field.required && (typeof fieldValue === "string" ? fieldValue.trim() === "" : true)) {
          validationErrors[field.name] = `${field.label} is required`;
        }
      });

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // Prevent submission
      }

      setErrors({});
      onSubmit(value);
    },
  });

  const handleFieldChange = (name: string, value: string | File | undefined) => {
    if (value === undefined) return;

    const updatedValue =
      typeof value === "string" ? value : value instanceof File ? value.name : "";

    setStateValue((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    form.setFieldValue(name, updatedValue);

    if (errors[name] && updatedValue !== "") {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev; // Safe destructuring
        return rest;
      });
    }
  };

  const handleAutocomplete = async (fieldName: string, prompt: string) => {
    setAutocompleteLoading(true);
    const formValues: Record<string, unknown> = stateValue;
  
    try {
      const response = await fetch("/api/openai/autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt, 
          fields: JSON.stringify(formValues) // Send prompt and stringified JSON object
        }),
      });
  
      const data = await response.json() as { autocompleteContent: string };
      setAutocompleteLoading(false);
      if (data.autocompleteContent) {
        setStateValue((prev) => ({
          ...prev,
          [fieldName]: data.autocompleteContent
        }));
        form.setFieldValue(fieldName, data.autocompleteContent);
      }
    } catch (error) {
      console.error("Failed to autocomplete:", error);
    }
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="p-5 space-y-6 border bg-white border-gray-900/10 rounded-lg shadow-sm"
    >
      {formConfig.headline && (
        <h2 className="text-base font-semibold leading-7 text-gray-900 flex items-center justify-between">
          <span>{formConfig.headline}</span>
          <span>{formConfig.button}</span>
        </h2>
      )}
      {formConfig.description && (
        <p className="mt-1 text-sm leading-6 text-gray-600">{formConfig.description}</p>
      )}

      {formConfig.fields.map((row, rowIndex) => {
        const columns =
          row.length === 1
            ? "md:grid-cols-1"
            : row.length === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-3 sm:grid-cols-1";

        return (
          <div key={rowIndex} className={`grid ${columns} gap-4`}>
            {row.map((col, colIndex) => (
              <div key={colIndex} className="w-full">
                <Label
                  htmlFor={col.name}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {col.label}
                  {col.required && <span>*</span>}
                </Label>
                <div className="mt-2">
                  {(() => {
                    switch (col.type) {
                      case "text":
                      case "email":
                      case "tel":
                        return (
                          <form.Field name={col.name}>
                            {(field) => (
                              <Input
                                value={field.state.value as string}
                                placeholder={col.placeholder ?? ""}
                                onBlur={(e) => handleFieldChange(col.name, e.target.value)}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 ${
                                  errors[col.name] ? "ring-red-500" : ""
                                }`}
                              />
                            )}
                          </form.Field>
                        );
                      case "textarea":
                        return (
                          <form.Field name={col.name}>
                            {(field) => (
                              <div className="space-y-5">
                                <Textarea
                                  value={field.state.value as string}
                                  onBlur={(e) => handleFieldChange(col.name, e.target.value)}
                                  onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleFieldChange(col.name, newValue); // Update stateValue
                                    field.handleChange(newValue); // Update form state
                                  }}
                                  className={`block w-full h-48 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 ${
                                    errors[col.name] ? "ring-red-500" : ""
                                  }`}
                                />
                                {col.autocomplete && (
                              <div className="flex justify-end cursor-pointer">
                                <div
                                  className="flex items-center justify-center space-x-1 bg-white px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out"
                                  onClick={() => handleAutocomplete(col.name, col.autocomplete?.prompt ?? "")}
                                >
                                  <SparklesIcon className={`w-4 h-4 text-blue-400 transition-transform ${isAutocompleteLoading ? 'animate-spin' : ''}`} />
                                  <span className="text-sm font-medium">
                                    Autocomplete with AI
                                  </span>
                                </div>
                              </div>
                            )}
                              </div>
                            )}
                          </form.Field>
                        );
                      case "select":
                        return (
                          <form.Field name={col.name}>
                            {(field) => (
                              <Select
                                value={field.state.value as string}
                                onValueChange={(value) => field.handleChange(value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={col.placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {col.options?.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          </form.Field>
                        );
                      case "radiogroup":
                        return (
<form.Field name={col.name}>
  {(field) => (
    <RadioGroup
      value={field.state.value as string} // Bind to the current value of the field
      onValueChange={(value) => {
        field.handleChange(value); // Update the form state
        handleFieldChange(col.name, value); // Update local state if needed
      }}
    >
      {col.options?.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )}
</form.Field>
                        );
                      default:
                        return null;
                    }
                  })()}
                </div>
              </div>
            ))}
          </div>
        );
      })}

      <div className="mt-6 pt-5 flex items-center justify-end gap-x-6 border-t border-gray-900/10">
        {formConfig.buttons.map((button, idx) => (
          <Button
            key={idx}
            type={button.type}
            variant={button.variant}
            onClick={button.type === "reset" ? () => form.reset() : undefined}
          >
            {isFormLoading ? "Submitting..." : button.label}
          </Button>
        ))}
      </div>
    </form>
  );
}