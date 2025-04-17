// middleware.ts
import type { NextRequest } from 'next/server'

export const REDIRECT = '/';
export const PUBLIC_ROUTES = ['/'];
export const MEMBER_ROUTE = ['/profile'];
export const ADMIN_ROUTE = ['/dashboard'];
export const AUTH_ROUTES = ['/auth/login', '/auth/register', '/auth/forgot-password'];

export async function middleware(request: NextRequest) {
 
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all paths except public assets and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}