import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();

  const authObj = auth();
  const clerkUserId = (await authObj).userId;

  if (clerkUserId) {
    req.headers.set("x-user-id", clerkUserId);
    const jwtProfile = req.cookies.get('__pp')?.value;

    if (jwtProfile) {
      console.log('Cookie Found');
      return NextResponse.next();
    }

    try {
      // Fetch the profile using GET
      const profileResponse = await fetch(`${req.nextUrl.origin}/api/auth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': clerkUserId,
        },
      });
      
      if (profileResponse.ok) {
        const profile = await profileResponse.json();
        
        console.log('Profile fetched:', profile);

        const res = NextResponse.next();
        res.cookies.set('__pp', profile.cuid, {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 365, // 1 year
        });
        return res;
      } else if (profileResponse.status === 404) {
        // Profile not found, create a new one
        console.log('Profile not found, creating a new profile');
        const createResponse = await fetch(`${req.nextUrl.origin}/api/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': clerkUserId,
          },
          body: JSON.stringify({ userId: clerkUserId }),
        });

        if (createResponse.ok) {
          const newProfile = await createResponse.json();
          console.log('Profile created:', newProfile);

          const res = NextResponse.next();
          res.cookies.set('__pp', newProfile.cuid, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 365, // 1 year
          });
          return res;
        }
      }

      console.error('Failed to fetch or create profile:', profileResponse.statusText);
    } catch (error) {
      console.error('Error in middleware:', error);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};