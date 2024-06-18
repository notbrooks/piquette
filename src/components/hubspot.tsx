"use client"; 
import React from 'react';
import { toast } from 'sonner';
import FormComponent from '../common/form';
import { type Rows } from "~/types/picquette";


interface HubspotComponentProps {
  rows: Rows[];
}

const HubspotComponent: React.FC<HubspotComponentProps> = ({ rows }) => {
    const handleSubmit = async (values: Record<string, unknown>) => {
        
        try {
            const response = await fetch('/api/hubspot', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
      
            const result = await response.json();
      
            console.log(`result: `, JSON.stringify(result));
            if (result.ok) {
              alert('Contact created successfully');
            } else {
              alert(result.message || 'Something went wrong');
            }
          } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
          }
        };
  
    return (
      <div className="container">
        <FormComponent rows={rows} data={{}} onFormSubmit={handleSubmit} />
      </div>
    );
  };
  
  export default HubspotComponent;