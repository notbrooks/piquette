import { NextResponse } from "next/server";
import { updateMyProfile } from "~/server/queries";

export const dynamic = "force-dynamic";

interface ProfileFormData {
    uid: string;
    type: string;
    firstName: string;
    lastName: string;
}

// Handle POST request to the API route
export async function PUT(req: Request) {
    try {
        // Parse form data from request body and assert the type using the interface
        const { uid, type, firstName, lastName }: ProfileFormData = await req.json() as ProfileFormData;

        // Call createMyProfile method with form data
        const profile = await updateMyProfile(uid, type, firstName, lastName);

        // Return success response
        return NextResponse.json({ data: "Profile updated", profile });
    } catch (error) {
        // Return error response if any error occurs
        console.error("Error creating profile:", error);
        return NextResponse.error();
    }
}
