/**
 * ************************************************************************************************
 *   _____                     ____                                             _   
 *  |  ___|__  _ __ _ __ ___  / ___|___  _ __ ___  _ __   ___  _ __   ___ _ __ | |_ 
 *  | |_ / _ \| '__| '_ ` _ \| |   / _ \| '_ ` _ \| '_ \ / _ \| '_ \ / _ \ '_ \| __|
 *  |  _| (_) | |  | | | | | | |__| (_) | | | | | | |_) | (_) | | | |  __/ | | | |_ 
 *  |_|  \___/|_|  |_| |_| |_|\____\___/|_| |_| |_| .__/ \___/|_| |_|\___|_| |_|\__|
 *                                                |_|                               
 * ************************************************************************************************
 * @author Brooke Dixon
 * @version 1.0.0
 * @copyright 2024 Digital Initiatives, Inc.
 * @license MIT
 * ************************************************************************************************
 * ************************************************************************************************
 * 
 * 
 */
"use client";

import { useState } from "react";
import { type Updater, useForm } from "@tanstack/react-form";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { SparklesIcon as ChatIcon } from "@heroicons/react/24/outline";
import type { FormDefinition } from "~/types";

interface FormComponentProps {
  object?: string;
  type?: string;
  formConfig: FormDefinition;
  onSubmit: (data: Record<string, unknown>) => void;
  isFormLoading: boolean;
}

