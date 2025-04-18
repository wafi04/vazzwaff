import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { api } from './lib/axios';
export const REDIRECT = '/';
export const PUBLIC_ROUTES = ['/'];
export const MEMBER_ROUTE = ['/profile'];
export const ADMIN_ROUTE = ['/dashboard'];
export const AUTH_ROUTES = ['/auth/login', '/auth/register', '/auth/forgot-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get session token from cookies
  const sessionToken = request.cookies.get('session_token')?.value
  
  // Skip token validation for public and auth routes
  if (PUBLIC_ROUTES.includes(pathname) || AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }
  
  // If no token exists, redirect to login
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  try {
    // Verify token with your backend
    const response = await api.get(`/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    })
    
    if (response.statusCode === 200) {
      return NextResponse.next()
    } else if (response.statusCode === 401) {
      // Token is expired, try to refresh
      const refreshResult = await refreshToken(request)
      
      // If refresh was successful, continue to requested page
      if (refreshResult.success) {
        const nextResponse = NextResponse.next()
        
        nextResponse.cookies.set('session_token', refreshResult.newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60, // 1 day
          path: '/',
        })
        
        return nextResponse
      } else {
        // Refresh failed, redirect to login
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }
    } else {
      // Other error, redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

// Helper function to refresh the token
async function refreshToken(request: NextRequest) {
  try {
    const currentToken = request.cookies.get('session_token')?.value
    
    if (!currentToken) {
      return { success: false }
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: currentToken }),
    })
    
    if (response.ok) {
      const data = await response.json()
      return { 
        success: true, 
        newToken: data.data.token 
      }
    }
    
    return { success: false }
  } catch (error) {
    console.error('Token refresh error:', error)
    return { success: false }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}