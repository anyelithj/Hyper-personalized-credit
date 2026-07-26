import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/affiliates',
  '/profile',
  '/offers',
  '/portfolio',
  '/categories',
];

export function middleware(request: NextRequest) {
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix),
  );

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/affiliates/:path*',
    '/profile/:path*',
    '/offers/:path*',
    '/portfolio/:path*',
    '/categories/:path*',
  ],
};