export default function FormComponent({ onSubmit, isFormLoading,formConfig }: FormComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stateValue, setStateValue] = useState<Record<string, string>>({});
  const formValues: Record<string, string> = Object.fromEntries(
    Object.entries(stateValue).filter(([key, value]) => typeof value === "string")
  );

  const form = useForm({
    defaultValues: {
      ...Object.fromEntries(
        formConfig.fields.flat().map((field) => [
          field.name,
          field.type === "checkbox" ? [] : "",
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
      
      // Validate required fields
      formConfig.fields.flat().forEach((field) => {
        const fieldValue = value[field.name];
        if (field.required && (typeof fieldValue === 'string' ? fieldValue.trim() === "" : true)) {
          validationErrors[field.name] = `${field.label} is required`;
        }
      });

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // Prevent submission
      }

      // If no errors, proceed to submit
      setErrors({});
      onSubmit(value);
    },
  });

  // Define a type for the API response
interface AutocompleteResponse {
  autocompleteContent: string;
}

// Change the type assertion in the handleAutocomplete function
const handleAutocomplete = async (fieldName: string, prompt: string) => {
  setIsLoading(true);
  const formValues: Record<string, string> = Object.fromEntries(
    Object.entries(stateValue).filter(([key, value]) => typeof value === "string")
  );

  try {
    const response = await fetch("/api/openai/autocomplete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: formValues,
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch autocomplete data");
    }

    const data = await response.json();
    if (data?.autocompleteContent) {
      setStateValue((prev) => ({
        ...prev,
        [fieldName]: data.autocompleteContent,
      }));
      form.setFieldValue(fieldName, data.autocompleteContent);
    }
  } catch (error) {
    console.error("Failed to autocomplete:", error);
  } finally {
    setIsLoading(false);
  }
};

// Update the handleFieldChange function signature
const handleFieldChange = (
  name: string, 
  value: string | File | Updater<string | never[]> | undefined
) => {
  if (value === undefined) return; // Guard clause for undefined value

  const updatedValue =
    typeof value === "string" ? value : value instanceof File ? value.name : JSON.stringify(value);

  // Update state with the new value
  setStateValue((prev) => ({
    ...prev,
    [name]: updatedValue,
  }));

  // Ensure the following function handles a specific value type 
  const isStringOrArray = (val: unknown): val is string | unknown[] => 
    typeof val === "string" || Array.isArray(val);
  if (isStringOrArray(value)) {
    form.setFieldValue(name, value); // For regular text fields and array inputs
  } else if (value instanceof File) {
    form.setFieldValue(name, value as unknown as string); // For file inputs
  }

  // Clear error if value is provided
  if (errors[name] && value !== "") {
    setErrors((prev) => {
      const { [name]: errorToRemove, ...rest } = prev;
      return rest;
    });
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
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {formConfig.headline}
        </h2>
      )}
      {formConfig.description && (
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {formConfig.description}
        </p>
      )}

      {formConfig.fields?.map((row, idx) => {
        const columns =
          row.length === 1
            ? "md:grid-cols-1"
            : row.length === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-3 sm:grid-cols-1";

        return (
          <div key={idx} className={`grid ${columns} gap-4`}>
            {row.map((col, idx) => (
              <div key={idx} className="w-full">
                <Label
                  htmlFor={col.name}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {col.label}
                  {col.required && <span>*</span>}
                  {/* {col.required && errors[col.name] && <span className="text-red-600"> Required</span>} */}
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
                                value={field.state.value}
                                placeholder={col.placeholder ?? ""}
                                onBlur={(e) =>
                                  handleFieldChange(col.name, e.target.value)
                                }
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 ${
                                  errors[col.name] ? "ring-red-500" : ""
                                }`}
                              />
                            )}
                          </form.Field>
                        );
                      case "file":
                        return (
                          <form.Field name={col.name}>
                            {(field) => (
                              <Input
                                type="file"
                                multiple={false} // Optional: for multiple file uploads
                                onChange={e => {
                                  const file = e.target.files ? e.target.files[0] : undefined;
                                  handleFieldChange('file', file);
                                }}
                                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 ${
                                  errors[col.name] ? "ring-red-500" : ""
                                }`}
                              />
                            )}
                          </form.Field>
                        )
                      case "textarea":
                        return (
                          <div className="space-y-5">
                            <form.Field name={col.name}>
                              {(field) => (
                                <Textarea
                                  value={
                                    stateValue[col.name] !== undefined
                                      ? String(stateValue[col.name])
                                      : Array.isArray(field.state.value)
                                      ? field.state.value.join("")
                                      : String(field.state.value)
                                  }
                                  onBlur={(e) => handleFieldChange(col.name, e.target.value)}
                                  onChange={(e) => {
                                    // Handle user input changes directly
                                    handleFieldChange(col.name, e.target.value);
                                    field.handleChange(e.target.value);
                                  }}
                                  disabled={isLoading}
                                  className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 min-h-[125px] ${
                                    errors[col.name] ? "ring-red-500" : ""
                                  }`}
                                />
                              )}
                            </form.Field>

                            {col.autocomplete && (
                              <div className="flex justify-end cursor-pointer">
                                <div
                                  className="flex items-center justify-center space-x-1 bg-white px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out"
                                  onClick={() => handleAutocomplete(col.name, col.autocomplete?.prompt ?? "")}
                                >
                                  <ChatIcon className={`w-4 h-4 text-blue-400 transition-transform ${isLoading ? 'animate-spin' : ''}`} />
                                  <span className="text-sm font-medium">
                                    Autocomplete with AI
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      case "select":
                        return (
                          <div className="">
                            <form.Field name={col.name}>
                              {(field) => (
                                <Select
                                  value={
                                    Array.isArray(field.state.value)
                                      ? field.state.value.join("")
                                      : field.state.value
                                  }
                                  onValueChange={(value) =>
                                    field.handleChange(value)
                                  }
                                >
                                  <SelectTrigger className="">
                                    <SelectValue placeholder={col.placeholder} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {col.options?.map((option, idx) => (
                                        <SelectItem key={idx} value={option.value}>
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              )}
                            </form.Field>
                          </div>
                        );
                      default:
                        return <>Unknown</>;
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
            onClick={
              button.type === "reset" ? () => form.reset() : undefined
            }
          >
            {isFormLoading ? "Submitting..." : button.label}
          </Button>
        ))}
      </div>
    </form>
  );
}