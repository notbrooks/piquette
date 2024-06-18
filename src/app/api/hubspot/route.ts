// src/app/api/hubspot/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { env } from '~/env'

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export async function POST(req: Request) {

  try {
    // const { properties } = await req.json() as { properties: Record<string, string> };
    // console.log(`req body: ${JSON.stringify(req)}`);
    const { firstName, lastName, email, phone }: FormData = await req.json() as FormData;

    const contact = JSON.stringify({
      "properties": {
        "email": email,
        "firstname": firstName,
        "lastname": lastName,
        "phone": phone,
        "lifecyclestage": "marketingqualifiedlead"
      }
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.hubapi.com/crm/v3/objects/contacts?hapikey=',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.HUBSPOT_API_KEY}`,
      },
      data: contact,
    };

    try {
      const response: { status: number, data: { message?: string } } = await axios.request(config);
      if (response.status === 201) {
        return NextResponse.json({ message: response.data.message ?? 'Contact created successfully' }, { status: 201 });
      } else {
        return NextResponse.json({ message: response.data.message ?? 'Something went wrong' }, { status: response.status });
      }
    } catch (error) {
      console.error('Error creating contact', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error parsing request body', error);
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}