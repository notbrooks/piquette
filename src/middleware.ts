import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createToken } from './lib/crypto';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
  const authObj = auth();
  const clerkUserId = (await authObj).userId;

  if (clerkUserId) {
    req.headers.set("x-user-id", clerkUserId);
    const jwtProfile = req.cookies.get('__piquette')?.value;

    if (jwtProfile) {
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
        const res = NextResponse.next();
        res.cookies.set('__piquette', profile.cuid, {
          path: '/',
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 365, // 1 year
        });
        return res;
      } else if (profileResponse.status === 404) {
        // Profile not found, create a new one
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
          const res = NextResponse.next();
          
          res.cookies.set('__piquette', newProfile.cuid, {
            path: '/',
            httpOnly: false,
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