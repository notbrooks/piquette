import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { api } from '~/trpc/server';

// Handle GET and POST requests
export async function GET(req: NextRequest) {
  const clerkUserId = req.headers.get('x-user-id');
  if (!clerkUserId) {
    return NextResponse.json({ error: 'Unauthorized: Missing userId' }, { status: 401 });
  }

  try {
    const profile = await api.profile.getProfile({ user: clerkUserId });
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  console.log('POST request received', JSON.stringify(req));

  try {
    // Define a type for the expected JSON body
    type RequestBody = { userId: string };

    // Parse the request body and validate its shape
    const body = (await req.json()) as Partial<RequestBody>;

    // Validate the parsed body
    if (!body.userId) {
      return NextResponse.json({ error: 'Unauthorized: Missing userId' }, { status: 401 });
    }

    // Call the API to create the profile
    const profile = await api.profile.createProfile({ user: body.userId });
    return NextResponse.json(profile, { status: 201 });

  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}