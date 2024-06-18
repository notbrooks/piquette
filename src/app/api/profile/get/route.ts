import { NextResponse } from "next/server";
import { getMyProfile } from "~/server/queries";

export const dynamic = "force-dynamic";

interface ProfileFormData {
    uid: string;
    
}

// Handle POST request to the API route
export async function POST(req: Request) {
    try {
        // Parse form data from request body and assert the type using the interface
        const { uid }: ProfileFormData = await req.json() as ProfileFormData;

        // Call createMyProfile method with form data
        const profile = await getMyProfile(uid);

        // Return success response
        return NextResponse.json({ data: "Profile found", profile });
    } catch (error) {
        // Return error response if any error occurs
        console.error("Error fetching profile:", error);
        return NextResponse.error();
    }
}
