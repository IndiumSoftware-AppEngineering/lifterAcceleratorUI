import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('isAuthenticated');
  const isAuthenticated = authCookie?.value === 'true';

  if (!isAuthenticated && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

